<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    title="分班设置"
    @visible-change="handleVisibleChange"
    @ok="handleSubmit"
  >
    <div class="pt-3px pr-3px">
      <BasicForm @register="registerForm" :model="modelRef" />
    </div>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, nextTick } from 'vue';
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { BasicForm, useForm } from '@/components/Form';
  import { schemas } from '../config';
  import { dividedClasses } from '@/api/dividedClasses';

  const props = defineProps({
    userData: { type: Object },
  });
  const modelRef = ref({});
  const [registerForm, { resetFields, validate }] = useForm({
    labelWidth: 120,
    baseColProps: { span: 24 },
    schemas: schemas,
    showActionButtonGroup: false,
  });

  const [register, { closeModal }] = useModalInner((data) => {
    resetFields();
    data && onDataReceive(data);
  });

  function onDataReceive(data) {
    modelRef.value = {
      schoolId: data.data,
      gradeId: data.info,
      majorId: data.info,
      isSequences: data.info,
    };
  }

  async function handleSubmit() {
    try {
      const values = await validate();
      await dividedClasses(values);
      closeModal();
    } finally {
      console.log(22222);
    }
    resetFields();
  }

  function handleVisibleChange(v) {
    console.log(v);
    v && props.userData && nextTick(() => onDataReceive(props.userData));
  }
</script>
