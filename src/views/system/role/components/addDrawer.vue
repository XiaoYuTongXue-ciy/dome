<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="getTitle"
    width="500px"
    @ok="handleSubmit"
  >
    <BasicForm ref="formRef" @register="registerForm">
      <template #menuList="{ model, field }">
        <BasicTree
          v-model:value="model[field]"
          :treeData="treeData"
          :fieldNames="{ title: 'title', key: 'id' }"
          checkable
        />
      </template>
    </BasicForm>
  </BasicDrawer>
</template>
<script setup>
  import { ref, computed, unref } from 'vue';
  import { formSchema } from '../config';
  import { BasicDrawer, useDrawerInner } from '@/components/Drawer';
  import { BasicForm, useForm } from '@/components/Form/index';
  import { BasicTree } from '@/components/Tree';
  import { add, update, getOwnMenuList } from '@/api/role';
  import { getMenuList } from '@/api/sysAuth/menu';

  const emit = defineEmits(['success', 'register']);
  const isUpdate = ref(true);
  const treeData = ref([]);

  const getTitle = computed(() => (!unref(isUpdate) ? '新增角色信息' : '编辑角色信息'));

  const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
    labelWidth: 120,
    baseColProps: { span: 24 },
    schemas: formSchema,
    showActionButtonGroup: false,
  });
  const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
    resetFields();
    setDrawerProps({ confirmLoading: false });
    // 需要在setFieldsValue之前先填充treeData，否则Tree组件可能会报key not exist警告
    if (unref(treeData).length === 0) {
      treeData.value = await getMenuList();
    }
    isUpdate.value = !!data?.isUpdate;

    if (unref(isUpdate)) {
      // 获取当前角色的用户权限

      const menuList = await getOwnMenuList({ id: data.record.id });
      await setFieldsValue({
        ...data.record,
        menuIdList: menuList,
      });
    }
  });

  async function handleSubmit() {
    try {
      const values = await validate();
      setDrawerProps({ confirmLoading: true });
      console.log(values);
      isUpdate.value ? await update(values) : await add(values);

      closeDrawer();
      emit('success');
    } finally {
      setDrawerProps({ confirmLoading: false });
    }
  }
</script>
@/api/role/role.js
