<template>
  <div> <BasicTable @register="registerTable" /></div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { BasicTable, useTable } from '@/components/Table';
  import { columns } from '../config';

  const emits = defineEmits(['change']);
  const props = defineProps({
    data: {
      type: Array,
      default: () => [],
    },
  });
  const info = ref();
  info.value = props.data;

  const [registerTable] = useTable({
    title: '',
    dataSource: info.value,
    columns: columns,
    showTableSetting: false,
    bordered: true,
    pagination: false,
    rowKey: 'id',
    rowSelection: {
      type: 'radio',
      onChange: (selectedRowKeys, selectedRows) => {
        if (!selectedRows) {
          return;
        } else {
          emits('change', selectedRows[0]);
        }
      },
    },
    showIndexColumn: true,
    canResize: false,
    scroll: { y: 100 },
    indexColumnProps: {
      fixed: 'left',
    },
  });
</script>

<style scoped></style>
