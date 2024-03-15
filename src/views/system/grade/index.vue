<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate"> 新增年级 </a-button>
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
  import { getPageInfo, deleteItem } from '@/api/dictionary';

  import { useDrawer } from '@/components/Drawer';
  import DetailDrawer from './detailDrawer.vue';

  import { columns } from './config';
  import { useMessage } from '@/hooks/web/useMessage';

  const { notification } = useMessage();

  const [registerDrawer, { openDrawer }] = useDrawer();
  const [registerTable, { reload }] = useTable({
    title: '',
    api: () => getPageInfo({ DictTypeCode: 'grade' }),
    columns,
    formConfig: {
      autoSetPlaceHolder: true,
      labelWidth: 120,
      // schemas: searchFormSchema,
      showAdvancedButton: true,
      autoAdvancedLine: 1,
      actionColOptions: {
        span: 24,
      },
      autoSubmitOnEnter: true,
    },
    // useSearchForm: true,
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
@/api/classroom
