<template>
  <Transfer
    :data-source="state.dataSource"
    :target-keys="state.targetKeys"
    :render="(item) => item.title"
    :show-select-all="false"
    @change="onChange"
  >
    <template #children="{ direction, selectedKeys, onItemSelect }">
      <div v-if="direction === 'left'" class="content-box">
        <BasicTree
          v-if="state.leftTreeData.length"
          blockNode
          checkable
          :tree-data="state.leftTreeData"
          :checked-keys="state.leftCheckedKey"
          @check="
            (_, props) => {
              handleLeftChecked(_, props, [...selectedKeys, ...state.targetKeys], onItemSelect);
            }
          "
        />
        <Empty v-else>
          <template #description>暂无数据</template>
        </Empty>
      </div>
      <div v-else-if="direction === 'right'" class="content-box">
        <BasicTree
          v-if="state.rightTreeData.length"
          blockNode
          checkable
          :tree-data="state.rightTreeData"
          v-model:checked-keys="state.rightCheckedKey"
          v-model:expanded-keys="state.rightExpandedKey"
          @check="
            (_, props) => {
              handleRightChecked(_, props, [...selectedKeys, ...state.targetKeys], onItemSelect);
            }
          "
        />
        <Empty v-else>
          <template #description>暂无数据</template>
        </Empty>
      </div>
    </template>
  </Transfer>
</template>

<script setup lang="ts">
  import {
    cloneDeep,
    flatten,
    getTreeKeys,
    handleLeftTreeData,
    handleRightTreeData,
    isChecked,
  } from './utils';
  import { reactive, ref, onMounted } from 'vue';
  import { Transfer, Empty } from 'ant-design-vue';
  // import type { SelectAllLabel } from 'ant-design-vue/es/transfer';
  import type { TreeDataItem } from './utils';
  import { BasicTree } from '@/components/Tree';
  import { getTeacherTitle } from '@/api/educational/schedueCourse/lessonPlan'; // 教师

  const emit = defineEmits(['change']);

  const treeData = ref<TreeDataItem[]>([]);
  const state = reactive({
    targetKeys: [] as string[], // 显示在右侧框数据的 key 集合
    dataSource: [] as TreeDataItem[], // 数据源，其中的数据将会被渲染到左边一栏
    leftCheckedKey: [] as string[], // 左侧树选中 key 集合
    leftHalfCheckedKeys: [] as string[], // 左侧半选集合
    leftCheckedAllKey: [] as string[], // 左侧树选中的 key 集合，包括半选与全选
    leftTreeData: [] as TreeDataItem[], // 左侧树
    rightCheckedKey: [] as string[], // 右侧树选中集合
    rightCheckedAllKey: [] as string[], // 右侧树选中集合，包括半选与全选
    rightExpandedKey: [] as string[], // 右侧展开数集合
    rightTreeData: [] as TreeDataItem[], // 右侧树
    emitKeys: [] as string[], // 往父级组件传递的数据
    deepList: [] as string[], //深层列表
  });

  // 处理树数据
  function processTreeData() {
    flatten(cloneDeep(treeData.value), state.dataSource);
    state.leftTreeData = handleLeftTreeData(cloneDeep(treeData.value), state.leftCheckedKey);
  }

  // 穿梭更改
  function onChange(targetKeys, direction) {
    if (direction === 'right') {
      state.targetKeys = state.leftCheckedAllKey;
      state.rightCheckedKey = [];
      state.rightTreeData = handleRightTreeData(
        cloneDeep(treeData.value),
        state.leftCheckedAllKey,
        'right',
      );

      state.leftTreeData = handleLeftTreeData(
        cloneDeep(treeData.value),
        state.leftCheckedKey,
        'right',
      );
    } else if (direction === 'left') {
      state.rightTreeData = handleRightTreeData(state.rightTreeData, state.rightCheckedKey, 'left');
      state.leftTreeData = handleLeftTreeData(state.leftTreeData, state.rightCheckedKey, 'left');
      state.leftCheckedKey = state.leftCheckedKey.filter(
        (item) => state.rightCheckedKey.indexOf(item) === -1,
      );
      state.targetKeys = state.targetKeys.filter(
        (item) => state.rightCheckedKey.indexOf(item) === -1,
      );
      state.leftHalfCheckedKeys = state.leftHalfCheckedKeys.filter(
        (item) => state.rightCheckedKey.indexOf(item) === -1,
      );
      state.rightCheckedKey = [];
    }
    state.rightExpandedKey = getTreeKeys(state.rightTreeData);
    state.emitKeys = state.rightExpandedKey;
    emit('change', state.rightTreeData);
  }

  // 左侧选择
  function handleLeftChecked(_, { node, halfCheckedKeys }, checkedKeys, itemSelect) {
    state.leftCheckedKey = _;
    state.leftHalfCheckedKeys = [...new Set([...state.leftHalfCheckedKeys, ...halfCheckedKeys])];
    state.leftCheckedAllKey = [
      ...new Set([...state.leftHalfCheckedKeys, ...halfCheckedKeys, ..._]),
    ];
    const { eventKey } = node;
    itemSelect(eventKey, !isChecked(checkedKeys, eventKey));
  }

  // 右侧选择
  function handleRightChecked(_, { node, halfCheckedKeys }, checkedKeys, itemSelect) {
    state.rightCheckedKey = _;
    state.rightCheckedAllKey = [...halfCheckedKeys, ..._];
    const { eventKey } = node;
    itemSelect(eventKey, isChecked(_, eventKey));
  }

  onMounted(async () => {
    treeData.value = await getTeacherTitle();
    processTreeData();
  });
</script>

<style scoped lang="less">
  .content-box {
    max-height: 150px;
    overflow-y: auto;
  }
</style>
