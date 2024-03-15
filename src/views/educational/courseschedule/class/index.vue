<template>
  <PageWrapper dense contentFullHeight contentClass="flex">
    <OptionTree class="w-1/4 xl:w-1/4" @select="handleSelect" optionType="class" title="班级" />
    <ScheduleDetail
      class="w-3/4 xl:w-3/4 m-2"
      v-if="showFlg"
      :data="scheduleInfo"
      :params="downloadParams"
      type="class"
    />
  </PageWrapper>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { PageWrapper } from '@/components/Page';
  import OptionTree from '../components/optionTree.vue';
  import ScheduleDetail from '../components/scheduleDetail.vue';
  import { getList as getScheduleInfo } from '@/api/educational/schedueCourse/schedulingCourse.js';

  const showFlg = ref(false);
  const scheduleInfo = ref(); // 课表详情
  const downloadParams = ref();

  // 选择班级
  async function handleSelect(params: any) {
    showFlg.value = false;
    downloadParams.value = params;
    try {
      // 获取指定班级的课表详情
      const detail = await getScheduleInfo(params);

      if (detail) {
        scheduleInfo.value = detail;
        showFlg.value = true;
      }
    } catch (err) {
      console.log(err);
    }
  }
</script>

<style scoped></style>
