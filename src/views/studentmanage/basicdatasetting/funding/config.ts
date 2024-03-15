import { BasicColumn, FormSchema } from '@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '资助项目',
    dataIndex: 'fundingName',
    width: 200,
  },
  {
    title: '资助金额',
    dataIndex: 'amount',
    width: 100,
  },
  {
    title: '备注',
    dataIndex: 'remark',
    width: 150,
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    width: 100,
  },
  {
    title: '更新时间',
    dataIndex: 'updateTime',
    width: 100,
  },
];
// 查询
export const searchFormSchema: FormSchema[] = [
  {
    field: 'fundingName',
    label: '资助项目',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    field: 'amount',
    label: '资金金额',
    component: 'Input',
    colProps: { span: 6 },
  },
];

// 新增
export const addFormSchema: FormSchema[] = [
  {
    field: 'id',
    show: false,
    slot: '',
  },
  {
    field: 'fundingName',
    label: '资助项目',
    component: 'Input',
  },
  {
    field: 'amount',
    label: '资助金额',
    component: 'InputNumber',
  },
  {
    field: 'remarks',
    label: '备注',
    component: 'InputTextArea',
  },
];
