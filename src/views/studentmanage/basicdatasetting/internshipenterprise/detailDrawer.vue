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
        <template #schoolEnterpriseUpload>
          <Upload
            :maxCount="1"
            v-model:file-list="fileList"
            @change="schoolEnterprisehandleChange"
            @preview="schoolEnterprisepreviewFile"
            action="/basic-api/sysFile/uploadFile"
            :headers="headers"
          >
            <a-button type="primary" preIcon="carbon:cloud-upload"> 上传</a-button>
          </Upload>
        </template>
        <template #writtenReportUpload>
          <Upload
            :maxCount="1"
            v-model:file-list="writtenReportfileList"
            @change="writtenReporthandleChange"
            @preview="writtenReportpreviewFile"
            action="/basic-api/sysFile/uploadFile"
            :headers="headers"
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
  import { add, update, getDetailInfo } from '@/api/internshipenterprisesetting';
  import type { UploadProps } from 'ant-design-vue';
  import { fileToDataUrl } from '@/utils/file/preview';
  import { Upload } from 'ant-design-vue';
  import { getToken } from '@/utils/auth';

  const fileList = ref<UploadProps['fileList']>([]);
  const writtenReportfileList = ref<UploadProps['fileList']>([]);
  const emit = defineEmits(['success', 'register']);
  const isUpdate = ref(true);
  const wrapEl = ref();
  const token = getToken();
  const headers = {
    Authorization: 'Bearer ' + token, //页面token
  };

  const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
    labelWidth: 170,
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
      console.log(detail);
      closeWrapLoading();
      setFieldsValue({
        ...detail,
      });
    }
  });

  const getTitle = computed(() => (!unref(isUpdate) ? '新增企业' : '编辑企业'));

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

  // 校企导入
  const schoolEnterprisehandleChange = (info: any) => {
    const { fileList, file } = info;
    fileList.value = fileList;
    setFieldsValue({
      schoolEnterpriseAgreement: `${file?.response?.result?.filePath}/${file?.response?.result?.name}`,
    });
  };

  const schoolEnterprisepreviewFile = (file) => {
    const dataUrl = fileToDataUrl(file.originFileObj);
    window.open(dataUrl);
  };

  const writtenReporthandleChange = (info: any) => {
    const { fileList, file } = info;
    writtenReportfileList.value = fileList;
    setFieldsValue({
      writtenReport: `${file?.response?.result?.filePath}/${file?.response?.result?.name}`,
    });
  };

  const writtenReportpreviewFile = (file) => {
    const dataUrl = fileToDataUrl(file.originFileObj);
    window.open(dataUrl);
  };
</script>
