<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="getTitle"
    width="500px"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm">
      <template #Student="{ model, field }">
        <ApiSelect
          :api="stuPageInfo"
          showSearch
          v-model:value="model[field]"
          placeholder="请选择"
          optionFilterProp="label"
          resultField="items"
          labelField="nameAndNumber"
          valueField="id"
          :params="page"
          :disabled="model.id"
          @select="onStuSelect($event)"
        />
      </template>
      <template #tuition="{ model, field }">
        <ApiSelect
          :api="getTuitionfeeList"
          showSearch
          v-model:value="model[field]"
          placeholder="请选择"
          optionFilterProp="label"
          resultField="items"
          labelField="expenseName"
          valueField="id"
          :params="searchTuitionParams"
          :disabled="model.id"
        /> </template
    ></BasicForm>
  </BasicDrawer>
</template>
<script setup lang="ts">
  import { ref, computed, unref } from 'vue';
  import { BasicForm, useForm } from '@/components/Form/index';
  import { addFormSchema } from './config';
  import { BasicDrawer, useDrawerInner } from '@/components/Drawer';
  import { add, update, getTuitionfeeList } from './api';
  import { getPageInfo as stuPageInfo, getDetailInfo } from '@/api/stuInfo'; // 学生
  import { ApiSelect } from '@/components/Form';

  const emit = defineEmits(['success', 'register']);
  const isUpdate = ref(true);

  const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
    labelWidth: 90,
    baseColProps: { span: 24 },
    schemas: addFormSchema,
    showActionButtonGroup: false,
  });

  const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
    resetFields();
    setDrawerProps({ confirmLoading: false });
    // 需要在setFieldsValue之前先填充treeData，否则Tree组件可能会报key not exist警告
    // if (unref(treeData).length === 0) {
    //   // treeData.value = (await getMenuList()) as any as TreeItem[];
    // }
    isUpdate.value = !!data?.isUpdate;

    if (unref(isUpdate)) {
      console.log('data', data.record);
      setFieldsValue({
        ...data.record,
      });
    }
  });

  const getTitle = computed(() => (!unref(isUpdate) ? '新增学生费用' : '编辑学生费用'));

  async function handleSubmit() {
    try {
      const values = await validate();

      setDrawerProps({ confirmLoading: true });

      // TODO custom api
      isUpdate.value ? await update(values) : await add(values);
      closeDrawer();
      emit('success');
    } finally {
      setDrawerProps({ confirmLoading: false });
    }
  }

  const currentStuClassId = ref(0);

  const page = { page: 0, pageSize: 10000 };

  async function onStuSelect(item) {
    setFieldsValue({
      tuitionfeeId: '',
    });
    let info = await getDetailInfo({ id: item });
    if (info.id) {
      currentStuClassId.value = info.classId;
      console.log('currentStuClassId', currentStuClassId.value);
    }
  }

  // 班级

  const searchTuitionParams = computed(() => {
    return {
      ...page,

      classId: currentStuClassId.value || 0,
    };
  });
</script>
