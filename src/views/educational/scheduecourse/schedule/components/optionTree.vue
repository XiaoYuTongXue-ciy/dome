<template>
  <div class="m-2 overflow-hidden bg-white">
    <Spin :spinning="treeLoading">
      <BasicTree
        :title="title"
        toolbar
        search
        treeWrapperClassName="h-120 overflow-auto"
        :clickRowToExpand="false"
        :actionList="actionList"
        :treeData="treeData"
        :fieldNames="{ key: 'id', title: 'name' }"
      />
    </Spin>
  </div>
</template>
<script lang="ts" setup>
  import { onMounted, ref, h } from 'vue';
  import { BasicTree, TreeItem, TreeActionItem } from '@/components/Tree';
  import { Tag, Spin } from 'ant-design-vue';

  import { getClassByMajorList } from '@/api/classes/index'; // 班级
  import { getTeacherByCourseList } from '@/api/educational/schedueCourse/lessonPlan'; // 教师
  import { getListGroupByRoom } from '@/api/classroom/index'; // 教室

  defineOptions({ name: 'DeptTree' });
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
      if (props.optionType === 'classroom') {
        submit(node);
      } else {
        submit(node.id);
      }
    }
  }

  async function submit(data: any) {
    try {
      emit('select', data);
    } catch (err) {
      console.log(err);
    }
  }

  onMounted(() => {
    fetch();
  });
</script>
