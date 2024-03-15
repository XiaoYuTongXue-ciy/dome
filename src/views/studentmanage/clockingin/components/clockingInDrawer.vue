<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="getTitle"
    width="500px"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm">
      <template #localSearch="{ model, field }">
        <ApiSelect
          :api="getUserList"
          showSearch
          v-model:value="model[field]"
          optionFilterProp="label"
          resultField="items"
          labelField="realName"
          valueField="id"
        /> </template
    ></BasicForm>
  </BasicDrawer>
</template>
<script lang="ts" setup>
  import { ref, computed, unref } from 'vue';
  import { BasicForm, useForm, ApiSelect } from '@/components/Form/index';

  import { formSchema } from '../config';
  import { BasicDrawer, useDrawerInner } from '@/components/Drawer';

  import { getPageInfo as getUserList } from '@/api/sysUser/index.js';
  import { update, add } from '@/api/clockingIn/index.js';

  const emit = defineEmits(['success', 'register', 'error']);
  const isUpdate = ref(true);

  const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
    labelWidth: 90,
    baseColProps: { span: 24 },
    schemas: formSchema,
    showActionButtonGroup: false,
  });

  const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
    resetFields();
    setDrawerProps({ confirmLoading: false });
    // 需要在setFieldsValue之前先填充treeData，否则Tree组件可能会报key not exist警告

    isUpdate.value = !!data?.isUpdate;

    if (unref(isUpdate)) {
      setFieldsValue({
        ...data.record,
      });
    }
  });

  const getTitle = computed(() => (!unref(isUpdate) ? '新增角色' : '编辑角色'));

  async function handleSubmit() {
    try {
      const values = await validate();
      setDrawerProps({ confirmLoading: true });
      // TODO custom api
      try {
        isUpdate.value ? await update(values) : await add(values);
      } catch (error) {
        emit('error', error);
        return false;
      }
      closeDrawer();
      emit('success');
    } finally {
      setDrawerProps({ confirmLoading: false });
    }
  }
</script>
