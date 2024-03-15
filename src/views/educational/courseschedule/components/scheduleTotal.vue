<template>
  <Card class="m-2 bg-white" :title="data.title">
    <div class="p-2 flex justify-between">
      <Checkbox.Group v-model:value="showTypeList">
        <template v-for="opt in showOptions" :key="opt.value">
          <Checkbox :value="opt.value">
            {{ opt.label }}
          </Checkbox>
        </template>
      </Checkbox.Group>
      <a-button type="primary" @click="download">导出课表</a-button>
    </div>

    <div class="scroll-wrap overflow-auto mx-4">
      <div class="header flex">
        <div class="header-sum bg-bl">{{ title }}</div>
        <div class="cell" v-for="i in data.daysPerWeek" :key="i + 'days'">
          <div class="header-item bg-bl">{{ '星期' + digital2Chinese(i, 'week') }}</div>
          <div class="flex">
            <div
              v-for="i in data.lessonNumber"
              :key="i + 'lesson'"
              class="lesson-num border-rb bg-bl"
            >
              {{ '第' + digital2Chinese(i, '') + '节' }}
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-row">
        <div class="col-label">
          <div v-for="i in labelList" :key="i + 'label'" class="bg-bl col-item">
            {{ i }}
          </div>
        </div>
        <div v-for="item in data.weekDayTotals" :key="item.id">
          <div v-for="inner in item.scheduleTotals" :key="inner.id" class="col-content">
            <div v-if="!inner.courseName"></div>
            <div v-else class="flex flex-col">
              <p class="mb-0" v-show="showTypeList.includes('course')"> {{ inner.courseName }}</p>
              <p class="mb-0" v-show="showTypeList.includes('teacher')">
                {{ inner.teacherName }}
              </p>
              <p class="mb-0" v-show="showTypeList.includes('class')">
                {{ inner.className }}
              </p>
              <p class="mb-0" v-show="showTypeList.includes('classroom')">
                {{ inner.classRoomName }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Card>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { Checkbox, Card } from 'ant-design-vue';
  import { digital2Chinese } from './uitls';
  import { useLoading } from '@/components/Loading';
  import { getExportTotalSchedue } from '@/api/educational/schedueCourse/schedulingCourse.js';
  import { downloadByData } from '@/utils/file/download';
  import dayjs from 'dayjs';

  const props = defineProps({
    // 课表详细信息
    data: {
      type: Object,
      default: () => {},
    },
    // 课表类型
    type: {
      type: String,
      default: 'class',
    },
    // 参数
    params: {
      type: Object,
      default: () => {},
    },
    // 列名
    labelList: {
      type: Object,
      required: true,
    },
  });

  const title = ref(''); //
  const showTypeList = ref<string[]>([]); // 课表展示内容
  const showOptions = ref([
    {
      value: 'course',
      label: '课程',
    },
    {
      value: 'teacher',
      label: '教师',
    },
    {
      value: 'class',
      label: '班级',
    },
    {
      value: 'classroom',
      label: '教室',
    },
  ]);
  const [openFullLoading, closeFullLoading] = useLoading({
    tip: '下载中...',
  });

  // 下载课表
  async function download() {
    openFullLoading();

    // data 为接口返回文件流数据，如果你的接口嵌套一层那就逐层去取
    const data = await getExportTotalSchedue(props.params);
    const currentTime = dayjs();
    const formattedTime = currentTime.format('YYYYMMDDHHmmss');

    downloadByData(data, `课表信息_${formattedTime}.xlsx`);
    closeFullLoading();
  }

  onMounted(() => {
    if (props.type === 'class') {
      showTypeList.value = ['course', 'teacher', 'classroom'];
      title.value = '班级';
    } else if (props.type === 'teacher') {
      showTypeList.value = ['course', 'class', 'classroom'];
      title.value = '教师';
    } else if (props.type === 'classroom') {
      showTypeList.value = ['course', 'class', 'teacher'];
      title.value = '教室';
    }
    showOptions.value = showOptions.value.filter((item) => item.value !== props.type);
  });
</script>

<style scoped lang="less">
  .scroll-wrap {
    height: calc(100vh - 260px);
    background-color: @component-background;
  }

  .cell {
    flex: 1;
    min-height: 50px;
    // width: 400px;
  }

  .lesson-num {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 130px;
    height: 38px;
  }

  .header {
    position: sticky;
    z-index: 1;
    top: 0;

    .header-sum {
      position: sticky;
      z-index: 2;
      top: 0;
      left: 0;
      min-width: 68px;
      height: 68px;
      border: 1px solid #fff;
      line-height: 68px;
    }

    .header-item {
      box-sizing: border-box;
      min-width: 68px;
      height: 30px;
      border: 1px solid #fff;
      line-height: 30px;
    }
  }

  .border-rb {
    border-right: 1px solid #fff;
    border-bottom: 1px solid #fff;
  }

  .col {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 66px;
    border-right: 1px solid rgb(0 0 0 / 20%);
    border-bottom: 1px solid rgb(0 0 0 / 20%);

    &:hover {
      background-color: #67abff;
      cursor: pointer;
    }
  }

  .col-label {
    position: sticky;
    left: 0;
    min-width: 68px;

    .col-item {
      height: 80px;
      border-top: 1px solid #fff;
      border-bottom: 1px solid #fff;
      line-height: 80px;
    }
  }

  .col-content {
    display: flex;
    box-sizing: border-box;
    align-items: center;
    justify-content: center;
    min-width: 130px;
    height: 80px;
    border-right: 1px solid rgb(0 0 0 / 20%);
    border-bottom: 1px solid rgb(0 0 0 / 20%);
    font-size: 12px;

    &:hover {
      background-color: #67abff;
      cursor: pointer;
    }
  }

  .bg-bl {
    background-color: #67a1ff;
    color: #fff;
  }

  ::v-deep(.ant-card-body) {
    padding: 8px;
  }
</style>
