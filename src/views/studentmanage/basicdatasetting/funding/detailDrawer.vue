<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="getTitle"
    width="500px"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm" />
  </BasicDrawer>
</template>
<script setup lang="ts">
  import { ref, computed, unref } from 'vue';
  import { BasicForm, useForm } from '@/components/Form/index';
  import { addFormSchema } from './config';
  import { BasicDrawer, useDrawerInner } from '@/components/Drawer';
  import { add, update } from './api';

  const emit = defineEmits(['success', 'register']);
  const isUpdate = ref(true);

  const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
    labelWidth: 90,
    baseColProps: { span: 24 },
    schemas: addFormSchema,
    showActionButtonGroup: false,
  });

  const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
    resetFields();
    setDrawerProps({ confirmLoading: false });
    // 需要在setFieldsValue之前先填充treeData，否则Tree组件可能会报key not exist警告
    // if (unref(treeData).length === 0) {
    //   // treeData.value = (await getMenuList()) as any as TreeItem[];
    // }
    isUpdate.value = !!data?.isUpdate;

    if (unref(isUpdate)) {
      console.log('data', data.record);
      setFieldsValue({
        ...data.record,
      });
    }
  });

  const getTitle = computed(() => (!unref(isUpdate) ? '新增学生资助' : '编辑学生资助'));

  async function handleSubmit() {
    try {
      const values = await validate();

      setDrawerProps({ confirmLoading: true });

      // TODO custom api
      isUpdate.value ? await update(values) : await add(values);
      closeDrawer();
      emit('success');
    } finally {
      setDrawerProps({ confirmLoading: false });
    }
  }
</script>
