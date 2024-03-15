<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    title="新增查寝记录"
    width="500px"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm" />
  </BasicDrawer>
</template>
<script setup>
  // import { ref, computed, unref } from 'vue';
  import { BasicForm, useForm } from '@/components/Form/index';
  import { formSchema } from '../config';
  import { BasicDrawer, useDrawerInner } from '@/components/Drawer';
  import { addDormitoryInspection } from '@/api/dormitory';

  const emit = defineEmits(['success', 'register']);
  // const isUpdate = ref(true);

  const [registerForm, { resetFields, validate }] = useForm({
    labelWidth: 100,
    baseColProps: { span: 24 },
    schemas: formSchema,
    showActionButtonGroup: false,
  });

  const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async () => {
    resetFields();
    setDrawerProps({ confirmLoading: false });
    // isUpdate.value = !!data?.isUpdate;

    // if (unref(isUpdate)) {
    //   setFieldsValue({
    //     ...data.record,
    //   });
    // }
  });

  async function handleSubmit() {
    try {
      const values = await validate();

      setDrawerProps({ confirmLoading: true });

      await addDormitoryInspection(values);
      closeDrawer();
      emit('success');
    } finally {
      setDrawerProps({ confirmLoading: false });
    }
  }
</script>
@/api/dormitoryinspection
