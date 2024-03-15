<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    showFooter
    title="考勤详情"
    width="1200px"
    useWrapper
    :showCancelBtn="false"
    @ok="closeModal"
  >
    <BasicTable @register="registerTable">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction :actions="createActions(record)" />
        </template>
      </template>
    </BasicTable>
  </BasicModal>
</template>
<script setup>
  import { ref } from 'vue';
  import { BasicTable, useTable, TableAction } from '@/components/Table';
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { getDetailInfo } from '@/api/clockingIn';
  import { cloneDeep } from 'lodash-es';
  import { useMessage } from '@/hooks/web/useMessage';
  import { detailInfoChildColumns } from '../config';
  import { add, deleteItem } from '@/api/signIn';

  const currentId = ref();
  const clockingInId = ref();
  const currentEditKeyRef = ref('');
  const { createMessage: msg } = useMessage();
  const [registerModal, { closeModal }] = useModalInner(async (data) => {
    currentId.value = data.id || '';
    clockingInId.value = data.clockingInId || '';
    currentEditKeyRef.value = '';
    reload();
  });

  const [registerTable, { reload }] = useTable({
    title: '',
    api: getDetailInfo,
    beforeFetch: (value) => ({
      ...value,
      id: clockingInId.value,
      ClassId: currentId.value,
    }),
    isTreeTable: true,
    maxHeight: 450,
    fetchSetting: {
      listField: 'signInStatus',
    },
    canResize: true,
    columns: detailInfoChildColumns,
    bordered: false,
    showIndexColumn: true,
    actionColumn: {
      width: 120,
      title: '操作',
      dataIndex: 'action',
      fixed: 'right',
    },
  });

  function createActions(record) {
    if (!record.editable) {
      return [
        {
          label: '编辑',
          disabled: currentEditKeyRef.value ? currentEditKeyRef.value !== record.key : false,
          onClick: handleEdit.bind(null, record),
        },
      ];
    }
    return [
      {
        label: '保存',
        onClick: handleSave.bind(null, record),
      },
      {
        label: '取消',
        onClick: handleCancel.bind(null, record),
      },
    ];
  }

  function handleEdit(record) {
    currentEditKeyRef.value = record.key;
    record.onEdit?.(true);
  }

  function handleCancel(record) {
    currentEditKeyRef.value = '';
    record.onEdit?.(false, false);
  }

  async function handleSave(record) {
    // 校验
    msg.loading({ content: '正在保存...', duration: 0, key: 'saving' });
    // update
    const valid = await record.onValid?.();
    if (valid) {
      try {
        const data = cloneDeep(record.editValueRefs);

        //TODO 此处将数据提交给服务器保存
        data.status
          ? await add({
              clockingInId: clockingInId.value,
              studentId: record?.id,
              checkInStatus: data.status,
            })
          : await deleteItem({
              clockingInId: clockingInId.value,
              studentId: record?.id,
            });
        // 保存之后提交编辑状态
        const pass = await record.onEdit?.(false, true);
        if (pass) {
          currentEditKeyRef.value = '';
        }
        reload();
        msg.success({ content: '数据已保存', key: 'saving' });
      } catch (error) {
        msg.error({ content: '保存失败', key: 'saving' });
      }
    } else {
      msg.error({ content: '请填写正确的数据', key: 'saving' });
    }
  }
</script>
