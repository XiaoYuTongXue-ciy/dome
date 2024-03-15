<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    showFooter
    title="授权数据范围"
    width="600px"
    :minHeight="60"
    useWrapper
    :showCancelBtn="false"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script setup>
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { BasicForm, useForm } from '@/components/Form/index';
  import { dataScopeSchema } from '../config';
  import { grantDataScope } from '@/api/role';
  import { useMessage } from '@/hooks/web/useMessage';

  const emit = defineEmits(['success', 'register']);
  const { createMessage: msg } = useMessage();
  const [registerForm, { setFieldsValue, validate }] = useForm({
    labelWidth: 120,
    baseColProps: { span: 24 },
    schemas: dataScopeSchema,
    showActionButtonGroup: false,
  });

  const [registerModal, { closeModal }] = useModalInner(async (data) => {
    setFieldsValue({
      id: data.id,
      dataScope: data.dataScope,
    });
  });

  async function handleSubmit() {
    try {
      const values = await validate();
      await grantDataScope(values);

      closeModal();
      emit('success');
    } catch {
      msg.error({ content: '保存失败', key: 'saving' });
      closeModal();
    }
  }
</script>
@/api/role/role.js
