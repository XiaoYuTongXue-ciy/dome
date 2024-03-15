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
    title: '上课时间',
    dataIndex: 'goClassTime',
    key: 'goClassTime',
    width: 120,
    sorter: true,
  },
  {
    title: '下课时间',
    dataIndex: 'classOverTime',
    key: 'classOverTime',
    width: 120,
    sorter: true,
  },
  {
    title: '说明',
    dataIndex: 'description',
    width: 160,
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
    field: 'goClassTime',
    label: '上课时间',
    component: 'TimePicker',
    colProps: { span: 6 },
  },
  {
    field: 'classOverTime',
    label: '下课时间',
    component: 'TimePicker',
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
    field: 'goClassTime',
    label: '上课时间',
    required: true,
    component: 'TimePicker',
    componentProps: {
      valueFormat: 'HH:mm',
      format: 'HH:mm',
    },
  },
  {
    field: 'classOverTime',
    label: '下课时间',
    required: true,
    component: 'TimePicker',
    componentProps: {
      valueFormat: 'HH:mm',
      format: 'HH:mm',
    },
  },
  {
    field: 'description',
    label: '说明',
    required: true,
    component: 'Input',
    componentProps: {
      placeholder: '例：第一节',
    },
  },
  {
    field: 'remark',
    label: '备注',
    component: 'Input',
    required: true,
    defaultValue: '无',
  },
];
