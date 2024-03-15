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
      <BasicForm @register="registerForm" />
    </div>
  </BasicDrawer>
</template>
<script setup>
  import { ref, computed, unref } from 'vue';
  import { BasicForm, useForm } from '@/components/Form/index';
  import { formSchema } from './config';
  import { BasicDrawer, useDrawerInner } from '@/components/Drawer';
  import { useLoading } from '@/components/Loading';

  import { add, update, getDetailInfo } from '@/api/teachingmaterial';

  const emit = defineEmits(['success', 'register']);
  const isUpdate = ref(true);
  const wrapEl = ref();

  const getTitle = computed(() => (!unref(isUpdate) ? '新增教材信息' : '编辑教材信息'));

  const [openWrapLoading, closeWrapLoading] = useLoading({
    target: wrapEl,
    props: {
      tip: '加载中...',
      absolute: true,
    },
  });

  const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
    labelWidth: 90,
    baseColProps: { span: 24 },
    schemas: formSchema,
    showActionButtonGroup: false,
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

  async function handleSubmit() {
    try {
      const values = await validate();
      setDrawerProps({ confirmLoading: true });
      isUpdate.value ? await update(values) : await add(values);
      closeDrawer();
      emit('success');
    } finally {
      setDrawerProps({ confirmLoading: false });
    }
  }
</script>
