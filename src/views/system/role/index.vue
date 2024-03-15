<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate">新增角色</a-button>
      </template>
      <template #bodyCell="{ record, column }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                icon: 'clarity:note-edit-line',
                onClick: handleEdit.bind(null, record),
              },
              {
                icon: 'ant-design:snippets-outlined',
                onClick: handleDataScope.bind(null, record),
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
    <AddDrawer @register="registerDrawer" @success="handleSuccess" />
    <DetailModal @register="registerModal" @success="handleSuccess" />
  </div>
</template>

<script setup>
  import { BasicTable, useTable, TableAction } from '@/components/Table';
  import { getPageInfo, deleteItem } from '@/api/role';
  import { columns, searchFormSchema } from './config';

  import { useDrawer } from '@/components/Drawer';
  import { useModal } from '@/components/Modal';

  import AddDrawer from './components/addDrawer.vue';
  import DetailModal from './components/detailModal.vue';
  // import DetailPop from './components/detailPop.vue';

  import { useMessage } from '@/hooks/web/useMessage';

  const { notification } = useMessage();
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
  // 授权数据范围
  async function handleDataScope(record) {
    // const data = await getOwnOrgList({ id: record.id });
    // console.log('授权数据范围', data);

    openModal(true, {
      id: record.id,
      dataScope: record.dataScope,
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
</script>

<style lang="scss" scoped></style>
@/api/role/role.js
