<template>
  <Card class="m-2 py-2 overflow-hidden bg-white" title="学期详情">
    <BasicForm ref="formRef" @register="registerForm">
      <template #semSearch="{ model, field }">
        <ApiSelect
          :api="getSemesterInfo"
          showSearch
          v-model:value="model[field]"
          placeholder="请选择"
          resultField="items"
          labelField="value"
          valueField="id"
          optionFilterProp="label"
          :params="{ dictTypeCode: 'semester', pageSize: 5000 }"
        /> </template
    ></BasicForm>
    <Spin :spinning="treeLoading">
      <BasicTree
        class="pl-2"
        :title="title"
        toolbar
        search
        treeWrapperClassName="h-90 overflow-auto"
        :clickRowToExpand="false"
        :actionList="actionList"
        :treeData="treeData"
        :fieldNames="{ key: 'id', title: 'name' }"
      />
    </Spin>
  </Card>
</template>
<script lang="ts" setup>
  import { onMounted, ref, h } from 'vue';

  import { BasicForm, useForm, ApiSelect } from '@/components/Form';
  import { BasicTree, TreeItem, TreeActionItem } from '@/components/Tree';
  import { Tag, Spin, Card } from 'ant-design-vue';

  import { formSchema } from './config';
  import { getPageInfo as getSemesterInfo } from '@/api/dictionary'; // 学期
  import { getClassByMajorList } from '@/api/classes/index'; // 班级
  import { getTeacherByCourseList } from '@/api/educational/schedueCourse/lessonPlan'; // 教师
  import { getListGroupByRoom } from '@/api/classroom/index'; // 教室

  defineOptions({ name: 'OptionTree' });
  const props = defineProps({
    optionType: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
  });

  const emit = defineEmits(['select']);
  const treeLoading = ref(false);
  const treeData = ref<TreeItem[]>([]);
  const actionList: TreeActionItem[] = [
    {
      show: (node) => {
        if (node.children?.length > 0) {
          return false;
        } else {
          return true;
        }
      },
      render: (node) => {
        return h(
          Tag,
          {
            class: 'mr-0 pl-4 pr-4',
            color: '#67a1ff',
            onClick: () => {
              handleSelect(node);
            },
          },
          () => '选择',
        );
      },
    },
  ];

  const [registerForm, { validate }] = useForm({
    labelWidth: 60,
    baseColProps: { span: 24 },
    schemas: formSchema,
    showActionButtonGroup: false,
  });

  async function fetch() {
    treeLoading.value = true;
    if (props.optionType === 'class') {
      treeData.value = (await getClassByMajorList()) as unknown as TreeItem[];
      treeLoading.value = false;
    } else if (props.optionType === 'teacher') {
      treeData.value = (await getTeacherByCourseList()) as unknown as TreeItem[];
      treeLoading.value = false;
    } else if (props.optionType === 'classroom') {
      treeData.value = (await getListGroupByRoom()) as unknown as TreeItem[];
      treeLoading.value = false;
    } else if (props.optionType === 'subject') {
      treeData.value = [] as TreeItem[];
      treeLoading.value = false;
    }
  }

  async function handleSelect(node: any) {
    if (node.children?.length > 0) {
      return;
    } else {
      submit(node.id);
    }
  }

  async function submit(id: number) {
    try {
      const values = await validate();
      let params = {};
      if (props.optionType === 'class') {
        params = Object.assign({ classId: id }, values);
      } else if (props.optionType === 'teacher') {
        params = Object.assign({ teacherId: id }, values);
      } else if (props.optionType === 'classroom') {
        params = Object.assign({ classroomId: id }, values);
      }
      emit('select', params);
    } catch (err) {
      console.log(err);
    }
  }

  onMounted(() => {
    fetch();
  });
</script>
<style scoped lang="less">
  ::v-deep(.ant-card-body) {
    padding: 8px;
  }
</style>
