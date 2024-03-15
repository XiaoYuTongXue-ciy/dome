<template>
  <Card class="m-2 p-2 overflow-hidden bg-white" title="学期详情">
    <BasicForm ref="formRef" @register="registerForm">
      <template #semSearch="{ model, field }">
        <ApiSelect
          :api="getSemesterInfo"
          showSearch
          v-model:value="model[field]"
          placeholder="请选择"
          optionFilterProp="label"
          resultField="items"
          labelField="value"
          valueField="id"
          :params="{ dictTypeCode: 'semester', pageSize: 5000 }"
        /> </template
    ></BasicForm>
    <a-button @click="submit" type="primary" style="float: right">开始设置</a-button>
  </Card>
</template>
<script lang="ts" setup>
  import { formSchema } from './config';
  import { Card } from 'ant-design-vue';
  import { BasicForm, useForm, ApiSelect } from '@/components/Form';
  import { getPageInfo as getSemesterInfo } from '@/api/dictionary'; // 学期

  defineOptions({ name: 'BaseForm' });
  const [registerForm, { validate }] = useForm({
    labelWidth: 60,
    baseColProps: { span: 24 },
    schemas: formSchema,
    showActionButtonGroup: false,
  });

  const emit = defineEmits(['select']);

  async function submit() {
    try {
      const values = await validate();
      emit('select', values);
    } catch (err) {
      console.log(err);
    }
  }
</script>

<style lang="scss" scoped>
  .label {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 6px 8px;

    .txt {
      width: 92px;
      padding-left: 7px;
      font-size: 16px;
      font-weight: 500;
      line-height: 24px;
    }
  }

  ::v-deep(.ant-card-body) {
    padding: 8px;
  }
</style>
