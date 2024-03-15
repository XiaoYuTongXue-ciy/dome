<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="getTitle"
    width="500px"
    @ok="handleSubmit"
    @close="handleClose"
  >
    <BasicForm ref="formRef" @register="registerForm">
      <template #add="{ field }">
        <a-button v-if="Number(field) === 0" @click="addItem">+增加</a-button>
      </template>
      <template #minus="{ field }">
        <!-- {{ model }} -->
        <Icon icon="clarity:minus-line" @click="() => del(field)" :size="28" />
      </template>
    </BasicForm>
  </BasicDrawer>
</template>
<script lang="tsx" setup>
  import { ref, computed, unref } from 'vue';
  import { formSchema } from './config';

  import Icon from '@/components/Icon/Icon.vue';
  import { BasicDrawer, useDrawerInner } from '@/components/Drawer';
  import { BasicForm, useForm } from '@/components/Form/index';
  import { getOwnRoleList, getOwnExtOrgList, add, update } from '@/api/sysUser';
  // import { getRoleList } from '@/api/role'; // 角色
  import { getListInfo as getOrgList } from '@/api/sysOrg'; // 机构
  import { getListInfo as getPosList } from '@/api/sysPos'; // 职位

  const emit = defineEmits(['success', 'register']);
  const isUpdate = ref(true);
  const n = ref(0);

  const getTitle = computed(() => (!unref(isUpdate) ? '新增用户信息' : '编辑用户信息'));
  const [
    registerForm,
    { appendSchemaByField, removeSchemaByField, resetFields, setFieldsValue, validate },
  ] = useForm({
    labelWidth: 100,
    baseColProps: { span: 24 },
    schemas: formSchema,
    showActionButtonGroup: false,
  });
  const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
    resetFields();
    setDrawerProps({ confirmLoading: false });
    isUpdate.value = !!data?.isUpdate;

    if (unref(isUpdate)) {
      // 获取用户角色集合
      const ownRoleList = await getOwnRoleList(data.record.id);
      // 获取用户额外机构集合
      const ownExtOrgList = await getOwnExtOrgList(data.record.id);
      let len = ownExtOrgList.length;

      const exgObj = {};
      if (len > 0) {
        ownExtOrgList.map((item, index) => {
          if (item.orgId && item.posId) {
            exgObj[`exgOrg_${index}`] = item.orgId;
            exgObj[`exgPos_${index}`] = item.posId;
            addItem();
          }
          return exgObj;
        });
      }

      setFieldsValue({
        ...data.record,
        roleIdList: ownRoleList,
        ...exgObj,
      });
    }
  });

  async function handleSubmit() {
    try {
      const values = await validate();

      if (values.extOrgIdList == undefined) values.extOrgIdList = [];
      for (let i = 0; i < n.value; i++) {
        if (values[`exgOrg_${i}`] && values[`exgPos_${i}`]) {
          values.extOrgIdList?.push({ orgId: values[`exgOrg_${i}`], posId: values[`exgPos_${i}`] });
        }
      }

      setDrawerProps({ confirmLoading: true });
      isUpdate.value ? await update(values) : await add(values);

      handleClose();
      closeDrawer();
      emit('success');
    } finally {
      setDrawerProps({ confirmLoading: false });
    }
  }

  function addItem() {
    appendSchemaByField(
      {
        field: `minus_${n.value}`,
        label: '',
        component: 'Input',
        slot: 'minus',
        colProps: { span: 2, offset: 2 },
      },
      '',
    );
    appendSchemaByField(
      {
        field: `exgOrg_${n.value}`,
        label: '部门',
        required: true,
        component: 'ApiTreeSelect',
        componentProps: {
          api: getOrgList,
          labelField: 'name',
          valueField: 'id',
        },
        colProps: { span: 20 },
      },
      '',
    );
    appendSchemaByField(
      {
        field: `exgPos_${n.value}`,
        label: '职位',
        required: true,
        component: 'ApiSelect',
        componentProps: {
          api: getPosList,
          resultField: 'items',
          labelField: 'name',
          valueField: 'id',
        },
        colProps: { span: 20, offset: 4 },
      },
      '',
    );
    n.value++;
  }

  function del(field) {
    let num = parseInt(field.slice(6));
    removeSchemaByField([`exgOrg_${num}`, `exgPos_${num}`, `minus_${num}`]);
    // n.value--;
  }

  function handleClose() {
    for (let i = 0; i < n.value; i++) {
      removeSchemaByField([`exgOrg_${i}`, `exgPos_${i}`, `minus_${i}`]);
    }
    n.value = 0;
  }
</script>
