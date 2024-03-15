import { BasicColumn, FormSchema } from '@/components/Table';
import { getPageInfo as getMajorPageInfo } from '@/api/major'; // 专业
import { getPageInfo as getTeacherPageInfo } from '@/api/teacher'; // 用户 getUserPageInfo
import { useDictStore } from '@/store/modules/dict.js';

const dictStore = useDictStore();

export const columns: BasicColumn[] = [
  {
    title: '年级',
    dataIndex: 'grade',
    width: 100,
  },
  {
    title: '班级编号',
    dataIndex: 'classNumber',
    width: 100,
  },
  {
    title: '班级名称',
    dataIndex: 'className',
    width: 100,
  },
  {
    title: '专业',
    dataIndex: 'majorInfo.majorName',
    customRender: ({ record }) => {
      return record?.majorInfo?.majorName;
    },
    width: 180,
  },
  {
    title: '班主任',
    dataIndex: 'user.realName',
    customRender: ({ record }) => {
      return record?.user?.realName;
    },
    width: 100,
  },
  // stuCount
  {
    title: '人数',
    dataIndex: 'stuCount',
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
    field: 'teacherid',
    component: 'ApiSelect',
    label: '班主任',
    required: true,
    componentProps: {
      api: getTeacherPageInfo,
      showSearch: true,
      optionFilterProp: 'label',
      params: { pageSize: 5000 },
      resultField: 'items',
      labelField: 'name',
      valueField: 'id',
      immediate: true,
    },
  },
  {
    field: 'classname',
    label: '班级名称',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    field: 'gradeId',
    label: '年级',
    component: 'ApiSelect',
    colProps: { span: 6 },
    componentProps: {
      api: dictStore.getDictValueToCode,
      params: { Code: 'grade' },
      labelField: 'value',
      valueField: 'id',
    },
  },
  {
    field: 'majorid',
    label: '专业',
    component: 'ApiSelect',
    colProps: { span: 6 },
    componentProps: {
      api: getMajorPageInfo,
      showSearch: true,
      optionFilterProp: 'label',
      params: { pageSize: 5000 },
      resultField: 'items',
      labelField: 'majorName',
      valueField: 'id',
      immediate: true,
    },
  },
];

export const addFormSchema: FormSchema[] = [
  {
    field: 'id',
    show: false,
    slot: '',
  },
  {
    field: 'classNumber',
    label: '班级编号',
    required: true,
    component: 'Input',
  },
  {
    field: 'className',
    label: '班级名称',
    required: true,
    component: 'Input',
  },
  {
    field: 'majorid',
    component: 'ApiSelect',
    label: '专业',
    required: true,
    componentProps: {
      api: getMajorPageInfo,
      resultField: 'items',
      params: { pageSize: 5000 },
      labelField: 'majorName',
      valueField: 'id',
      immediate: true,
      showSearch: true,
      optionFilterProp: 'label',
    },
  },
  {
    field: 'gradeId',
    label: '年级',
    component: 'ApiSelect',
    componentProps: {
      api: dictStore.getDictValueToCode,
      params: { Code: 'grade' },
      labelField: 'value',
      valueField: 'id',
    },
  },
  {
    field: 'teacherId',
    component: 'ApiSelect',
    label: '班主任',
    required: true,
    componentProps: {
      api: getTeacherPageInfo,
      showSearch: true,
      optionFilterProp: 'label',
      params: { pageSize: 5000 },
      resultField: 'items',
      labelField: 'name',
      valueField: 'id',
      immediate: true,
    },
  },
  {
    field: 'remark',
    label: '备注',
    component: 'Input',
    defaultValue: '无',
  },
];
