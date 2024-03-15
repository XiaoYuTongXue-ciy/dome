import { BasicColumn, FormSchema } from '@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '费用名称',
    dataIndex: 'expenseName',
    width: 150,
  },
  {
    title: '金额',
    dataIndex: 'amount',
    width: 100,
  },
  {
    title: '专业',
    dataIndex: 'majorName',
    width: 100,
  },
  {
    title: '班级',
    dataIndex: 'className',
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
    field: 'expenseName',
    label: '费用名称',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    field: 'amount',
    label: '金额',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    field: 'majorId',
    label: '专业',
    component: 'ApiSelect',
    colProps: { span: 6 },

    slot: 'major',
  },
  {
    field: 'classId',
    label: '班级',
    component: 'ApiSelect',
    colProps: { span: 6 },
    slot: 'class',
  },
];

export const addFormSchema: FormSchema[] = [
  {
    field: 'id',
    show: false,
    slot: '',
  },
  {
    field: 'expenseName',
    label: '费用名称',
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
    field: 'majorId',
    label: '专业',
    component: 'ApiSelect',
    slot: 'major',
  },
  {
    field: 'classId',
    label: '班级',
    component: 'ApiSelect',
    slot: 'class',
  },

  {
    field: 'remark',
    label: '备注',
    component: 'InputTextArea',
  },
];
