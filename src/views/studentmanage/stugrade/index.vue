<template>
  <div>
    <BasicTable
      ref="tableRef"
      rowKey="id"
      :expandedRowKeys="expandedRowKeys"
      @expand="handleExpand"
      @register="registerTable"
    >
      <template #expandedRowRender="{ record }">
        <BasicTable
          style="margin-inline: 0 -6px"
          :maxHeight="280"
          :columns="gradeSetting"
          :dataSource="[record?.gradeSettingInfo]"
          :pagination="{ pageSize: 10 }"
      /></template>
      <template #toolbar>
        <BasicUpload
          :maxSize="20"
          :maxNumber="20"
          :api="uploadApi"
          :value="fileList"
          @success="reload"
        />
        <a-button type="primary" @click="getExportData" :icon="h(ExportOutlined)"> 导出 </a-button>
        <a-button type="primary" @click="getExportData" :icon="h(ImportOutlined)"> 导入 </a-button>
        <a-button type="primary" @click="getDownload" :icon="h(CloudDownloadOutlined)">
          模板下载
        </a-button>
        <a-button type="primary" @click="examine"> 审核 </a-button>
        <a-button type="primary" @click="publish"> 审核发布 </a-button>
        <a-button type="primary" @click="handleCreate"> 新增学生成绩 </a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :stopButtonPropagation="true"
            :actions="[
              {
                icon: 'clarity:note-edit-line',
                onClick: handleEdit.bind(null, record),
              },
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
        </template>
      </template>
      <template #tableTitle>
        <Alert message="展开行数据查看成绩设置" show-icon />
      </template>
    </BasicTable>
    <DetailDrawer @register="registerDrawer" @success="handleSuccess" />
    <ExamineModal @register="registerModal" @success="handleSuccess" />
  </div>
</template>
<script setup>
  import { BasicTable, useTable, TableAction } from '@/components/Table';
  import { ref, unref, h, computed } from 'vue';
  import { Alert } from 'ant-design-vue';
  import { ExportOutlined, CloudDownloadOutlined, ImportOutlined } from '@ant-design/icons-vue';
  import {
    getPageInfo,
    deleteItem,
    getExport,
    publishRelease,
    getTemplateFile,
    uploadApi,
  } from './api';

  import { useModal } from '@/components/Modal';
  import { useDrawer } from '@/components/Drawer';
  import { BasicUpload } from '/@/components/Upload';
  import { useLoading } from '@/components/Loading';
  import DetailDrawer from './detailDrawer.vue';
  import ExamineModal from './ExamineModal.vue';

  import { columns, searchFormSchema, gradeSetting } from './config';
  import { useMessage } from '@/hooks/web/useMessage';
  import { downloadByData } from '/@/utils/file/download';
  import dayjs from 'dayjs';

  const { notification, createConfirm, createWarningModal } = useMessage();

  const tableRef = ref([]);
  const expandedRowKeys = ref([]);

  // const fileList = ref();

  const [openFullLoading, closeFullLoading] = useLoading({
    tip: '导出中...',
  });

  const [registerModal, { openModal }] = useModal({});

  const [registerDrawer, { openDrawer }] = useDrawer();
  const [registerTable, { reload }] = useTable({
    title: '',
    api: getPageInfo,
    columns,
    formConfig: {
      labelWidth: 120,
      schemas: searchFormSchema,
      actionColOptions: {
        span: 24,
      },
      showAdvancedButton: true,
    },
    useSearchForm: true,
    showTableSetting: true,
    bordered: true,
    showIndexColumn: true,
    rowSelection: {},
    actionColumn: {
      width: 100,
      title: '操作',
      dataIndex: 'action',
      fixed: 'right',
    },
    expandRowByClick: true,
    isTreeTable: true,
  });

  const selectedRowKeys = computed(() => tableRef.value.getSelectRowKeys());

  function handleExpand(expanded, record) {
    let keyList = [...unref(expandedRowKeys)];
    keyList.push(record.id);
    expandedRowKeys.value = [...new Set(keyList)];
  }

  function examine() {
    if (!selectedRowKeys.value.length) {
      createWarningModal({
        iconType: 'warning',
        title: () => h('span', '温馨提示'),
        content: () => h('span', '请选择成绩数据!'),
      });
      return;
    }

    openModal(true, {
      ids: selectedRowKeys.value,
    });
  }
  async function publish() {
    createConfirm({
      iconType: 'warning',
      title: () => h('span', '温馨提示'),
      content: () => h('span', '确认审批吗?'),
      onOk: async () => {
        await publishRelease({ ids: selectedRowKeys.value });
        reload();
      },
    });
  }

  function handleCreate() {
    openDrawer(true, {
      isUpdate: false,
    });
  }

  function handleEdit(record) {
    openDrawer(true, {
      record,
      isUpdate: true,
    });
  }

  async function handleDelete(record) {
    await deleteItem({ id: record.id });
    notification.success({
      message: '操作成功',
      duration: 2,
    });
    reload();
  }

  function handleSuccess() {
    notification.success({
      message: '操作成功',
      duration: 2,
    });
    reload();
  }

  // 导出
  async function getExportData() {
    openFullLoading();
    const uniqueArray = [...new Set(selectedRowKeys.value)];
    const data = await getExport({ listIds: uniqueArray });
    // data 为接口返回文件流数据，如果你的接口嵌套一层那就逐层去取
    const currentTime = dayjs();
    const formattedTime = currentTime.format('YYYYMMDDHHmmss');

    downloadByData(data, `资助管理${formattedTime}.xlsx`);
    closeFullLoading();
  }

  // 模板导出
  const getDownload = async () => {
    openFullLoading();
    const data = await getTemplateFile({
      TemplateCode: 'student_grade',
    });
    downloadByData(data, `学生成绩.xlsx`);
    closeFullLoading();
  };

  // // 导入
</script>

<style scoped lang="less">
  .wrap {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 20rem;
    margin-right: 3rem;

    .wrap-box {
      display: flex;
      align-items: center;
      justify-content: space-around;
      width: 100%;
    }
  }
</style>
