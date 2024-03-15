<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    showFooter
    title="审批"
    width="400"
    useWrapper
    :showCancelBtn="false"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script setup>
  import { BasicForm, useForm } from '@/components/Form/index';
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { examineColumns } from './config';
  import { examineGrade } from './api';
  import { ref } from 'vue';

  const ids = ref([]);
  const emit = defineEmits(['success']);

  const [registerForm, { validate }] = useForm({
    labelWidth: 90,
    baseColProps: { span: 24 },
    schemas: examineColumns,
    showActionButtonGroup: false,
  });

  const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    ids.value = data.ids;
  });

  async function handleSubmit() {
    try {
      const values = await validate();
      console.log('222', values.auditStatus);

      setModalProps({ confirmLoading: true });
      let params = {
        ids: ids.value,
        auditStatus: values.auditStatus,
      };
      await examineGrade(params);

      closeModal();
      emit('success');
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>
