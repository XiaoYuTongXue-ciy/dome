<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar
        ><div class="wrap">
          <div class="wrap-box">
            <!-- <BasicUpload
              :maxSize="20"
              :maxNumber="20"
              @change="handleChange"
              :api="uploadApi"
              :value="fileList"
            /> -->
            <!-- <a-button type="primary" class="export" @click="getExportData"> 导出 </a-button>
            <a-button type="primary" class="download" @click="getDownload"> 模板下载 </a-button> -->
          </div>
        </div>
        <a-button type="primary" @click="handleCreate"> 新增成绩设置 </a-button>
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
  // import { ref } from 'vue';
  import { getPageInfo, deleteItem } from './api';

  import { useDrawer } from '@/components/Drawer';
  // import { BasicUpload } from '/@/components/Upload';
  // import { useLoading } from '@/components/Loading';
  import DetailDrawer from './detailDrawer.vue';

  import { columns, searchFormSchema } from './config';
  import { useMessage } from '@/hooks/web/useMessage';
  // import { downloadByData } from '/@/utils/file/download';
  // import dayjs from 'dayjs';

  const { notification } = useMessage();

  let UploadIds = [];

  // const fileList = ref();

  // const [openFullLoading, closeFullLoading] = useLoading({
  //   tip: '下载中...',
  // });

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
    actionColumn: {
      width: 100,
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
  // async function getExportData() {
  //   openFullLoading();
  //   const uniqueArray = [...new Set(UploadIds)];
  //   const data = await getExport({ listId: uniqueArray });
  //   // data 为接口返回文件流数据，如果你的接口嵌套一层那就逐层去取
  //   UploadIds = [];
  //   const currentTime = dayjs();
  //   const formattedTime = currentTime.format('YYYYMMDDHHmmss');

  //   downloadByData(data, `资助管理${formattedTime}.xlsx`);
  //   closeFullLoading();
  // }

  // 模板导出
  // const getDownload = async () => {
  //   openFullLoading();
  //   const data = await getTemplateFile({
  //     TemplateCode: 'student_scholarship',
  //   });
  //   downloadByData(data, `学生奖学金.xlsx`);
  //   closeFullLoading();
  // };

  // // 导入

  // const handleChange = (fileList) => {
  //   console.log('fileList', fileList);
  // };
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
