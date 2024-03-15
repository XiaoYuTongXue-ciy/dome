<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <div class="wrap">
          <div class="wrap-box">
            <BasicUpload
              :maxSize="20"
              :maxNumber="20"
              @change="handleChange"
              :api="uploadApi"
              :value="fileList"
            />
            <a-button type="primary" class="export" @click="getExportData"> 导出 </a-button>
            <a-button type="primary" class="download" @click="getDownload"> 模板下载 </a-button>
            <a-button type="primary" @click="handleShowDetail"> 分班设置 </a-button>
          </div>
        </div>
        <a-button type="primary" @click="handleCreate"> 新增入学管理 </a-button>
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
  <Divisionrules @register="registerModal" />
</template>
<script setup>
  import { ref } from 'vue';
  import { BasicTable, useTable, TableAction } from '@/components/Table';
  import { getPageInfo, deleteItem, getExport, uploadApi } from '@/api/dividedclasses';
  import Divisionrules from './components/divisionrules.vue';

  import DetailDrawer from './detailDrawer.vue';
  import { BasicUpload } from '/@/components/Upload';
  import { useDrawer } from '@/components/Drawer';

  import { columns, searchFormSchema } from './config';
  import { useMessage } from '@/hooks/web/useMessage';
  import { useLoading } from '@/components/Loading';
  import { useModal } from '@/components/Modal';
  import { downloadByData } from '/@/utils/file/download';
  import dayjs from 'dayjs';

  let UploadIds = [];
  const { notification } = useMessage();
  const fileList = ref();

  const [registerModal, { openModal }] = useModal({});

  const [openFullLoading, closeFullLoading] = useLoading({
    tip: '下载中...',
  });

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

  function handleShowDetail(record) {
    openModal(true, {
      id: record.id,
      inStudens: record.inDormitoryStudents,
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
    console.log(uniqueArray);
    const data = await getExport({ listId: uniqueArray });

    // data 为接口返回文件流数据，如果你的接口嵌套一层那就逐层去取
    UploadIds = [];
    const currentTime = dayjs();
    const formattedTime = currentTime.format('YYYYMMDDHHmmss');

    downloadByData(data, `招新信息${formattedTime}.xlsx`);
    closeFullLoading();
  }

  // 模板导出
  const getDownload = async () => {
    openFullLoading();
    const data = await getTemplateFile({
      TemplateCode: 'teaching_material',
    });
    console.log(data);
    downloadByData(data, `招新信息.xlsx`);
    closeFullLoading();
  };

  // 导入

  const handleChange = (fileList) => {
    console.log('fileList', fileList);
  };
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
