import { BasicColumn, FormSchema } from '@/components/Table';
import { useDictStore } from '@/store/modules/dict.js';
import {
  genderOptions,
  genderMap,
  dormitoryAssignOptions,
  studentParams,
  majorParams,
  dormitoryParams,
  onMajorSearch,
  onStudentSearch,
  onDormitorySearch,
} from './utils';

import { getPageInfo as getMajorPageInfo } from '@/api/major'; // 专业
import { getPageInfo as getClassListInfo } from '@/api/classes'; // 班级
import { getPageInfo as studentPageInfo } from '@/api/stuInfo'; // 学生
import { getPageInfo as dormitoryPageInfo } from '@/api/dormitory';

studentParams; // 宿舍

const dictStore = useDictStore();

export const columns: BasicColumn[] = [
  {
    title: '专业',
    dataIndex: 'majorName',
    width: 180,
  },
  {
    title: '年级',
    dataIndex: 'grade',
    width: 120,
  },
  {
    title: '班级',
    dataIndex: 'className',
    width: 120,
  },
  {
    title: '学号',
    dataIndex: 'studentNumber',
    width: 120,
  },
  {
    title: '学生名称',
    dataIndex: 'studentName',
    width: 120,
  },
  {
    title: '性别',
    dataIndex: 'gender',
    width: 50,
    customRender: ({ record }) => {
      return record?.gender ? genderMap[record?.gender] : '';
    },
  },
  {
    title: '宿舍信息',
    dataIndex: 'dormitoryDetail',
    width: 180,
  },
  {
    title: '宿舍类型',
    dataIndex: 'dormitoryTypeName',
    width: 120,
  },
  {
    title: '教师姓名',
    dataIndex: 'teacherName',
    width: 120,
  },
  {
    title: '教师联系方式',
    dataIndex: 'teacherPhone',
    width: 180,
  },
  {
    title: '备注',
    dataIndex: 'remark',
    width: 120,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'majorId',
    label: '专业',
    component: 'ApiSelect',
    colProps: { span: 6 },
    componentProps: {
      // immediate: true,
      showSearch: true,
      filterOption: false,
      api: getMajorPageInfo,
      params: majorParams,
      onInput: onMajorSearch,
      resultField: 'items',
      labelField: 'majorName',
      valueField: 'id',
    },
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
      immediate: true,
    },
  },
  {
    field: 'classId',
    label: '班级',
    component: 'ApiSelect',
    colProps: { span: 6 },
    componentProps: {
      api: getClassListInfo,
      resultField: 'items',
      labelField: 'className',
      valueField: 'id',
      immediate: true,
    },
  },
  {
    field: 'studentNumber',
    label: '学号',
    colProps: { span: 6 },
    component: 'Input',
  },
  {
    field: 'studentName',
    label: '学生姓名',
    colProps: { span: 6 },
    component: 'Input',
  },
  {
    field: 'gender',
    label: '性别',
    colProps: { span: 6 },
    component: 'Select',
    componentProps: {
      options: genderOptions,
    },
  },
  {
    field: 'building',
    label: '楼栋',
    colProps: { span: 6 },
    component: 'Input',
  },
  {
    field: 'floorNumber',
    label: '楼层',
    colProps: { span: 6 },
    component: 'Input',
  },
  {
    field: 'roomNumber',
    label: '房间号',
    colProps: { span: 6 },
    component: 'Input',
  },
  {
    field: 'isAssignDormitory',
    label: '是否分配宿舍',
    colProps: { span: 6 },
    component: 'Select',
    componentProps: {
      options: dormitoryAssignOptions,
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
    field: 'studentId',
    label: '学生姓名',
    component: 'ApiSelect',
    required: true,
    colProps: { span: 15 },
    componentProps: {
      showSearch: true,
      filterOption: false,
      api: studentPageInfo,
      resultField: 'items',
      params: studentParams,
      onInput: onStudentSearch,
      labelField: 'nameAndNumber',
      valueField: 'id',
    },
  },
  {
    field: 'dormitoryId',
    label: '宿舍',
    component: 'ApiSelect',
    required: true,
    colProps: { span: 15 },
    componentProps: {
      // immediate: true,
      showSearch: true,
      filterOption: false,
      api: dormitoryPageInfo,
      resultField: 'items',
      params: dormitoryParams,
      onInput: onDormitorySearch,
      labelField: 'dormitoryDetail',
      valueField: 'id',
    },
  },
  {
    field: 'remark',
    label: '备注',
    required: true,
    defaultValue: '无',
    component: 'Input',
  },
];
