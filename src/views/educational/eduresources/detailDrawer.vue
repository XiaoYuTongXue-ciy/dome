<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="getTitle"
    width="500px"
    @ok="handleSubmit"
  >
    <div ref="wrapEl">
      <BasicForm @register="registerForm">
        <template #upload>
          <Upload
            :maxCount="1"
            :before-upload="beforeUpload"
            v-model:file-list="fileList"
            @change="handleChange"
            @preview="previewFile"
          >
            <a-button type="primary" preIcon="carbon:cloud-upload"> 上传</a-button>
          </Upload>
        </template>
      </BasicForm>
    </div>
  </BasicDrawer>
</template>
<script lang="ts" setup>
  import { ref, computed, unref } from 'vue';
  import { BasicForm, useForm } from '@/components/Form/index';
  import { addFormSchema } from './config';
  import { BasicDrawer, useDrawerInner } from '@/components/Drawer';
  import { useLoading } from '@/components/Loading';
  import { add, update, getDetailInfo } from './api';
  import { Upload } from 'ant-design-vue';
  import type { UploadProps } from 'ant-design-vue';
  import { fileToDataUrl } from '@/utils/file/preview';

  const emit = defineEmits(['success', 'register']);
  const fileList = ref<UploadProps['fileList']>([]);

  const isUpdate = ref(true);
  const wrapEl = ref();

  const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
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
      const detail = await getDetailInfo({ id: data.record?.id }).catch(() => closeWrapLoading());
      closeWrapLoading();
      setFieldsValue({
        ...detail,
      });
    }
  });

  const getTitle = computed(() => (!unref(isUpdate) ? '新增教案' : '编辑教案'));

  async function handleSubmit() {
    try {
      const values = await validate();

      setDrawerProps({ confirmLoading: true });
      let params = { file: fileList?.value?.[0]?.originFileObj, data: { ...values } };

      // TODO custom api
      isUpdate.value ? await update(params) : await add(params);
      closeDrawer();
      fileList.value = [];
      emit('success');
    } finally {
      setDrawerProps({ confirmLoading: false });
    }
  }

  const beforeUpload = () => false;

  const handleChange = (info: any) => {
    const { fileList } = info;
    fileList.value = fileList;
  };

  const previewFile = (file) => {
    const dataUrl = fileToDataUrl(file.originFileObj);
    window.open(dataUrl);
  };
</script>
