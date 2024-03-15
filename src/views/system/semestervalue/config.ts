/* eslint-disable @typescript-eslint/no-unused-vars */
import { BasicColumn, FormSchema } from '@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '学期',
    dataIndex: 'value',
    width: 150,
  },
];

export const addFormSchema: FormSchema[] = [
  {
    field: 'id',
    show: false,
    slot: '',
  },
  {
    field: 'value',
    label: '学期',
    component: 'Input',
    required: true,
  },
];
