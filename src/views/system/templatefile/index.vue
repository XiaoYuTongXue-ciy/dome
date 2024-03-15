<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate"> 新增模板 </a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                icon: 'ant-design:vertical-align-bottom-outlined',
                onclick: handleDownload.bind(null, record),
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
        <template v-else-if="column.key === 'button'">
          <a-button :src="record.url" @click="handleclick">下载模板 </a-button>
        </template>
      </template>
    </BasicTable>
    <DetailDrawer @register="registerDrawer" @success="handleSuccess" />
  </div>
</template>
<script setup>
  import { BasicTable, useTable, TableAction } from '@/components/Table';
  import { getPageInfo, deleteItem, getSysFile } from '@/api/templatefile';

  import { useDrawer } from '@/components/Drawer';
  import DetailDrawer from './detailDrawer.vue';

  import { columns, searchFormSchema } from './config';
  import { useMessage } from '@/hooks/web/useMessage';
  import dayjs from 'dayjs';
  import { downloadByData } from '@/utils/file/download';
  import { useLoading } from '@/components/Loading';

  const { notification } = useMessage();

  const [registerDrawer, { openDrawer }] = useDrawer();
  const [registerTable, { reload }] = useTable({
    title: '',
    api: getPageInfo,
    columns,
    formConfig: {
      autoSetPlaceHolder: true,
      labelWidth: 120,
      schemas: searchFormSchema,
      showAdvancedButton: true,
      autoAdvancedLine: 1,
      actionColOptions: {
        span: 24,
      },
      autoSubmitOnEnter: true,
    },
    useSearchForm: true,
    showTableSetting: true,
    bordered: true,
    showIndexColumn: true,
    actionColumn: {
      width: 80,
      title: '操作',
      dataIndex: 'action',
      fixed: undefined,
    },
  });

  const [openFullLoading, closeFullLoading] = useLoading({
    tip: '下载中...',
  });

  function handleCreate() {
    openDrawer(true, {
      isUpdate: false,
    });
  }

  const handleDownload = async (record) => {
    openFullLoading();
    console.log(record);
    const data = await getSysFile({ id: record.fileId });
    const currentTime = dayjs();
    const formattedTime = currentTime.format('YYYYMMDDHHmmss');
    console.log(data);

    downloadByData(data, `${record?.templateName}_${formattedTime}.docx`);
    closeFullLoading();
  };

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

  function handleclick() {
    console.log(11111);
  }
</script>
