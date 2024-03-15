import { BasicColumn, FormSchema } from '@/components/Table';
import { useDictStore } from '@/store/modules/dict.js';

const dictStore = useDictStore();

export const columns: BasicColumn[] = [
  {
    title: '行为类型',
    dataIndex: 'behaviorTypeName',
    width: 200,
  },
  {
    title: '行为名称',
    dataIndex: 'behaviorName',
    width: 180,
  },
  {
    title: '行为内容',
    dataIndex: 'behaviorContent',
    width: 300,
  },
  {
    title: '备注',
    dataIndex: 'remark',
    width: 100,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'behaviorTypeId',
    label: '选择行为类型',
    component: 'ApiSelect',
    colProps: { span: 8 },
    componentProps: {
      api: dictStore.getDictValueToCode,
      params: { Code: 'code_of_conduct_type' },
      labelField: 'value',
      valueField: 'id',
    },
  },
  {
    field: 'behaviorName',
    label: '行为名称',
    component: 'Input',
    colProps: { span: 6 },
  },
];

export const addFormSchema: FormSchema[] = [
  {
    field: 'id',
    show: false,
    slot: '',
  },
  {
    field: 'behaviorTypeId',
    label: '行为类型',
    component: 'ApiSelect',
    colProps: { span: 15 },
    rules: [{ required: true }],
    componentProps: {
      api: dictStore.getDictValueToCode,
      params: { Code: 'code_of_conduct_type' },
      labelField: 'value',
      valueField: 'id',
    },
  },
  {
    field: 'behaviorName',
    label: '行为名称',
    rules: [{ required: true }],
    component: 'Input',
  },
  {
    field: 'behaviorContent',
    label: '行为内容',
    rules: [{ required: true }],
    component: 'Input',
  },
  {
    field: 'remark',
    label: '备注',
    component: 'Input',
    defaultValue: '无',
  },
];
