<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    showFooter
    title="查寝详情"
    width="800px"
    useWrapper
    :showCancelBtn="false"
    @ok="closeModal"
  >
    <BasicTable @register="registerTable" />
  </BasicModal>
</template>
<script setup>
  import { ref } from 'vue';
  import { BasicTable, useTable } from '@/components/Table';
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { getCheckInDetail } from '@/api/dormitory';
  import { detailInfoChildColumns } from '../config';

  const checkInId = ref();
  const [registerTable, { reload }] = useTable({
    title: '',
    api: getCheckInDetail,
    beforeFetch: () => ({
      id: checkInId.value,
    }),
    canResize: true,
    bordered: true,
    maxHeight: 120,
    columns: detailInfoChildColumns,
    pagination: false,
    showIndexColumn: false,
  });

  const [registerModal, { closeModal }] = useModalInner(async (data) => {
    checkInId.value = data.id || '';
    reload();
  });
</script>
