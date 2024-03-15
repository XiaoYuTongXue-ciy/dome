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
          :dataSource="record?.paymentAmountOutput"
          :pagination="{ pageSize: 10 }"
          :actionColumn="{
            width: 100,
            title: '操作',
            dataIndex: 'action',
            fixed: 'right',
          }"
        >
          <template #bodyCell="{ column, record: record2 }">
            <template v-if="column.key === 'action'">
              <TableAction
                :actions="[
                  {
                    icon: 'clarity:note-edit-line',
                    onClick: handleEdit.bind(null, record2),
                  },
                  {
                    icon: 'ant-design:delete-outlined',
                    color: 'error',
                    popConfirm: {
                      title: '是否确认删除',
                      placement: 'left',
                      confirm: handleDelete.bind(null, record2),
                    },
                  },
                ]"
              />
            </template>
          </template>
        </BasicTable>
      </template>
      <template #toolbar>
        <BasicUpload
          :maxSize="20"
          :maxNumber="20"
          @change="handleChange"
          :api="uploadApi"
          :value="fileList"
          @success="reload"
        />
        <a-button type="primary" class="download" @click="getDownload"> 模板下载 </a-button>
        <a-button type="primary" class="export" @click="getExportData"> 导出 </a-button>
        <a-button type="primary" @click="handleCreate"> 新增学生费用 </a-button>
      </template>
      <template #tableTitle>
        <Alert message="展开行数据可查看缴费记录" show-icon />
      </template>
    </BasicTable>
    <DetailDrawer @register="registerDrawer" @success="handleSuccess" />
  </div>
</template>
<script setup>
  import { Alert } from 'ant-design-vue';
  import { BasicTable, useTable, TableAction } from '@/components/Table';
  import { ref, unref } from 'vue';
  import { getPageInfo, deleteItem, getExport, uploadApi, getTemplateFile } from './api';

  import { useDrawer } from '@/components/Drawer';
  import { BasicUpload } from '/@/components/Upload';
  import { useLoading } from '@/components/Loading';
  import DetailDrawer from './detailDrawer.vue';

  import { columns, searchFormSchema, detailInfoColumns } from './config';
  import { useMessage } from '@/hooks/web/useMessage';
  import { downloadByData } from '/@/utils/file/download';
  import dayjs from 'dayjs';

  const { notification } = useMessage();

  let UploadIds = [];

  const fileList = ref();

  const [openFullLoading, closeFullLoading] = useLoading({
    tip: '下载中...',
  });

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
    rowSelection: {
      onChange: (selectedRowKeys, selectedRows) => {
        selectedRows.forEach((element) => {
          UploadIds.push(element.id);
        });
      },
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

  function handleSuccess() {
    notification.success({
      message: '操作成功',
      duration: 2,
    });
    reload();
  }
  // function handleUploadSuccess() {
  //   if (!tableRef.value.reload) return;
  //   tableRef.value.reload();
  // }

  // 导出
  async function getExportData() {
    openFullLoading();
    const uniqueArray = [...new Set(UploadIds)];
    const data = await getExport({ listIds: uniqueArray });
    // data 为接口返回文件流数据，如果你的接口嵌套一层那就逐层去取
    UploadIds = [];
    const currentTime = dayjs();
    const formattedTime = currentTime.format('YYYYMMDDHHmmss');

    downloadByData(data, `学生费用管理${formattedTime}.xlsx`);
    closeFullLoading();
  }

  // 模板导出
  const getDownload = async () => {
    openFullLoading();
    const data = await getTemplateFile({
      TemplateCode: 'student_tuitionfee',
    });
    downloadByData(data, `学生费用导入模板.xlsx`);
    closeFullLoading();
  };

  // 导入

  const handleChange = (fileList) => {
    console.log('fileList', fileList);
  };
</script>

<style scoped lang="less">
  // :deep(.vben-basic-table-header__toolbar) {
  //   justify-content: flex-start !important;
  // }
</style>
