<template>
  <div class="content">
    <Tabs class="py-2 mx-4">
      <template v-for="item in tabList" :key="item.key">
        <TabPane :tab="item.name">
          <component :is="tabs[item.component]" />
        </TabPane>
      </template>
    </Tabs>
  </div>
</template>
<script lang="ts" setup>
  import { onMounted } from 'vue';
  import { tabList } from './config';
  import { Tabs } from 'ant-design-vue';
  import ClassSetting from './components/classSetting.vue';
  import Teacher from './components/teacher.vue';
  import Classroom from './components/classroom.vue';
  import Subject from './components/subject.vue';

  const TabPane = Tabs.TabPane;
  const tabs = {
    ClassSetting,
    Teacher,
    Classroom,
    Subject,
  };

  onMounted(() => {});
</script>
<style lang="less" scope>
  .content {
    margin: 4px 16px 16px;
    // padding: 10px;
    border-radius: 8px;
    background-color: #fff;
  }

  ::v-deep(.ant-tabs-nav) {
    padding-left: 10px;
  }
</style>
