<template>
  <Spin :spinning="treeLoading">
    <BasicTree
      :title="label"
      toolbar
      search
      checkable
      treeWrapperClassName="h-90 overflow-auto"
      :clickRowToExpand="false"
      :treeData="treeData"
      :fieldNames="{ key: 'id', title: 'name' }"
      @check="handleCheck"
    />
  </Spin>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { Spin } from 'ant-design-vue';
  import { BasicTree, TreeItem } from '@/components/Tree';

  import { getClassByMajorList } from '@/api/classes/index'; // 班级
  import { getListGroupByRoom } from '@/api/classroom/index'; // 教室

  const treeLoading = ref(false);
  const emit = defineEmits(['check']);
  const props = defineProps({
    optionType: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: ' ',
    },
  });

  const treeData = ref<TreeItem[]>([]);

  async function fetch() {
    treeLoading.value = true;
    if (props.optionType === 'class') {
      treeData.value = (await getClassByMajorList()) as unknown as TreeItem[];
      treeLoading.value = false;
    } else if (props.optionType === 'classroom') {
      treeData.value = (await getListGroupByRoom()) as unknown as TreeItem[];
      treeLoading.value = false;
    }
  }

  function handleCheck(checkedKeys) {
    emit('check', checkedKeys);
    // console.log('onChecked', checkedKeys, e);
  }

  onMounted(() => {
    fetch();
  });
</script>

<style scoped lang="less"></style>
