<template>
  <BasicDrawer v-bind="$attrs" @register="registerDrawer" title="上传人才培养方案" width="500px">
    <BasicForm ref="formRef" @register="registerForm">
      <template #fileUpload="{ model }">
        <BasicUpload
          :maxSize="20"
          :maxNumber="20"
          @change="handleUpload"
          :api="uploadApi"
          :uploadParams="model"
          :value="fileList"
          :accept="['docx']"
        />
      </template>
    </BasicForm>
  </BasicDrawer>
</template>
<script setup>
  import { ref } from 'vue';
  import { BasicUpload } from '@/components/Upload';
  import { formSchema } from './config';
  import { BasicDrawer, useDrawerInner } from '@/components/Drawer';
  import { BasicForm, useForm } from '@/components/Form/index';
  import { uploadApi } from '@/api/talentCultivation';

  const emit = defineEmits(['success', 'register']);

  const fileList = ref();
  const [registerForm, { resetFields }] = useForm({
    labelWidth: 120,
    baseColProps: { span: 24 },
    schemas: formSchema,
    showActionButtonGroup: false,
  });
  const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async () => {
    resetFields();
    setDrawerProps({ confirmLoading: false });
  });

  // 导入
  function handleUpload(fileList) {
    console.log('fileList', fileList);
    setDrawerProps({ confirmLoading: true });
    closeDrawer();
    emit('success');
  }
</script>
