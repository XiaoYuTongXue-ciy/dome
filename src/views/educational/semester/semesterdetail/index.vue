<template>
  <div>
    <BasicTable @register="registerTable">
      <template #semesterId>123</template>
      <template #toolbar>
        <a-button type="primary" class="export" @click="getExportData"> 导出 </a-button>
        <a-button type="primary" @click="handleCreate">新增学期</a-button>
      </template>
      <template #bodyCell="{ record, column }">
        <template v-if="column.key === 'classTimeInfos'">
          <DetailPop title="上课时间详情">
            <li v-for="item in record.classTimeInfos" :key="item.id">{{ item?.info }} </li>
          </DetailPop>
        </template>
        <template v-if="column.key === 'monthlyWorkInfos'">
          <DetailPop title="月度工作安排详情">
            <li v-for="item in record.monthlyWorkInfos" :key="item.id">{{ item?.info }} </li>
          </DetailPop>
        </template>
        <template v-if="column.key === 'description'">
          <DetailPop :data="record.description" title="学期说明">
            <p style="white-space: pre-line">{{ record.description }}</p>
          </DetailPop>
        </template>
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
              {
                icon: 'ant-design:vertical-align-bottom-outlined',
                onclick: handleExportCalendar.bind(null, record),
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
  import {
    getPageInfo,
    deleteItem,
    getExport,
    getExportSchoolCalendar,
  } from '@/api/semester/detail.js';
  import { columns, searchFormSchema } from './config';

  import { useDrawer } from '@/components/Drawer';
  import { useLoading } from '@/components/Loading';
  import DetailDrawer from './components/detailDrawer.vue';
  import DetailPop from './components/detailPop.vue';

  import { useMessage } from '@/hooks/web/useMessage';
  import { downloadByData } from '@/utils/file/download';
  import dayjs from 'dayjs';

  const { notification } = useMessage();
  const [openFullLoading, closeFullLoading] = useLoading({
    tip: '下载中...',
  });

  let UploadIds = [];

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
    rowSelection: {
      onSelect: onSelect,
      onSelectAll: onSelectAll,
    },
    actionColumn: {
      width: 120,
      title: '操作',
      dataIndex: 'action',
      fixed: 'right',
    },
    expandRowByClick: true,
  });
  function onSelect(record, selected) {
    if (selected) {
      UploadIds.push(record.id);
    } else {
      const idx = UploadIds.indexOf(record.id);
      if (idx > -1) {
        UploadIds.splice(idx, 1);
      }
    }
  }

  function onSelectAll(selected, selectedRows, changeRows) {
    const changeIds = changeRows.map((item) => item.id);
    if (selected) {
      UploadIds.push(...changeIds);
    } else {
      UploadIds.splice(0);
    }
  }
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
  // 导出校历
  async function handleExportCalendar(record) {
    openFullLoading();

    // data 为接口返回文件流数据，如果你的接口嵌套一层那就逐层去取
    const data = await getExportSchoolCalendar({ id: record.id });
    const currentTime = dayjs();
    const formattedTime = currentTime.format('YYYYMMDDHHmmss');

    downloadByData(data, `${record.title}校历信息_${formattedTime}.xlsx`);
    closeFullLoading();
  }
  // 导出列表数据
  async function getExportData() {
    openFullLoading();

    // data 为接口返回文件流数据，如果你的接口嵌套一层那就逐层去取
    const data = await getExport({ listIds: UploadIds });
    const currentTime = dayjs();
    const formattedTime = currentTime.format('YYYYMMDDHHmmss');

    downloadByData(data, `学期详情列表_${formattedTime}.xlsx`);
    closeFullLoading();
  }
</script>

<style lang="less" scoped>
  .export {
    margin-right: 3rem;
  }

  :deep(.ant-picker) {
    width: 100%;
  }

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
