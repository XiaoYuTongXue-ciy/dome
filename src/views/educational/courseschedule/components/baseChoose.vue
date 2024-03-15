<template>
  <div class="m-2 py-2 pt-4 bg-white flex">
    <BasicForm ref="formRef" @register="registerForm" style="flex: 1">
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
        />
      </template>
    </BasicForm>

    <a-button type="primary" class="ml-10 mr-2" @click="onSubmit">确认</a-button>
  </div>
</template>

<script setup lang="ts">
  import { BasicForm, useForm, ApiSelect } from '@/components/Form';
  import { totalFormSchema, classroomSchema } from './config';

  import { getPageInfo as getSemesterInfo } from '@/api/dictionary'; // 学期

  const emit = defineEmits(['select']);
  const props = defineProps({
    optionType: {
      type: String,
      default: '',
    },
  });

  const [registerForm, { validate }] = useForm({
    labelWidth: 90,
    baseColProps: { span: 20 },
    schemas: props.optionType === 'classroom' ? classroomSchema : totalFormSchema,
    showActionButtonGroup: false,
  });

  async function onSubmit() {
    try {
      const values = await validate();
      const params = Object.assign({ type: props.optionType }, values);

      emit('select', params);
    } catch (err) {
      console.log(err);
    }
  }
</script>

<style scoped></style>
