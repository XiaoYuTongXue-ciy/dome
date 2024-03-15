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
<script setup lang="ts">
  import { ref, computed, unref } from 'vue';
  import { BasicForm, useForm } from '@/components/Form/index';
  import { addFormSchema } from './config';
  import { useLoading } from '@/components/Loading';
  import { BasicDrawer, useDrawerInner } from '@/components/Drawer';
  import { add, update, getDetailInfo } from '@/api/codeofconduct';

  const emit = defineEmits(['success', 'register']);
  const isUpdate = ref(true);
  const wrapEl = ref();

  const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
    labelWidth: 90,
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
    // 需要在setFieldsValue之前先填充treeData，否则Tree组件可能会报key not exist警告
    // if (unref(treeData).length === 0) {
    //   // treeData.value = (await getMenuList()) as any as TreeItem[];
    // }
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

  const getTitle = computed(() => (!unref(isUpdate) ? '新增行为' : '修改行为'));

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
</script>
