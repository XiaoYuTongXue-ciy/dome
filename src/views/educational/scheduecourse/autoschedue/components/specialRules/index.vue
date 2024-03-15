<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <div>教师特殊排课要求</div>
        <a-button type="primary" @click="open = true">新增排课要求</a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                icon: 'ant-design:delete-outlined',
                color: 'error',
                popConfirm: {
                  title: '是否确认删除',
                  placement: 'left',
                  confirm: handleDelete.bind(null, record),
                },
              },
            ]"
          />
        </template> </template
    ></BasicTable>
    <Modal
      v-model:open="open"
      title="教师特殊排课要求"
      width="740px"
      @ok="addItem"
      @cancel="closeModal"
      :destroyOnClose="true"
    >
      <div class="m-4 px-4 overflow-hidden">
        <MeTransfer ref="transferRef" class="tree" @change="handleChange" />
        <p class="my-2"> 以上老师 </p>
        <Row class="my-2">
          <Col :span="11">
            <InputNumber
              addonBefore="每周最多连续安排"
              addonAfter=" 天"
              :min="0"
              v-model:value="schedule.weekly"
            />
          </Col>
          <Col :span="11" :offset="2">
            <InputNumber
              addonBefore="每日最多连续安排"
              addonAfter="节课"
              :min="0"
              v-model:value="schedule.daily"
            />
          </Col>
        </Row>
        <Row>
          <Col :span="11" class="flex">
            <div class="box">每日上课时间</div>
            <Select
              :options="options"
              v-model:value="schedule.slot"
              mode="multiple"
              :maxTagCount="1"
              allowClear
              class="flex-1"
            />
          </Col>
          <Col :span="11" :offset="2">
            <InputNumber
              addonBefore="当前时段最多上课"
              addonAfter="次"
              :min="0"
              :max="daysPerWeek"
              v-model:value="schedule.number"
            />
          </Col>
        </Row>
      </div>
    </Modal>
  </div>
</template>

<script setup lang="ts">
  import { ref, reactive, onMounted, watch } from 'vue';
  import { Row, Col, InputNumber, Modal, Select, type SelectProps } from 'ant-design-vue';

  import { BasicTable, useTable, TableAction } from '@/components/Table';
  import { columns } from '../config';
  import MeTransfer from '../transfer/index.vue';

  import { getDetailInfo } from '@/api/semester/detail.js';
  import {
    getPageInfo,
    deleteItem,
    batchSave,
  } from '@/api/educational/schedueCourse/teacherSchedule.js';
  import { useMessage } from '@/hooks/web/useMessage';

  const { notification } = useMessage();

  const props = defineProps({
    params: {
      type: Object,
      default: null,
    },
  });

  const open = ref<boolean>(false);
  const daysPerWeek = ref(); // 当前学期每周上课天数
  const classIds = ref([]);
  const options = ref<Required<SelectProps>['options']>([]); // 授课开始周次选项
  watch(
    () => props.params.classIds,
    (val) => {
      classIds.value = val;
      reload();
    },
    {
      deep: true,
    },
  );
  const schedule = reactive({
    semesterDetailId: props.params.semesterDetailId,
    teacherIds: [] as number[],
    weekly: 0, // 每周最多连续上课天数
    daily: 0, // 每天最多上课节数
    slot: [] as number[], // 上课时间
    number: 0, // 每节课最多上课次数
  });

  const [registerTable, { reload }] = useTable({
    title: '',
    api: getPageInfo,
    beforeFetch: (value) => ({
      ...value,
      classIds: classIds.value,
    }),
    columns,
    showTableSetting: false,
    bordered: true,
    rowKey: 'id',
    actionColumn: {
      width: 80,
      title: '操作',
      dataIndex: 'action',
      fixed: 'right',
    },
    showIndexColumn: true,
    canResize: false,
    scroll: { y: 100 },
    indexColumnProps: {
      fixed: 'left',
    },
  });

  // 选择教师
  function handleChange(items: any) {
    schedule.teacherIds = [];
    if (items.length > 0) {
      items.map((item) => {
        item.children.map((item) => schedule.teacherIds.push(item.id));
      });
    }
  }

  // 关闭弹窗
  function closeModal() {
    schedule.teacherIds = [];
    schedule.weekly = 0;
    schedule.daily = 0;
    schedule.slot = [];
    schedule.number = 0;
  }

  // 提交教师特殊要求
  async function addItem() {
    if (schedule.teacherIds.length === 0) {
      notification.info({
        message: '请先选择老师！',
        duration: 2,
      });
    } else if (schedule.daily === 0 && schedule.weekly === 0 && schedule.number === 0) {
      notification.info({
        message: '请至少添加一个限制条件！',
        duration: 2,
      });
    } else {
      await batchSave(schedule);
      open.value = false;
      notification.success({
        message: '操作成功',
        duration: 2,
      });
      reload();
    }
  }

  // 获取每日上课节数
  async function fetch() {
    // 获取学期详情
    const detail = await getDetailInfo({ id: props.params.semesterDetailId });
    daysPerWeek.value = detail.daysPerWeek;
    for (let i = 1; i <= detail.lessonNumber; i++)
      options.value.push({ label: `第${i}节`, value: i });
  }

  // 删除特殊排课要求
  async function handleDelete(record) {
    await deleteItem({ id: record.id });
    notification.success({
      message: '操作成功',
      duration: 2,
    });
    reload();
  }

  onMounted(() => {
    fetch();
  });
</script>

<style scoped lang="less">
  ::v-deep(.ant-input-number-group-addon) {
    width: 140px;
    text-align: left;
  }

  .box {
    width: 135px;
    height: 32px;
    padding: 0 11px;
    border: 1px solid #d9d9d9;
    border-right: none;
    border-radius: 6px;
    line-height: 30px;
    border-start-end-radius: 0;
    border-end-end-radius: 0;
  }
  // .draggable-box {
  //   width: 300px;
  // }

  ::v-deep(.ant-select-selector) {
    border-start-start-radius: 0;
    border-end-start-radius: 0;
  }

  ::v-deep(.vben-basic-table-header__toolbar) {
    justify-content: space-between;
  }
</style>
