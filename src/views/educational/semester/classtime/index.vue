<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" class="export" @click="getExportData"> 导出 </a-button>
        <a-button type="primary" @click="handleCreate">新增上课时间</a-button>
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
  import { getPageInfo, deleteItem, getExport } from '@/api/semester/classTime.js';
  import { columns, searchFormSchema } from './config';

  import { useDrawer } from '@/components/Drawer';
  import { useLoading } from '@/components/Loading';
  import DetailDrawer from './detailDrawer.vue';

  import { useMessage } from '@/hooks/web/useMessage';
  import { downloadByData } from '@/utils/file/download';
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
      actionColOptions: {
        span: 24,
      },
      showAdvancedButton: true,
    },
    useSearchForm: true,
    showTableSetting: true,
    bordered: true,
    showIndexColumn: true,
    indexColumnProps: {
      fixed: 'left',
    },
    rowKey: 'id',
    rowSelection: {
      onSelect: (record, selected) => {
        if (selected) {
          UploadIds.push(record.id);
        } else {
          const idx = UploadIds.indexOf(record.id);
          if (idx > -1) {
            UploadIds.splice(idx, 1);
          }
        }
      },
      onSelectAll: (selected, changeRows) => {
        const changeIds = changeRows.map((item) => item.id);
        if (selected) {
          UploadIds.push(...changeIds);
        } else {
          UploadIds.splice(0);
        }
      },
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
  // 导出列表数据
  async function getExportData() {
    openFullLoading();
    const data = await getExport({ listIds: UploadIds });
    // data 为接口返回文件流数据，如果你的接口嵌套一层那就逐层去取
    const currentTime = dayjs();
    const formattedTime = currentTime.format('YYYYMMDDHHmmss');

    downloadByData(data, `上课时间详情_${formattedTime}.xlsx`);
    closeFullLoading();
  }
</script>

<style lang="less" scoped></style>
