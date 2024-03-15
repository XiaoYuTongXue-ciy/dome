import { BasicColumn, FormSchema } from '@/components/Table';
import { useDictStore } from '@/store/modules/dict.js';

const dictStore = useDictStore();

export const columns: BasicColumn[] = [
  {
    title: '奖学金名称',
    dataIndex: 'scholarshipName',
    width: 150,
  },
  {
    title: '总额',
    dataIndex: 'amount',
    width: 100,
  },
  {
    title: '奖学金等级',
    dataIndex: 'scholarshiplevelName',
    width: 100,
  },
  {
    title: '备注',
    dataIndex: 'remark',
    width: 100,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'scholarshipName',
    label: '奖学金名称',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    field: 'scholarshiplevelId',
    label: '奖学金等级',
    component: 'ApiSelect',
    colProps: { span: 6 },
    componentProps: {
      api: dictStore.getDictValueToCode,
      params: { Code: 'scholarship_level' },
      labelField: 'value',
      valueField: 'id',
    },
  },
  {
    field: 'amount',
    label: '奖学金金额',
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
    field: 'scholarshiplevelId',
    label: '奖学金等级',
    component: 'ApiSelect',
    required: true,
    colProps: { span: 15 },
    componentProps: {
      api: dictStore.getDictValueToCode,
      params: { Code: 'scholarship_level' },
      labelField: 'value',
      valueField: 'id',
    },
  },
  {
    field: 'scholarshipName',
    label: '奖学金名称',
    required: true,
    component: 'Input',
  },
  {
    field: 'amount',
    label: '总额',
    required: true,
    component: 'InputNumber',
  },
  {
    field: 'remark',
    label: '备注',
    component: 'Input',
    defaultValue: '无',
  },
];
