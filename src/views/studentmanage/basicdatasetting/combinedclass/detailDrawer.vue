<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="getTitle"
    width="500px"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm">
      <template #classOption="{ model, field }">
        <BasicTree
          :treeData="treeData"
          v-model:value="model[field]"
          :fieldNames="{ key: 'id', title: 'name' }"
          checkable
          clickRowToExpand
          @check="handleCheck"
        />
      </template>
    </BasicForm>
  </BasicDrawer>
</template>
<script lang="ts" setup>
  import { ref, computed, unref } from 'vue';
  import { BasicForm, useForm } from '@/components/Form/index';
  import { BasicTree, TreeItem } from '@/components/Tree';

  import { addFormSchema } from './config';
  import { BasicDrawer, useDrawerInner } from '@/components/Drawer';

  import { getClassByMajorList } from '@/api/classes'; // 班级
  import { update, add } from '@/api/studentManage/baseSetting/combinedClass';

  const emit = defineEmits(['success', 'register']);
  const isUpdate = ref(true);
  const treeData = ref<TreeItem[]>([]);

  const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
    labelWidth: 100,
    baseColProps: { span: 24 },
    schemas: addFormSchema,
    showActionButtonGroup: false,
  });

  const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
    resetFields();
    setDrawerProps({ confirmLoading: false });
    isUpdate.value = !!data?.isUpdate;
    await fetch();

    if (unref(isUpdate)) {
      const resultArr = data.record.classOutput.map((item) => item.id);
      setFieldsValue({
        ...data.record,
        classIds: resultArr,
      });
    }
  });

  const getTitle = computed(() => (!unref(isUpdate) ? '新增学生信息' : '编辑学生信息'));

  async function handleSubmit() {
    try {
      const values = await validate();
      setDrawerProps({ confirmLoading: true });

      isUpdate.value ? await update(values) : await add(values);

      closeDrawer();
      emit('success');
    } catch (err) {
      console.log(err);
    } finally {
      setDrawerProps({ confirmLoading: false });
    }
  }

  // 点击时
  function handleCheck(checkedKeys, e) {
    console.log(checkedKeys, e);
  }

  async function fetch() {
    treeData.value = (await getClassByMajorList()) as unknown as TreeItem[];
    // treeData.value = treeData.value.map((item) => ({ ...item, checkable: true }));
  }
</script>
