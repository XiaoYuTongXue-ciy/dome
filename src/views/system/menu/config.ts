import { BasicColumn, FormSchema } from '@/components/Table';
import { h } from 'vue';
import { Tag } from 'ant-design-vue';
import { menuOptions, menuMap } from './utils';

export const columns: BasicColumn[] = [
  {
    title: '菜单名称',
    dataIndex: 'title',
    width: 200,
    align: 'left',
  },
  {
    title: '类型',
    dataIndex: 'type',
    width: 80,
    customRender: ({ record }) => {
      return record?.type ? menuMap[record?.type] : '';
    },
  },
  {
    title: '权限标识',
    dataIndex: 'permission',
    width: 180,
  },
  {
    title: '组件路径',
    dataIndex: 'component',
    width: 180,
  },
  {
    title: '路由路径',
    dataIndex: 'path',
    width: 240,
  },
  {
    title: '排序',
    dataIndex: 'orderNo',
    width: 80,
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 80,
    customRender: ({ record }) => {
      const status = record.status;
      const enable = ~~status === 1;
      const color = enable ? 'green' : 'red';
      const text = enable ? '启用' : '停用';
      return h(Tag, { color: color }, () => text);
    },
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    width: 180,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'title',
    label: '菜单名称',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'type',
    label: '类型',
    component: 'Select',
    componentProps: {
      options: menuOptions,
    },
    colProps: { span: 8 },
  },
];
