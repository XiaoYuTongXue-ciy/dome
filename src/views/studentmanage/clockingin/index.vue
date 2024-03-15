<template>
  <div>
    <BasicTable @register="registerTable">
      <template #expandedRowRender="{ record }">
        <BasicTable
          style="margin-inline: 0 -6px"
          :maxHeight="280"
          :columns="detailInfoColumns"
          :dataSource="record?.clockingInClass"
          :pagination="{ pageSize: 10 }"
          :canResize="true"
          :actionColumn="childActionColumn"
        >
          <template #bodyCell="{ column, record: childRecord }">
            <template v-if="column.key === 'action'">
              <TableAction
                :actions="[
                  {
                    icon: 'ant-design:info-circle-outlined',
                    onClick: handleInfo.bind(null, childRecord),
                  },
                ]"
              />
            </template>
          </template>
        </BasicTable>
      </template>

      <template #form-localSearch="{ model, field }">
        <ApiSelect
          :api="getUserList"
          showSearch
          v-model:value="model[field]"
          optionFilterProp="label"
          resultField="items"
          labelField="realName"
          valueField="id"
        />
      </template>
    </BasicTable>

    <ClockingInDrawer @register="registerDrawer" @success="handleSuccess" @error="handleError" />
    <DetailModal @register="registerModal" />
  </div>
</template>
<script setup>
  import { BasicTable, useTable, TableAction } from '@/components/Table';
  import { ApiSelect } from '@/components/Form';
  import { getPageInfo as getUserList } from '@/api/sysUser/index.js';
  import { getPageInfo } from '@/api/clockingIn';

  import ClockingInDrawer from './components/clockingInDrawer.vue';
  import DetailModal from './components/detailModal.vue';

  import { useDrawer } from '@/components/Drawer';
  import { useModal } from '@/components/Modal';

  import { MessageEnum } from '@/enums/MessageEnum.ts';
  import { useMessage } from '@/hooks/web/useMessage';

  import { detailInfoColumns, columns, searchFormSchema } from './config';

  const { notification } = useMessage();

  const [registerDrawer] = useDrawer();
  const [registerModal, { openModal }] = useModal({});
  const [registerTable, { reload }] = useTable({
    title: '',
    api: getPageInfo,
    columns,
    formConfig: {
      labelWidth: 120,
      schemas: searchFormSchema,
      actionColOptions: {
        span: 11,
      },
      alwaysShowLines: 1,
    },

    useSearchForm: true,
    showTableSetting: true,
    bordered: true,
    showIndexColumn: true,
    expandRowByClick: true,
    isTreeTable: true,
  });

  const childActionColumn = {
    width: 120,
    title: '操作',
    dataIndex: 'action',
    fixed: 'right',
  };

  function handleSuccess() {
    notification.success({
      message: MessageEnum.SUCCESS,
      duration: 2,
    });
    reload();
  }

  function handleError() {
    notification.error({
      message: MessageEnum.ERROR,
      duration: 2,
    });
    reload();
  }

  function handleInfo(record) {
    console.log('record', record);
    openModal(true, {
      id: record.id,
      clockingInId: record.clockingInId,
    });
  }
</script>
