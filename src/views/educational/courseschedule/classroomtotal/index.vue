<template>
  <div class="overflow-hidden">
    <BaseChoose optionType="classroom" @select="handleSelect" />
    <div class="text-center overflow-auto">
      <Spin :spinning="loading" size="large">
        <ScheduleTotal
          :data="scheduleInfo"
          :params="downloadParams"
          :labelList="classList"
          type="classroom"
          v-if="showFlg"
      /></Spin>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { Spin } from 'ant-design-vue';
  import BaseChoose from '../components/baseChoose.vue';
  import ScheduleTotal from '../components/scheduleTotal.vue';
  import { getTotalList } from '@/api/educational/schedueCourse/schedulingCourse.js';

  const showFlg = ref(false);
  const loading = ref(false);
  const scheduleInfo = ref(); // 课表详情
  const downloadParams = ref();
  const classList = ref<any[]>([]); //所有班级列表

  async function handleSelect(params) {
    loading.value = true;
    try {
      showFlg.value = false;
      downloadParams.value = params;
      const info = await getTotalList(params);
      if (info) {
        showFlg.value = true;
        scheduleInfo.value = info;

        info.weekDayTotals[0].scheduleTotals.map((item) => classList.value.push(item.name));
      }
    } finally {
      loading.value = false;
    }
  }
</script>

<style scoped></style>
