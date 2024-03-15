import { BasicColumn, FormSchema } from '@/components/Table';
import { getPageInfo as getSemesterListInfo } from '@/api/semester/detail.js';
import { searchParams, onSearch } from '@/utils/Search';

export const columns: BasicColumn[] = [
  {
    title: '学校名称',
    dataIndex: 'schoolName',
    width: 200,
  },
  {
    title: '学期',
    dataIndex: 'semester',
    key: 'semester',
    width: 200,
  },
  {
    title: '学期详情',
    dataIndex: 'semesterDetailTitle',
    width: 260,
    ellipsis: false,
  },
  {
    title: '月份',
    dataIndex: 'monthly',
    width: 120,
    sorter: true,
  },
  {
    title: '月度工作描述',
    dataIndex: 'workDescription',
    key: 'workDescription',
    width: 200,
  },
  {
    title: '备注',
    dataIndex: 'remark',
    width: 120,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'semesterDetailId',
    label: '学期详情',
    component: 'ApiSelect',
    colProps: { span: 12 },
    componentProps: {
      immediate: true,
      showSearch: true,
      filterOption: false,
      api: getSemesterListInfo,
      params: searchParams,
      onInput: onSearch,
      resultField: 'items',
      labelField: 'title',
      valueField: 'id',
    },
  },
  {
    field: 'monthly',
    label: '月份',
    colProps: { span: 8 },
    component: 'Input',
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'id',
    show: false,
    slot: '',
  },
  {
    field: 'semesterDetailId',
    label: '学期详情',
    component: 'ApiSelect',
    required: true,
    componentProps: {
      showSearch: true,
      filterOption: false,
      api: getSemesterListInfo,
      params: searchParams,
      onInput: onSearch,
      resultField: 'items',
      labelField: 'title',
      valueField: 'id',
    },
  },
  {
    field: 'monthly',
    label: '月份',
    required: true,
    component: 'Input',
  },
  {
    field: 'workDescription',
    label: '月度工作描述',
    required: true,
    component: 'Input',
  },
  {
    field: 'remark',
    label: '备注',
    component: 'Input',
    required: true,
    defaultValue: '无',
  },
];
