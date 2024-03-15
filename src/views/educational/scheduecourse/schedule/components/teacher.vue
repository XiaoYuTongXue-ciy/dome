<template>
  <PageWrapper dense contentFullHeight contentClass="flex">
    <OptionTree class="w-1/4 xl:w-1/4" @select="handleSelect" optionType="teacher" title="教师" />
    <div class="w-3/4 xl:w-3/4 m-2" v-if="showFlg">
      <LessonPlan class="px-2" :data="lessonPlan" @change="handleChange" />
      <ScheduleDetail
        :data="scheduleInfo"
        :lessonPlan="lessonPlan"
        :currentPlan="currentItem"
        :banNumber="banNumber"
        :params="params"
        type="teacher"
        @success="handleSuccess"
        @clear="init"
      />
    </div>
  </PageWrapper>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { PageWrapper } from '@/components/Page';
  import OptionTree from './optionTree.vue';
  import ScheduleDetail from './scheduleDetail.vue';
  import LessonPlan from './lessonPlan.vue';

  import { detail as getScheduleInfo } from '@/api/educational/schedueCourse/scheduleRules.js';
  import { getListBySchedule } from '@/api/educational/schedueCourse/lessonPlan.js';

  import { useMessage } from '@/hooks/web/useMessage';

  const { notification } = useMessage();

  const showFlg = ref(false);
  const scheduleInfo = ref(); // 课表详情
  const lessonPlan = ref(); // 教学计划
  const currentItem = ref(); // 当前选中的教学课程
  const banNumber = ref(); // 课表中的禁排数量
  const params = ref(); // 当前教师id信息
  const semesterDetailId = localStorage.getItem('semesterDetailId') || null;

  // 开始设置
  async function handleSelect(id: number) {
    params.value = {
      semesterDetailId: Number(semesterDetailId),
      teacherId: id,
    };
    // 渲染页面
    init();
  }

  async function init() {
    try {
      showFlg.value = false;
      // 获取指定教师的课表详情
      const detail = await getScheduleInfo(params.value);
      // 获取指定教师的教学任务列表
      const data = await getListBySchedule(params.value);

      // 该教师是否有教学计划
      if (data.length > 0) {
        lessonPlan.value = data;
        if (detail) {
          const totalNum = Number(detail.daysPerWeek * detail.lessonNumber);
          // 获取当前课表最大禁排数量
          banNumber.value = getBanNum(totalNum, detail.setNumber, lessonPlan.value);
          // 设置教师id
          detail.weekDays.map((item) => {
            return item.slots.map((slot) => (slot.teacherId = params.value.teacherId));
          });
          scheduleInfo.value = detail;
          showFlg.value = true;
        }
      } else {
        lessonPlan.value = [];
        notification.info({
          message: '该教师暂无教学计划安排，请先添加教学计划！',
          duration: 3,
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  function handleChange(data) {
    currentItem.value = data;
  }

  function handleSuccess() {
    notification.success({
      message: '操作成功',
      duration: 2,
    });
    init();
  }
  function getBanNum(totalNum: number, setNum = 0, info: any) {
    const courseNum = info.reduce((sum: number, item: any) => sum + item.weeklyClassHours, 0);
    const banNum = totalNum - courseNum - setNum;
    return banNum;
  }
</script>

<style lang="scss" scoped></style>
