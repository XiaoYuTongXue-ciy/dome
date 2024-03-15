/* eslint-disable @typescript-eslint/no-unused-vars */
import { BasicColumn, FormSchema } from '@/components/Table';
import { getPageInfo as getClassPageInfo } from '@/api/classes'; // 班级
import { getPageInfo as getBookPageInfo } from '@/api/teachingmaterial'; // 教材
import { getPageInfo as getschoolPageInfo } from '@/api/sysOrg';
import { useDictStore } from '@/store/modules/dict.js';

const dictStore = useDictStore();

export const columns: BasicColumn[] = [
  {
    title: '学校',
    dataIndex: 'schoolName',
    width: 200,
  },
  {
    title: '学期',
    dataIndex: 'semester',
    width: 180,
  },
  {
    title: '系部',
    dataIndex: 'departmentName',
    width: 100,
  },
  {
    title: '专业',
    dataIndex: 'majorName',
    width: 180,
  },
  {
    title: '年级',
    dataIndex: 'grade',
    width: 100,
  },
  {
    title: '班级',
    dataIndex: 'className',
    width: 100,
  },
  {
    title: '书名',
    dataIndex: 'textBookName',
    width: 130,
  },

  {
    title: '出版商',
    dataIndex: 'publisher',
    sorter: true,
    width: 150,
  },
  {
    title: '领取数量',
    dataIndex: 'issueNumber',
    width: 100,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'schoolId',
    label: '学校',
    component: 'ApiSelect',
    colProps: { span: 10 },
    componentProps: {
      api: getschoolPageInfo,
      resultField: 'items',
      labelField: 'name',
      valueField: 'id',
    },
  },
  {
    field: 'textBookName',
    label: '书名',
    colProps: { span: 10 },
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
    field: 'semesterId',
    label: '学期',
    component: 'ApiSelect',
    required: true,
    colProps: { span: 15 },
    componentProps: {
      api: dictStore.getDictValueToCode,
      params: { Code: 'semester' },
      labelField: 'value',
      valueField: 'id',
      immediate: true,
    },
  },
  {
    field: 'classId',
    label: '使用班级',
    component: 'ApiSelect',
    required: true,
    colProps: { span: 15 },
    componentProps: {
      api: getClassPageInfo,
      resultField: 'items',
      labelField: 'className',
      valueField: 'id',
    },
  },
  {
    field: 'textBookId',
    label: '教材',
    required: true,
    colProps: { span: 15 },
    component: 'ApiSelect',
    componentProps: {
      api: getBookPageInfo,
      resultField: 'items',
      labelField: 'textBookName',
      valueField: 'id',
    },
  },
  {
    field: 'issueNumber',
    label: '领取数量',
    required: true,
    colProps: { span: 15 },
    component: 'InputNumber',
  },
];
