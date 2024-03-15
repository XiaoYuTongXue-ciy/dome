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
        <template #major="{ model, field }">
          <ApiSelect
            :api="getMajorPageInfo"
            showSearch
            v-model:value="model[field]"
            placeholder="请选择"
            resultField="items"
            labelField="majorName"
            valueField="id"
            :params="page"
            optionFilterProp="label"
            @select="onMajorSelect($event, model)"
          />
        </template>
        <template #class="{ model, field }">
          <ApiSelect
            :api="getClassPageInfo"
            showSearch
            v-model:value="model[field]"
            placeholder="请选择"
            optionFilterProp="label"
            resultField="items"
            labelField="className"
            valueField="id"
            :params="searchClassParams"
          /> </template
      ></BasicForm>
    </div>
  </BasicDrawer>
</template>
<script setup>
  import { ref, computed, unref } from 'vue';
  import { BasicForm, useForm } from '@/components/Form/index';
  import { addFormSchema } from './config';
  import { BasicDrawer, useDrawerInner } from '@/components/Drawer';
  import { add, update, getDetailInfo } from './api';
  import { getPageInfo as getMajorPageInfo } from '@/api/major'; // 专业
  import { getPageInfo as getClassPageInfo } from '@/api/classes'; // 班级
  import { ApiSelect } from '@/components/Form';

  const emit = defineEmits(['success', 'register']);
  const isUpdate = ref(true);
  const wrapEl = ref();

  const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
    labelWidth: 90,
    baseColProps: { span: 24 },
    schemas: addFormSchema,
    showActionButtonGroup: false,
  });

  const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
    resetFields();
    setDrawerProps({ confirmLoading: false });
    isUpdate.value = !!data?.isUpdate;

    if (unref(isUpdate)) {
      const detail = await getDetailInfo({ id: data.record?.id });
      setFieldsValue({
        ...detail,
      });
    }
  });

  const getTitle = computed(() => (!unref(isUpdate) ? '新增费用' : '编辑费用'));

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

  const currentMajorId = ref(0);

  function onMajorSelect(item, model) {
    setFieldsValue({
      classId: '',
    });
    console.log(item, model);
    currentMajorId.value = item;
  }

  const page = { page: 0, pageSize: 1000 };

  // 班级

  const searchClassParams = computed(() => {
    return {
      ...page,
      majorId: currentMajorId.value || 0,
    };
  });
</script>
