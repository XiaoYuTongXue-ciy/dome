<template>
  <BasicDrawer v-bind="$attrs" @register="registerDrawer" :title="getTitle" width="500px">
    <div ref="wrapEl">
      <BasicForm @register="registerForm">
        <template #fileId="{ model }">
          <BasicUpload
            :maxSize="20"
            :maxNumber="20"
            @change="handleUpload"
            :api="uploadApi"
            :uploadParams="model"
            :value="fileList"
            :accept="['docx']"
          /> </template
      ></BasicForm>
    </div>
  </BasicDrawer>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { BasicForm, useForm } from '@/components/Form/index';
  import { addFormSchema } from './config';
  import { BasicDrawer, useDrawerInner } from '@/components/Drawer';
  import { uploadApi } from '@/api/templatefile';
  import { BasicUpload } from '@/components/Upload';
  import type { UploadProps } from 'ant-design-vue';

  const fileList = ref<UploadProps['fileList']>([]);

  const emit = defineEmits(['success', 'register']);

  const wrapEl = ref();

  const [registerForm, { resetFields }] = useForm({
    labelWidth: 170,
    baseColProps: { span: 24 },
    schemas: addFormSchema,
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
