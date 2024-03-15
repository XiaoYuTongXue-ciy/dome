<template>
  <div>
    <BasicTable @register="registerTable" />
  </div>
</template>
<script setup>
  import { BasicTable, useTable } from '@/components/Table';
  import { getMenuList } from '@/api/sysAuth/menu.js';

  import { columns, searchFormSchema } from './config';

  defineOptions({ name: 'MenuManagement' });

  const [registerTable] = useTable({
    title: '菜单列表',
    api: getMenuList,
    columns,
    formConfig: {
      labelWidth: 120,
      schemas: searchFormSchema,
    },
    isTreeTable: true,
    pagination: false,
    striped: false,
    useSearchForm: true,
    showTableSetting: true,
    bordered: true,
    showIndexColumn: false,
    canResize: false,
  });
</script>
