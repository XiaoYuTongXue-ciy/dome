<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="getTitle"
    width="50%"
    @ok="handleSubmit"
    @close="handleClose"
  >
    <BasicForm @register="registerForm">
      <template #add>
        <a-button @click="addItem">+</a-button>
      </template>

      <template #minus>
        <a-button @click="delItem">-</a-button>
      </template>
    </BasicForm>
  </BasicDrawer>
</template>
<script lang="ts" setup>
  import { ref, computed, unref } from 'vue';
  import { BasicForm, useForm } from '@/components/Form/index';
  import { addFormSchema } from './config';
  import { BasicDrawer, useDrawerInner } from '@/components/Drawer';
  import { useLoading } from '@/components/Loading';
  import { add, update } from './api';

  import { getPageInfo as getStuPageInfo } from '@/api/stuInfo';

  const emit = defineEmits(['success', 'register']);

  const isUpdate = ref(true);
  const wrapEl = ref();

  const [
    registerForm,
    { appendSchemaByField, removeSchemaByField, resetFields, setFieldsValue, validate },
  ] = useForm({
    labelWidth: 120,
    baseColProps: { span: 24 },
    schemas: addFormSchema,
    showActionButtonGroup: false,
  });

  const [openWrapLoading, closeWrapLoading] = useLoading({
    target: wrapEl,
    props: {
      tip: '加载中...',
      absolute: true,
    },
  });

  const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
    resetFields();
    setDrawerProps({ confirmLoading: false });
    isUpdate.value = !!data?.isUpdate;
    if (unref(isUpdate)) {
      openWrapLoading();
      closeWrapLoading();
      setFieldsValue({
        ...data.record,
      });
    }
  });

  const getTitle = computed(() => (!unref(isUpdate) ? '新增日志' : '编辑日志'));

  async function handleSubmit() {
    try {
      const values = await validate();

      if (values.absenceInfos == undefined) values.absenceInfos = [];
      for (let i = 0; i < n.value; i++) {
        if (values[`studentID_${i}`] && values[`reason_${i}`]) {
          values.absenceInfos?.push({
            studentID: values[`studentID_${i}`],
            reason: values[`reason_${i}`],
          });
        }
      }

      setDrawerProps({ confirmLoading: true });
      handleClose();

      // TODO custom api
      isUpdate.value ? await update({ ...values }) : await add({ ...values });
      closeDrawer();
      emit('success');
    } finally {
      setDrawerProps({ confirmLoading: false });
    }
  }

  const n = ref(1);

  function addItem() {
    appendSchemaByField(
      {
        field: `studentID_${n.value}`,
        component: 'ApiSelect',
        label: '学生',
        colProps: { span: 10 },
        componentProps: {
          api: getStuPageInfo,
          showSearch: true,
          optionFilterProp: 'label',
          params: { page: 0, pageSize: 10000 },
          resultField: 'items',
          labelField: 'name',
          valueField: 'id',
        },
      },
      '',
    );
    appendSchemaByField(
      {
        field: `reason_${n.value}`,
        component: 'Input',
        labelWidth: 90,
        colProps: { span: 10 },
        label: '缺勤原因',
      },
      '',
    );

    appendSchemaByField(
      {
        field: `minus_${n.value}`,
        label: ' ',
        labelWidth: 20,
        component: 'Input',
        slot: 'minus',
        colProps: { span: 3 },
      },
      '',
    );
    n.value++;
  }

  function delItem() {
    removeSchemaByField([`reason_${n.value}`, `studentID_${n.value}`, `minus_${n.value}`]);
    n.value--;
  }

  function handleClose() {
    for (let i = 0; i < n.value; i++) {
      removeSchemaByField([`reason_${n.value}`, `studentID_${n.value}`, `minus_${n.value}`]);
    }
    n.value = 0;
  }
</script>
