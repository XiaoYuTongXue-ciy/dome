<template>
  <div class="overflow-hidden m-2" v-if="schedulInfo?.weekDays">
    <div class="p-2">
      <div class="header-box">
        <div class="cell txt"></div>
        <div class="cell txt" v-for="i in schedulInfo.daysPerWeek" :key="i">
          {{ '星期' + digital2Chinese(i, 'week') }}
        </div>
      </div>
      <div class="box">
        <div class="flex flex-col cell">
          <div v-for="i in schedulInfo.lessonNumber" :key="i" class="col">
            {{ '第' + digital2Chinese(i, '') + '节' }}
          </div>
        </div>
        <div class="flex flex-col cell" v-for="item in schedulInfo.weekDays" :key="item.id">
          <div v-for="inner in item.slots" :key="inner.id">
            <div v-if="inner.isSetArrange" class="disabled col"></div>
            <div
              v-else
              class="col"
              @click="handleInput(inner)"
              @contextmenu.prevent.stop="handleContext(inner)"
            >
              <div v-if="inner.isArrange">禁排</div>
              <div v-if="inner.isArrange === false" class="flex flex-col">
                <p class="mb-0 text-center"> {{ inner.courseName }}</p>
                <p class="mb-0 text-center" v-show="['class', 'classroom'].includes(type)">
                  {{ inner.teacherName }}</p
                >
                <p class="mb-0 text-center" v-show="['teacher', 'classroom'].includes(type)">
                  {{ inner.className }}</p
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="btn">
      <a-button type="default" class="mr-6" @click="open = true">重置课表</a-button>
      <a-button type="primary" @click="handleSave">保存</a-button>
    </div>
    <Modal v-model:open="open" title="提示" @ok="handleReset">
      <div class="p-4" style="font-size: 14px">
        <ExclamationCircleOutlined class="mr-2 error-icon" />是否确定重置该课表全部内容？
      </div>
    </Modal>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { Modal } from 'ant-design-vue';
  import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
  import { batchSave, clearItem } from '@/api/educational/schedueCourse/scheduleRules';

  import { useMessage } from '@/hooks/web/useMessage';

  const { notification } = useMessage();

  const emit = defineEmits(['success', 'clear']);
  const props = defineProps({
    // 课表详细信息
    data: {
      type: Object,
      default: () => {},
    },
    // 该班级的所有教学计划
    lessonPlan: {
      type: Object,
      default: () => {},
    },
    // 当前选中的教学计划课程
    currentPlan: {
      type: Object,
      default: () => {},
    },
    // 课程禁排数量
    banNumber: {
      type: Number,
      default: 0,
    },
    // 课表类型
    type: {
      type: String,
      default: 'class',
    },
    // 清空项目入参
    params: {
      type: Object,
      default: () => {},
    },
  });

  const open = ref<boolean>(false);
  const schedulInfo = ref(); // 课表详情
  const lessonPlanList = ref(); // 该班级的所有教学计划
  const choosedItem = ref(); // 当前选中的教学计划
  const banNum = ref(0); // 最大禁排数

  // 左键：输入课程名称
  function handleInput(item: any) {
    if (item.courseName) {
      backLessonNum(item);
      clearLesson(item);
    } else {
      choosedItem.value = props.currentPlan;
      if (!choosedItem.value) {
        notification.info({
          message: '请先选择课程！',
          duration: 3,
        });
        return;
      } else {
        if (choosedItem.value.unarrangedNum <= 0) {
          notification.error({
            message: '该课程已达到最大排课数！',
            duration: 3,
          });
        } else {
          choosedItem.value.unarrangedNum--;
          choosedItem.value.arrangedNum++;

          if (item.isArrange) {
            banNum.value++;
          }

          item.isArrange = false;
          item.courseName = choosedItem.value.courseName;
          item.courseId = choosedItem.value.courseId;
          item.teacherId = choosedItem.value.lecturerId;
          item.teacherName = choosedItem.value.lecturerName;
          item.classId = choosedItem.value.classId;
          item.className = choosedItem.value.className;
        }
      }
    }
  }

  // 右键：不安排/撤销处理
  function handleContext(data: any) {
    // 回填课程节数
    backLessonNum(data);

    // 禁排数量check
    if (banNum.value <= 0) {
      notification.error({
        message: '已达到最大禁排数！',
        duration: 3,
      });
    } else {
      // 清除排课内容
      if (data.isArrange) {
        data.isArrange = null;
        banNum.value++;
      } else {
        data.isArrange = true;
        banNum.value--;
      }
      // 清除数据
      clearLesson(data);
    }
  }

  /**
   * 数字转中文
   * @param {Number} num 需要转换的数字
   * @param {String} identifier 标识符
   * @returns {String} 转换后的中文
   */
  function digital2Chinese(num: number, identifier: string) {
    const character = ['零', '一', '二', '三', '四', '五', '六', '七', '八'];
    return identifier === 'week' && (num === 0 || num === 7) ? '日' : character[num];
  }

  // 回填课程节数
  function backLessonNum(data) {
    // 回填课程节数
    let index = -1;
    if (props.type === 'class') {
      index = lessonPlanList.value.findIndex(
        (item: any) => item.courseId === data.courseId && item.lecturerId === data.teacherId,
      );
    } else if (props.type === 'teacher') {
      index = lessonPlanList.value.findIndex(
        (item: any) => item.classId === data.classId && item.courseId === data.courseId,
      );
    } else if (props.type === 'classroom') {
      index = lessonPlanList.value.findIndex(
        (item: any) =>
          item.classId === data.classId &&
          item.courseId === data.courseId &&
          item.lecturerId === data.teacherId,
      );
    }
    if (index !== -1) {
      lessonPlanList.value[index].unarrangedNum++;
      lessonPlanList.value[index].arrangedNum--;
    }
  }

  // 清除排课内容
  function clearLesson(data) {
    data.courseName = null;
    data.courseId = null;
    if (props.type === 'class') {
      data.teacherId = null;
      data.teacherName = null;
    } else if (props.type === 'teacher') {
      data.classId = null;
      data.className = null;
    } else if (props.type === 'classroom') {
      data.classId = null;
      data.className = null;
      data.teacherId = null;
      data.teacherName = null;
    }
  }
  // 保存课表设置
  async function handleSave() {
    try {
      await batchSave(schedulInfo.value);
      emit('success');
    } catch (error) {
      console.log(error);
    }
  }

  async function handleReset() {
    await clearItem(props.params);
    notification.success({
      message: '操作成功',
      duration: 2,
    });
    emit('clear');
  }

  onMounted(() => {
    lessonPlanList.value = props.lessonPlan;
    schedulInfo.value = props.data;
    banNum.value = props.banNumber;
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
    min-height: 68px;
    border-right: 1px solid rgb(0 0 0 / 20%);
    border-bottom: 1px solid rgb(0 0 0 / 20%);

    &:hover {
      background-color: #67abff;
      cursor: pointer;
    }
  }

  .btn {
    height: 60px;
    margin: 10px 20px 0 0;
    float: right;
  }

  .disabled {
    background-color: rgb(0 0 0 / 12%);
  }

  ::v-deep(input) {
    padding: 0;
    text-align: center;
  }

  .error-icon {
    color: #ff4d4f;
  }
</style>
