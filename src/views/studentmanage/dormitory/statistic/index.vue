<template>
  <div>
    <BasicTable @register="registerTable">
      <!-- <template #bodyCell="{ column, record }">
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
      </template> -->
    </BasicTable>
  </div>
</template>
<script setup>
  import { BasicTable, useTable } from '@/components/Table';
  import { getSatisticInfo } from '@/api/dormitory';

  import { columns, searchFormSchema } from './config';
  // import { useMessage } from '@/hooks/web/useMessage';

  // const { notification } = useMessage();

  const [registerTable] = useTable({
    title: '',
    api: getSatisticInfo,
    // beforeFetch: () => ({}),
    columns,
    formConfig: {
      labelWidth: 120,
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
    // actionColumn: {
    //   width: 80,
    //   title: '操作',
    //   dataIndex: 'action',
    //   fixed: undefined,
    // },
  });
</script>
