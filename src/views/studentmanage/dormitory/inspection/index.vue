<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate"> 新增查寝记录 </a-button>
      </template>
      <template #bodyCell="{ record, column }">
        <!-- <template v-if="column.key === 'inDormitoryStudents'">
          <DetailPop title="在寝人数详情" :showMsg="record.inDormitoryStudents.length + '人'">
            <li v-for="item in record.inDormitoryStudents" :key="item.id"
              >{{ item?.studentName }}
            </li>
          </DetailPop>
        </template> -->
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                icon: 'ant-design:info-circle-outlined',
                onClick: handleShowDetail.bind(null, record),
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>
    <AddDrawer @register="registerDrawer" @success="handleSuccess" />
    <DetailModal @register="registerModal" />
  </div>
</template>
<script setup>
  import { BasicTable, useTable, TableAction } from '@/components/Table';
  import { getCheckInPage } from '@/api/dormitory';

  import { useDrawer } from '@/components/Drawer';
  import { useModal } from '@/components/Modal';
  import AddDrawer from './components/addDrawer.vue';
  import DetailModal from './components/detailModal.vue';

  import { columns, searchFormSchema } from './config';
  import { useMessage } from '@/hooks/web/useMessage';

  const { notification } = useMessage();

  const [registerDrawer, { openDrawer }] = useDrawer();
  const [registerModal, { openModal }] = useModal({});
  const [registerTable, { reload }] = useTable({
    title: '',
    api: getCheckInPage,
    columns,
    formConfig: {
      labelWidth: 90,
      schemas: searchFormSchema,
      showAdvancedButton: true,
    },
    actionColOptions: {
      span: 4,
    },
    useSearchForm: true,
    showTableSetting: true,
    bordered: true,
    showIndexColumn: true,
    actionColumn: {
      width: 120,
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

  function handleShowDetail(record) {
    openModal(true, {
      id: record.id,
      inStudens: record.inDormitoryStudents,
    });
  }

  function handleSuccess() {
    notification.success({
      message: '操作成功',
      duration: 2,
    });
    reload();
  }
</script>

<style scoped lang="less">
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
