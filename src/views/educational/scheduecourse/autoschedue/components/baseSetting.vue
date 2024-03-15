<template>
  <Card class="m-2 p-2 bg-white relative" title="设置基本排课选项">
    <BasicForm ref="formRef" @register="registerForm" />
    <SpecialRules :params="baseParams" />
    <div class="btn-box">
      <Popconfirm title="确认清空所有固排安排？" @confirm="handleDelete">
        <a-button type="default" class="mx-2">清空所有固排</a-button>
      </Popconfirm>
      <Popconfirm title="确认清空所有固排安排？" @confirm="handleClear">
        <a-button type="default" class="mx-2">清空所有课表</a-button>
      </Popconfirm>
      <a-button type="primary" @click="handleSubmit" :loading="loading" class="mx-2"
        >开始排课</a-button
      >
    </div>
  </Card>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { Card, Popconfirm } from 'ant-design-vue';
  import { formSchema } from './config';
  import SpecialRules from './specialRules/index.vue';
  import { BasicForm, useForm } from '@/components/Form/index';
  import { useMessage } from '@/hooks/web/useMessage';
  import { autoSchedue, batchDelete } from '@/api/educational/schedueCourse/schedulingCourse.js';
  import { deleteItem } from '@/api/educational/schedueCourse/scheduleRules.js';

  const { notification } = useMessage();

  const props = defineProps({
    baseParams: {
      type: Object,
      default: () => {},
    },
  });

  const loading = ref<boolean>(false);
  const [registerForm, { validate }] = useForm({
    labelWidth: 100,
    baseColProps: { span: 24 },
    schemas: formSchema,
    showActionButtonGroup: false,
  });

  // 开始自动排课
  async function handleSubmit() {
    try {
      loading.value = true;
      const values = await validate();
      const baseParams = props.baseParams;

      if (baseParams.classIds?.length > 0 && baseParams.classRoomIds?.length > 0) {
        const params = Object.assign(props.baseParams, values);
        await autoSchedue(params);
        loading.value = false;
        handleSuccess();
      } else {
        notification.error({
          message: '请先选择班级和教室！',
          duration: 3,
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      loading.value = false;
    }
  }

  // 清除所有固排安排
  async function handleDelete() {
    await deleteItem({ semesterDetailId: props.baseParams.semesterDetailId });
    handleSuccess();
  }
  // 清除所有课表
  async function handleClear() {
    await batchDelete({ semesterDetailId: props.baseParams.semesterDetailId });
    handleSuccess();
  }

  function handleSuccess() {
    notification.success({
      message: '操作成功！',
      duration: 2,
    });
  }
</script>

<style scoped lang="less">
  ::v-deep(.ant-card-body) {
    padding: 8px;
  }

  .btn-box {
    display: flex;
    justify-content: flex-end;
    padding-top: 10px;
  }

  ::v-deep(.ant-form-item) {
    margin-bottom: 10px;
  }
</style>
