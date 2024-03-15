<template>
  <Card class="overflow-hidden m-2 bg-white" :title="data.title" v-if="data?.weekDays">
    <div class="p-2 flex justify-between">
      <Checkbox.Group v-model:value="showTypeList">
        <template v-for="opt in showOptions" :key="opt.value">
          <Checkbox :value="opt.value">
            {{ opt.label }}
          </Checkbox>
        </template>
      </Checkbox.Group>
      <a-button type="primary" @click="open = true">导出课表</a-button>
    </div>
    <div class="p-2">
      <div class="header-box">
        <div class="cell txt"></div>
        <div class="cell txt" v-for="i in data.daysPerWeek" :key="i">
          {{ '星期' + digital2Chinese(i, 'week') }}
        </div>
      </div>
      <div class="box">
        <div class="flex flex-col cell">
          <div v-for="i in data.lessonNumber" :key="i" class="col" style="font-size: 14px">
            {{ '第' + digital2Chinese(i, '') + '节' }}
          </div>
        </div>
        <div class="flex flex-col cell" v-for="item in data.weekDays" :key="item.id">
          <div v-for="inner in item.slots" :key="inner.id">
            <div class="col text-center">
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
    </div>
    <Modal v-model:open="open" title="提示">
      <div class="p-4">
        <ExclamationCircleOutlined class="mr-2 info-icon" />请选择导出的课表类型
      </div>
      <template #footer>
        <a-button key="submit" @click="download('all')">导出全校课表</a-button>
        <a-button key="back" type="primary" @click="download('detail')">导出当前课表</a-button>
      </template>
    </Modal>
  </Card>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { Checkbox, Modal, Card } from 'ant-design-vue';
  import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
  import { digital2Chinese } from './uitls';
  import { useLoading } from '@/components/Loading';
  import { getExportSchedue } from '@/api/educational/schedueCourse/schedulingCourse.js';
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
  });

  const open = ref<boolean>(false);
  const title = ref('');
  const [openFullLoading, closeFullLoading] = useLoading({
    tip: '下载中...',
  });

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

  // 下载当前班级课表
  async function download(filetype: string) {
    open.value = false;
    openFullLoading();

    // data 为接口返回文件流数据，如果你的接口嵌套一层那就逐层去取
    let data: any;
    if (filetype === 'detail') {
      data = await getExportSchedue(props.params);
    } else if (filetype === 'all') {
      const param = {
        schoolId: props.params.schoolId,
        semesterId: props.params.semesterId,
        type: props.type,
      };
      data = await getExportSchedue(param);
    }
    const currentTime = dayjs();
    const formattedTime = currentTime.format('YYYYMMDDHHmmss');

    downloadByData(data, `课表信息_${formattedTime}.xlsx`);
    closeFullLoading();
  }

  onMounted(() => {
    if (props.type === 'class') {
      title.value = '班级课表';
      showTypeList.value = ['course', 'teacher', 'classroom'];
    } else if (props.type === 'teacher') {
      showTypeList.value = ['course', 'class', 'classroom'];
      title.value = '教师课表';
    } else if (props.type === 'classroom') {
      showTypeList.value = ['course', 'class', 'teacher'];
      title.value = '教室课表';
    }
    showOptions.value = showOptions.value.filter((item) => item.value !== props.type);
  });
</script>

<style lang="scss" scoped>
  .header-box {
    display: flex;

    .txt {
      border-right: 1px solid #fff;
      background-color: #67a1ff;
      color: #fff;
      font-size: 16px;
      font-weight: normal;
      line-height: 50px;
      text-align: center;
    }
  }

  .cell {
    flex: 1;
    min-height: 50px;
  }

  .box {
    display: flex;
    border: 1px solid rgb(0 0 0 / 20%);
  }

  .col {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 66px;
    border-right: 1px solid rgb(0 0 0 / 20%);
    border-bottom: 1px solid rgb(0 0 0 / 20%);
    font-size: 12px;

    &:hover {
      background-color: #67abff;
      cursor: pointer;
    }
  }

  .disabled {
    background-color: rgb(0 0 0 / 12%);
  }

  ::v-deep(input) {
    padding: 0;
    text-align: center;
  }

  .info-icon {
    color: #efbd47;
  }

  ::v-deep(.ant-card-body) {
    padding: 8px;
  }
</style>
