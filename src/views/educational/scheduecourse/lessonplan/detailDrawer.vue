<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="getTitle"
    width="500px"
    @ok="handleSubmit"
  >
    <BasicForm ref="formRef" @register="registerForm">
      <template #schoolSlot="{ model, field }">
        <ApiSelect
          :api="getSchoolListInfo"
          params="schoolName"
          v-model:value="model[field]"
          placeholder="请选择"
          :filterOption="false"
          resultField="items"
          labelField="name"
          valueField="id"
          @select="onSchoolSelct($event, model)"
        />
      </template>
      <template #semSearch="{ model, field }">
        <!-- 学期 -->
        <ApiSelect
          ref="semKey"
          :api="getSemesterInfo"
          showSearch
          v-model:value="model[field]"
          placeholder="请选择"
          :filterOption="false"
          resultField="items"
          labelField="value"
          valueField="id"
          labelInValue
          :params="semParams"
          @search="debSearch"
          @select="onSemesterSelect($event, model)"
      /></template>
      <template #courseSearch="{ model, field }">
        <!-- 课程 -->
        <ApiSelect
          ref="courseKey"
          :api="getCourseInfo"
          showSearch
          v-model:value="model[field]"
          :filterOption="false"
          placeholder="请选择"
          resultField="items"
          labelField="courseName"
          valueField="id"
          :params="courseParams"
          @search="debCourseSearch"
          @select="onCourseSelect($event, model)"
      /></template>
      <template #majorSearch="{ model, field }">
        <!-- 专业 -->
        <ApiSelect
          ref="majorKey"
          :api="getMajorInfo"
          showSearch
          v-model:value="model[field]"
          :filterOption="false"
          placeholder="请选择"
          resultField="items"
          labelField="majorName"
          valueField="id"
          :params="majorParams"
          @search="debMajorSearch"
          @select="onMajorSelect($event, model)"
      /></template>
      <template #classSearch="{ model, field }">
        <!-- 班级 -->
        <ApiSelect
          ref="classKey"
          :api="getClassInfo"
          showSearch
          v-model:value="model[field]"
          :filterOption="false"
          placeholder="请选择"
          resultField="items"
          labelField="className"
          valueField="id"
          :params="classParams"
          @search="debClassSearch"
      /></template>
      <template #lecturerSearch="{ model, field }">
        <!-- 教师 -->
        <ApiSelect
          ref="lecturerKey"
          :api="getUserInfo"
          showSearch
          v-model:value="model[field]"
          :filterOption="false"
          placeholder="请选择"
          resultField="items"
          labelField="name"
          valueField="id"
          :params="lecturerParams"
          @search="debLecturerSearch"
      /></template>
      <template #startWeek="{ model, field }">
        <Select
          :options="options"
          v-model:value="model[field]"
          @change="changeEndWeek"
          allowClear
        />
      </template>
      <template #endWeek="{ model, field }">
        <Select :options="endOptions" v-model:value="model[field]" allowClear />
      </template>
    </BasicForm>
  </BasicDrawer>
</template>
<script setup lang="ts">
  import { ref, computed, unref } from 'vue';
  import { formSchema } from './config';
  import { Select, type SelectProps } from 'ant-design-vue';
  import { BasicDrawer, useDrawerInner } from '@/components/Drawer';
  import { BasicForm, useForm, ApiSelect } from '@/components/Form/index';
  import { useDebounceFn } from '@vueuse/core';
  import { add, update } from '@/api/educational/schedueCourse/lessonPlan.js';

  import { getListInfo as getSchoolListInfo } from '@/api/sysOrg'; // 学校
  import { getPageInfo as getSemesterInfo } from '@/api/dictionary'; // 学期
  import { getPageInfo as getMajorInfo } from '@/api/major'; // 专业
  import { getPageInfo as getCourseInfo, getDetailInfo } from '@/api/course'; // 课程
  import { getPageInfo as getClassInfo } from '@/api/classes'; // 班级
  import { getPageInfo as getUserInfo } from '@/api/teacher'; // 教师
  import { getPageInfo as getSemesterDetail } from '@/api/semester/detail.js'; // 获取学期详情

  import { useMessage } from '@/hooks/web/useMessage';

  const { notification } = useMessage();

  const emit = defineEmits(['success', 'register']);
  const isUpdate = ref(true);
  const semester = ref('');
  const majorId = ref(0);
  const schoolId = ref(0);
  const teachingWeeks = ref(); // 本学期的教学周数
  const options = ref<Required<SelectProps>['options']>([]); // 授课开始周次选项
  const endOptions = ref<Required<SelectProps>['options']>([]); // 授课结束周次选项

  const getTitle = computed(() => (!unref(isUpdate) ? '新增教学计划' : '编辑教学计划'));
  const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
    labelWidth: 120,
    baseColProps: { span: 24 },
    schemas: formSchema,
    showActionButtonGroup: false,
  });
  const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
    resetFields();
    setDrawerProps({ confirmLoading: false });
    isUpdate.value = !!data?.isUpdate;

    if (unref(isUpdate)) {
      console.log(data.record);
      courseKey.value = '';
      classKey.value = '';
      majorKey.value = '';
      semester.value = data.record.semester;
      majorId.value = data.record.majorId;
      schoolId.value = data.record.schoolId;

      // 设置教学周数下拉框
      const result = await getSemesterDetail({
        schoolId: data.record.schoolId,
        semesterId: data.record.semesterId,
      });
      teachingWeeks.value = result.items[0].teachingWeeks;
      for (let i = 1; i <= teachingWeeks.value; i++) options.value.push({ label: i, value: i });
      endOptions.value = options.value;
      await setFieldsValue({
        ...data.record,
        semesterId: { key: data.record.semesterId, label: data.record.semester },
      });
    }
  });

  async function handleSubmit() {
    try {
      const values = await validate();
      const id = values.semesterId.key;
      values.semesterId = id;
      if (!values.classId) values.classId = 0;
      setDrawerProps({ confirmLoading: true });
      isUpdate.value ? await update(values) : await add(values);

      closeDrawer();
      emit('success');
    } finally {
      setDrawerProps({ confirmLoading: false });
    }
  }

  const semKey = ref<string>('');
  const semParams = computed<Recordable<string | number>>(() => {
    return { dictTypeCode: 'semester', name: unref(semKey), pageSize: 5000 };
  });
  const debSearch = useDebounceFn((value: string) => (semKey.value = value), 500);

  const courseKey = ref<string>('');
  const courseParams = computed<Recordable<string | number>>(() => {
    return { name: unref(courseKey), semester: unref(semester.value), pageSize: 5000 };
  });
  const debCourseSearch = useDebounceFn((value: string) => (courseKey.value = value), 500);

  const majorKey = ref<string>('');
  const majorParams = computed<Recordable<string | number>>(() => {
    return { majorName: unref(majorKey), schoolId: schoolId.value, pageSize: 5000 };
  });
  const debMajorSearch = useDebounceFn((value: string) => (majorKey.value = value), 500);

  const classKey = ref<string>('');
  const classParams = computed<Recordable<string | number>>(() => {
    return { className: unref(classKey), majorId: unref(majorId.value), pageSize: 5000 };
  });
  const debClassSearch = useDebounceFn((value: string) => (classKey.value = value), 500);

  const lecturerKey = ref<string>('');
  const lecturerParams = computed<Recordable<string | number>>(() => {
    return { name: unref(lecturerKey), pageSize: 5000 };
  });
  const debLecturerSearch = useDebounceFn((value: string) => (lecturerKey.value = value), 500);

  // 选择学校
  function onSchoolSelct(id, model) {
    schoolId.value = id;
    majorKey.value = '';
    model.majorId = null;
  }

  // 选择学期
  async function onSemesterSelect(item, model) {
    semester.value = item.label;
    courseKey.value = '';
    model.courseId = null;
    // 获取学期详情
    const params = {
      schoolId: model.schoolId,
      semesterId: item.key,
    };
    const result = await getSemesterDetail(params);
    const detail = result.items;
    if (detail.length > 0) {
      teachingWeeks.value = detail[0].teachingWeeks; // 教学周数
      for (let i = 1; i <= teachingWeeks.value; i++) options.value.push({ label: i, value: i });
      endOptions.value = options.value;
    } else {
      notification.info({ message: '暂无该学期详情记录，请先添加学期详情', duration: 2 });
    }
  }

  // 选择专业
  function onMajorSelect(id, model) {
    majorId.value = id;
    classKey.value = '';
    model.classId = null;
  }
  // 选择课程
  async function onCourseSelect(id, model) {
    // 获取课程详情
    const params = {
      schoolId: model.schoolId,
      semesterId: model.semesterId.key,
      id: id,
    };
    const info = await getDetailInfo(params);
    model.weeklyClassHours = info.weeklyClassHours;
    console.log(info);
  }

  // 修改授课结束周数
  function changeEndWeek(item) {
    endOptions.value = [];
    for (let i = item; i <= teachingWeeks.value; i++) endOptions.value.push({ label: i, value: i });
  }
</script>
