<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <div class="wrap">
          <a-button type="primary" class="export" @click="getExportData"> 导出 </a-button>
        </div>
        <a-button type="primary" @click="handleCreate"> 新增教材统计发放 </a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
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
    </BasicTable>
    <DetailDrawer @register="registerDrawer" @success="handleSuccess" />
  </div>
</template>
<script setup>
  import { BasicTable, useTable, TableAction } from '@/components/Table';
  import { downloadByData } from '/@/utils/file/download';
  import { getPageInfo, deleteItem, getExport } from '@/api/textbookIssue';

  import { useDrawer } from '@/components/Drawer';
  import { useLoading } from '@/components/Loading';
  import DetailDrawer from './detailDrawer.vue';

  import { columns, searchFormSchema } from './config';
  import { useMessage } from '@/hooks/web/useMessage';
  import dayjs from 'dayjs';

  const { notification } = useMessage();
  const [openFullLoading, closeFullLoading] = useLoading({
    tip: '下载中...',
  });

  let UploadIds = [];

  const [registerDrawer, { openDrawer }] = useDrawer();
  const [registerTable, { reload }] = useTable({
    title: '',
    api: getPageInfo,
    columns,
    formConfig: {
      labelWidth: 120,
      schemas: searchFormSchema,
      showAdvancedButton: true,
      actionColOptions: {
        span: 24,
      },
      autoSubmitOnEnter: true,
    },
    useSearchForm: true,
    showTableSetting: true,
    bordered: true,
    showIndexColumn: true,
    rowSelection: {
      onChange: (selectedRowKeys, selectedRows) => {
        selectedRows.forEach((element) => {
          UploadIds.push(element.id);
        });
      },
    },
    indexColumnProps: {
      fixed: 'left',
    },
    actionColumn: {
      width: 80,
      title: '操作',
      dataIndex: 'action',
      fixed: 'right',
    },
  });

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
    const uniqueArray = [...new Set(UploadIds)];
    const data = await getExport({ ListIds: uniqueArray });

    // data 为接口返回文件流数据，如果你的接口嵌套一层那就逐层去取
    UploadIds = [];
    const currentTime = dayjs();
    const formattedTime = currentTime.format('YYYYMMDDHHmmss');

    downloadByData(data, `教材统计发放_${formattedTime}.xlsx`);
    closeFullLoading();
  }
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
