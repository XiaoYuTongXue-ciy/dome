<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="getTitle"
    width="500px"
    @ok="handleSubmit"
  >
    <BasicForm ref="formRef" @register="registerForm" />
  </BasicDrawer>
</template>
<script lang="ts" setup>
  import { ref, computed, unref } from 'vue';
  import { BasicForm, useForm } from '@/components/Form/index';
  import { formSchema } from './config';
  import { BasicDrawer, useDrawerInner } from '@/components/Drawer';
  import { add, update } from '@/api/course';

  const emit = defineEmits(['success', 'register']);
  const isUpdate = ref(true);
  const formRef = ref();

  const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
    labelWidth: 150,
    baseColProps: { span: 24 },
    schemas: formSchema,
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
    console.log('record', data.record);
    if (unref(isUpdate)) {
      console.log(data);
      setFieldsValue({
        ...data.record,
      });
    }
  });

  const getTitle = computed(() => (!unref(isUpdate) ? '新增课程' : '编辑课程'));

  async function handleSubmit() {
    try {
      const values = await validate();
      console.log('values', values);

      setDrawerProps({ confirmLoading: true });

      isUpdate.value ? await update(values) : await add(values);
      closeDrawer();
      emit('success');
    } finally {
      setDrawerProps({ confirmLoading: false });
    }
  }
</script>
