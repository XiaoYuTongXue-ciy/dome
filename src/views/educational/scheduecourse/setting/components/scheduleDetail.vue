<template>
  <Card class="m-2 p-2 overflow-hidden bg-white" title="学期课表" v-if="schedulInfo?.weekDays">
    <div class="content">
      <div class="header-box">
        <div class="cell txt"></div>
        <div class="cell txt" v-for="i in data.daysPerWeek" :key="i">
          {{ '星期' + digital2Chinese(i, 'week') }}
        </div>
      </div>
      <div class="box">
        <div class="body cell">
          <div v-for="i in data.lessonNumber" :key="i" class="col">
            {{ '第' + digital2Chinese(i, '') + '节' }}
          </div>
        </div>
        <div class="body cell" v-for="item in schedulInfo.weekDays" :key="item.id">
          <div
            v-for="inner in item.slots"
            :key="inner.id"
            class="col"
            @click="handleInput(inner)"
            @contextmenu.prevent.stop="handleContext(inner)"
          >
            <div v-if="inner.isSetArrange" class="disabled">不安排</div>
            <div class="pr-2 pl-2">
              <InputTextArea
                v-if="inner.isSetArrange === false"
                v-model:value="inner.courseName"
                :bordered="false"
                placeholder="请输入课程名"
                @blur="inputBindBlur(inner)"
                v-focus
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="btn">
      <a-button type="primary" @click="handleSave">保存</a-button>
    </div>
  </Card>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { Input, Card } from 'ant-design-vue';

  import { detail, batchSave } from '@/api/educational/schedueCourse/scheduleSetting';

  const props = defineProps({
    data: {
      type: Object,
      required: true,
    },
  });
  const emit = defineEmits(['success']);

  const InputTextArea = Input.TextArea;
  const schedulInfo = ref();

  async function fetch() {
    schedulInfo.value = await detail({ semesterDetailId: props.data.detailId });
    // 保存学期详情
    localStorage.setItem('semesterDetailId', schedulInfo.value.semesterDetailId);
  }

  // 左键：输入课程名称
  function handleInput(data: any) {
    data.isSetArrange = false;
  }

  // 右键：不安排/撤销处理
  function handleContext(data: any) {
    data.isSetArrange = data.isSetArrange ? null : true;
    data.courseName = null;
  }
  // 获取焦点
  const vFocus = {
    mounted(el) {
      el?.focus();
    },
  };

  // 失去焦点
  function inputBindBlur(data) {
    if (!data.courseName) data.isSetArrange = null;
  }

  // 保存设置
  async function handleSave() {
    try {
      await batchSave(schedulInfo.value);
      emit('success');
    } catch (error) {
      console.log(error);
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

  onMounted(() => {
    fetch();
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

  .body {
    display: flex;
    flex-direction: column;
  }

  .col {
    // display: flex;
    // flex-direction: column;
    height: 62px;
    border-right: 1px solid rgb(0 0 0 / 20%);
    border-bottom: 1px solid rgb(0 0 0 / 20%);
    line-height: 62px;
    text-align: center;

    &:hover {
      background-color: #67abff;
      cursor: pointer;
    }
  }

  .btn {
    height: 60px;
    margin: 10px 20px 0;
    float: right;
  }

  .swt {
    line-height: 36px;
    text-align: start;
  }

  .disabled {
    background-color: rgb(0 0 0 / 12%);
  }

  ::v-deep(textarea) {
    text-align: center;
  }

  ::v-deep(.ant-card-body) {
    padding: 8px;
  }
</style>
