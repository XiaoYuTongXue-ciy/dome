<template>
  <PageWrapper dense contentFullHeight contentClass="flex">
    <BaseForm class="w-1/4 xl:w-1/4" @select="handleSelect" />
    <ScheduleDetail class="w-3/4 xl:w-3/4" v-if="showFlg" :data="info" @success="handleSuccess" />
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { PageWrapper } from '@/components/Page';
  import BaseForm from './components/baseForm.vue';
  import ScheduleDetail from './components/scheduleDetail.vue';

  import { getPageInfo as getSemesterDetail } from '@/api/semester/detail.js';
  import { useMessage } from '@/hooks/web/useMessage';

  const { notification } = useMessage();

  const showFlg = ref(false);
  const info = ref();

  // 开始设置
  async function handleSelect(values) {
    showFlg.value = false;
    // 获取学期详情
    const detail = await getSemesterDetail(values);

    if (detail.items.length > 0) {
      const data = detail.items[0];
      info.value = {
        detailId: data.id, // 学期详情id
        daysPerWeek: data.daysPerWeek, //每周天数
        lessonNumber: data.lessonNumber, // 上课节数
      };
      showFlg.value = true;
    } else {
      // 详情不存在，清空缓存
      localStorage.removeItem('semesterDetailId');
      notification.error({
        message: '暂无该记录，请先添加学期详情！',
        duration: 3,
      });
    }
  }
  function handleSuccess() {
    notification.success({
      message: '操作成功',
      duration: 2,
    });
  }
</script>
