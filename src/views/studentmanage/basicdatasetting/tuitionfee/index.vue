<template>
  <div>
    <BasicTable @register="registerTable">
      <template #form-major="{ model, field }">
        <ApiSelect
          :api="getMajorPageInfo"
          showSearch
          v-model:value="model[field]"
          placeholder="请选择"
          resultField="items"
          labelField="majorName"
          valueField="id"
          optionFilterProp="label"
          @select="onMajorSelect($event, model, field)"
        />
      </template>
      <template #form-class="{ model, field }">
        <ApiSelect
          :api="getClassPageInfo"
          showSearch
          v-model:value="model[field]"
          placeholder="请选择"
          optionFilterProp="label"
          resultField="items"
          labelField="className"
          valueField="id"
          :params="searchClassParams"
        />
      </template>
      <template #toolbar>
        <a-button type="primary" @click="handleCreate"> 新增费用 </a-button>
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
  import { getPageInfo, deleteItem } from './api';
  import { ApiSelect } from '@/components/Form';
  import { useDrawer } from '@/components/Drawer';
  import DetailDrawer from './detailDrawer.vue';
  import { getPageInfo as getMajorPageInfo } from '@/api/major'; // 专业
  import { getPageInfo as getClassPageInfo } from '@/api/classes'; // 班级

  import { columns, searchFormSchema } from './config';
  import { useMessage } from '@/hooks/web/useMessage';

  import { ref, computed } from 'vue';

  const { notification } = useMessage();

  const [registerDrawer, { openDrawer }] = useDrawer();
  const [registerTable, { reload }] = useTable({
    title: '',
    api: getPageInfo,
    columns,
    formConfig: {
      labelWidth: 120,
      schemas: searchFormSchema,
      showAdvancedButton: true,
      actionColOptions: {
        span: 24,
      },
      autoSubmitOnEnter: true,
    },
    useSearchForm: true,
    showTableSetting: true,
    bordered: true,
    showIndexColumn: true,
    actionColumn: {
      width: 100,
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

  const currentMajorId = ref(0);

  function onMajorSelect(item, model) {
    if (model.classId) {
      model.classId = '';
    }

    currentMajorId.value = item;
  }

  const page = { page: 0, pageSize: 1000 };

  // 班级
  const searchClassParams = computed(() => {
    return {
      ...page,
      majorId: currentMajorId.value || 0,
    };
  });
</script>
