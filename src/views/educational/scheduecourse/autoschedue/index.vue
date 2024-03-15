<template>
  <PageWrapper dense contentFullHeight contentClass="flex">
    <Card
      class="w-1/4 xl:w-1/4 m-2 p-2"
      :tabList="tabListNoTitle"
      :activeTabKey="currentKey"
      @tab-change="(key) => (currentKey = key)"
    >
      <OptionTree
        optionType="class"
        label="班级"
        v-show="currentKey === 'class'"
        @check="onCheck"
      />
      <OptionTree
        optionType="classroom"
        label="教室"
        v-show="currentKey === 'classroom'"
        @check="onCheck"
      />
    </Card>
    <BaseSetting class="w-3/4 xl:w-3/4" :baseParams="params" />
  </PageWrapper>
</template>

<script setup lang="ts">
  import { ref, reactive } from 'vue';
  import { PageWrapper } from '@/components/Page';
  import { Card } from 'ant-design-vue';
  import OptionTree from './components/optionTree.vue';
  import BaseSetting from './components/baseSetting.vue';

  const semesterDetailId = localStorage.getItem('semesterDetailId') || null;
  const currentKey = ref('class');
  const classIds = ref([]); // 已选班级
  const classRoomIds = ref([]); // 分配教室
  const params = reactive({
    semesterDetailId: Number(semesterDetailId),
    classIds: [],
    classRoomIds: [],
  }); // 自动排课入参
  const tabListNoTitle = [
    {
      key: 'class',
      tab: '选择班级',
    },
    {
      key: 'classroom',
      tab: '分配教室',
    },
  ];

  function onCheck(data) {
    if (currentKey.value === 'class') {
      classIds.value = data;
    } else if (currentKey.value === 'classroom') {
      classRoomIds.value = data;
    }
    params.classIds = classIds.value;
    params.classRoomIds = classRoomIds.value;
  }
</script>

<style scoped lang="less">
  ::v-deep(.ant-card-body) {
    padding: 8px;
  }
</style>
