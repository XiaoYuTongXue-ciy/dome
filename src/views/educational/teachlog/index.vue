<template>
  <div>
    <BasicTable
      rowKey="id"
      :expandedRowKeys="expandedRowKeys"
      @expand="handleExpand"
      @register="registerTable"
    >
      <template #expandedRowRender="{ record }">
        <BasicTable
          style="margin-inline: 0 -6px"
          :maxHeight="280"
          :columns="detailInfoColumns"
          :dataSource="record?.absenceInfos"
          :pagination="{ pageSize: 10 }"
          :actionColumn="{
            width: 100,
            title: '操作',
            dataIndex: 'action',
            fixed: 'right',
          }"
        >
          <template #bodyCell="{ column, record: recordAsben }">
            <template v-if="column.key === 'action'">
              <TableAction
                :actions="[
                  {
                    icon: 'clarity:note-edit-line',
                    onClick: handleEditAsben.bind(null, recordAsben),
                  },
                  {
                    icon: 'ant-design:delete-outlined',
                    color: 'error',
                    popConfirm: {
                      title: '是否确认删除',
                      placement: 'left',
                      confirm: handleDeleteAsben.bind(null, recordAsben),
                    },
                  },
                ]"
              />
            </template>
          </template>
        </BasicTable>
      </template>
      <template #toolbar>
        <a-button type="primary" @click="handleCreate"> 新增日志 </a-button>

        <a-button type="primary" class="export" @click="getExportData"> 导出 </a-button>
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
        <Alert message="展开行数据查看缺勤记录" show-icon />
      </template>
    </BasicTable>
    <DetailDrawer @register="registerDrawer" @success="handleSuccess" />
    <AsbenDrawer @register="registerAsbenDrawer" @success="handleSuccess" />
  </div>
</template>
<script setup>
  import { ref, unref } from 'vue';
  import { Alert } from 'ant-design-vue';
  import { BasicTable, useTable, TableAction } from '@/components/Table';
  import { getPageInfo, deleteItem, getExport, deleteAsben } from './api';
  import { downloadByData } from '@/utils/file/download';

  import { useLoading } from '@/components/Loading';
  import DetailDrawer from './detailDrawer.vue';
  import AsbenDrawer from './absenteeismDrawer.vue';
  import { useDrawer } from '@/components/Drawer';

  import { columns, searchFormSchema, detailInfoColumns } from './config';
  import { useMessage } from '@/hooks/web/useMessage';
  import dayjs from 'dayjs';

  let UploadIds = [];
  const { notification } = useMessage();
  const [openFullLoading, closeFullLoading] = useLoading({
    tip: '下载中...',
  });

  const [registerDrawer, { openDrawer }] = useDrawer();
  const [registerAsbenDrawer, { openDrawer: openDrawerAsben }] = useDrawer();

  const [registerTable, { reload }] = useTable({
    title: '',
    api: getPageInfo,
    columns,
    formConfig: {
      autoSetPlaceHolder: true,
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
    actionColumn: {
      width: 80,
      title: '操作',
      dataIndex: 'action',
      fixed: 'right',
    },
    expandRowByClick: true,
    isTreeTable: true,
  });

  const expandedRowKeys = ref([]);

  function handleExpand(expanded, record) {
    let keyList = [...unref(expandedRowKeys)];
    keyList.push(record.id);
    expandedRowKeys.value = [...new Set(keyList)];
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

  function handleEditAsben(record) {
    openDrawerAsben(true, {
      record,
      isUpdate: true,
    });
  }
  async function handleDeleteAsben(record) {
    await deleteAsben({ id: record.id });
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
    const data = await getExport({ listIds: uniqueArray });
    UploadIds = [];
    const currentTime = dayjs();
    const formattedTime = currentTime.format('YYYYMMDDHHmmss');

    downloadByData(data, `教学日志${formattedTime}.xlsx`);
    closeFullLoading();
  }
</script>
<style scoped lang="less">
  .wrap {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 25rem;
    margin-right: 3rem;

    .wrap-box {
      display: flex;
      align-items: center;
      justify-content: space-around;
      width: 100%;
    }
  }
</style>
