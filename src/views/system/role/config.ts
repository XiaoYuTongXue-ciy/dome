import { h } from 'vue';
import { Tag } from 'ant-design-vue';
import { dataScopeOptions, dataScopeMap } from './utils';
import { BasicColumn, FormSchema } from '@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '角色名称',
    dataIndex: 'name',
    width: 100,
  },
  {
    title: '角色编码',
    dataIndex: 'code',
    width: 100,
  },
  {
    title: '数据范围',
    dataIndex: 'dataScope',
    customRender: ({ record }) => {
      return record?.dataScope ? dataScopeMap[record?.dataScope] : '';
    },
    width: 100,
  },
  {
    title: '排序',
    dataIndex: 'orderNo',
    width: 100,
    sorter: true,
  },
  {
    title: '状态',
    dataIndex: 'status',
    customRender: ({ record }) => {
      const status = record.status;
      const enable = ~~status === 1;
      const color = enable ? 'green' : 'red';
      const text = enable ? '启用' : '停用';
      return h(Tag, { color: color }, () => text);
    },
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
    field: 'name',
    label: '角色名称',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    field: 'code',
    label: '角色编码',
    component: 'Input',
    colProps: { span: 6 },
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'id',
    show: false,
    slot: '',
  },
  {
    field: 'name',
    label: '角色名称',
    component: 'Input',
    required: true,
    colProps: { span: 15 },
  },
  {
    field: 'code',
    label: '角色编码',
    required: true,
    component: 'Input',
    colProps: { span: 15 },
  },
  {
    field: 'orderNo',
    label: '排序',
    required: true,
    component: 'InputNumber',
    colProps: { span: 15 },
    // componentProps: {
    //   defaultValue: 100,
    // },
  },
  {
    field: 'status',
    label: '状态',
    required: true,
    component: 'RadioGroup',
    colProps: { span: 15 },
    componentProps: {
      options: [
        {
          label: '启用',
          value: 1,
        },
        {
          label: '禁用',
          value: 2,
        },
      ],
    },
  },

  {
    field: 'menuIdList',
    label: '用户权限',
    component: 'ApiTree',
    slot: 'menuList',
  },
  {
    field: 'remark',
    label: '备注',
    required: true,
    defaultValue: '无',
    component: 'Input',
    colProps: { span: 15 },
  },
];

export const dataScopeSchema: FormSchema[] = [
  {
    field: 'id',
    show: false,
    slot: '',
  },
  {
    field: 'dataScope',
    label: '数据范围',
    required: true,
    colProps: { span: 24 },
    component: 'Select',
    componentProps: {
      options: dataScopeOptions,
    },
  },
];
