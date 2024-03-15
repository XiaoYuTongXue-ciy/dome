<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" class="export" @click="handleCreate"> 导入 </a-button>
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
              {
                icon: 'ant-design:vertical-align-bottom-outlined',
                onclick: handleDownload.bind(null, record),
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
  import { getPageInfo, deleteItem, getSysFile } from '@/api/talentCultivation';
  import { columns, searchFormSchema } from './config';

  import { useLoading } from '@/components/Loading';
  import { useDrawer } from '@/components/Drawer';
  import DetailDrawer from './detailDrawer.vue';

  import { useMessage } from '@/hooks/web/useMessage';
  import { downloadByData } from '@/utils/file/download';
  import dayjs from 'dayjs';

  const { notification } = useMessage();

  const [registerDrawer, { openDrawer }] = useDrawer();
  const [openFullLoading, closeFullLoading] = useLoading({
    tip: '下载中...',
  });

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
    actionColumn: {
      width: 120,
      title: '操作',
      dataIndex: 'action',
      fixed: 'right',
    },
    expandRowByClick: true,
  });
  function handleCreate() {
    openDrawer(true);
  }
  function handleSuccess() {
    notification.success({
      message: '操作成功',
      duration: 2,
    });
    reload();
  }
  // 删除
  async function handleDelete(record) {
    try {
      await deleteItem({ id: record.id });
      notification.success({
        message: '操作成功',
        duration: 2,
      });
      reload();
    } catch (error) {
      notification.error({
        message: error.message,
        duration: 2,
      });
    }
  }

  // // 导入
  // const handleUpload = (fileList) => {
  //   console.log('fileList', fileList);
  // };

  // 导出
  const handleDownload = async (record) => {
    openFullLoading();

    const data = await getSysFile({ id: record.fileId });
    const currentTime = dayjs();
    const formattedTime = currentTime.format('YYYYMMDDHHmmss');
    console.log(data);

    downloadByData(data, `人才培养方案_${formattedTime}.docx`);
    closeFullLoading();
  };
</script>

<style lang="less" scoped>
  :deep(.ant-form-item-no-colon) {
    /* 居中对齐 */
    display: inline-block !important;
    width: 100%;
    padding-left: 20px;
    line-height: 32px;
    text-align: justify;
    text-align-last: justify;
  }
</style>
