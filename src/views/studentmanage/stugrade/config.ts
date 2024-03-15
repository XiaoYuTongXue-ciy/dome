import { BasicColumn, FormSchema } from '@/components/Table';
// import { getPageInfo as getUserList } from '@/api/sysUser';

// import { getPageInfo as getMajorPageInfo } from '@/api/major'; // 专业
import { getPageInfo as getCoursePageInfo } from '@/api/course'; // 课程
import { getPageInfo as getClassPageInfo } from '@/api/classes'; // 班级
import { getPageInfo as getStuPageInfo } from '@/api/stuInfo';
import { getGradeSetting } from './api';

import { useDictStore } from '@/store/modules/dict.js';

const dictStore = useDictStore();
export const columns: BasicColumn[] = [
  {
    title: '专业',
    dataIndex: 'majorName',
  },
  {
    title: '年级',
    dataIndex: 'grade',
  },
  {
    title: '班级',
    dataIndex: 'className',
  },
  {
    title: '学号',
    dataIndex: 'studentNumber',
  },
  {
    title: '学生',
    dataIndex: 'studentName',
  },
  {
    title: '学期',
    dataIndex: 'semester',
  },
  {
    title: '课程',
    dataIndex: 'courseName',
  },

  {
    title: '考试成绩类型',
    dataIndex: 'achievementName',
    fixed: 'right',
  },

  {
    title: '平时成绩',
    dataIndex: 'normalperformance',
  },
  {
    title: '考试成绩',
    dataIndex: 'examinationResult',
  },
  {
    title: '总评',
    dataIndex: 'total',
  },
  {
    title: '审核状态',
    dataIndex: 'auditStatusName',
    fixed: 'right',
  },
  {
    title: '成绩类型',
    dataIndex: 'gradeStatusName',
  },
  {
    title: '更新人',
    dataIndex: 'updateUserName',
  },
  {
    title: '更新时间',
    dataIndex: 'updateTime',
  },
  {
    title: '创建人',
    dataIndex: 'createUserName',
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
  },
];

// 成绩设置
export const gradeSetting: BasicColumn[] = [
  {
    title: '成绩设置名称',
    dataIndex: 'gradeSettingName',
  },
  {
    title: '平时成绩比例',
    dataIndex: 'normalperformanceScale',
  },
  {
    title: '开始成绩比例',
    dataIndex: 'examinationResultScale',
  },
  // {
  //   title: '更新人',
  //   dataIndex: 'updateUserName',
  // },
  // {
  //   title: '更新时间',
  //   dataIndex: 'updateTime',
  // },
  // {
  //   title: '创建人',
  //   dataIndex: 'createUserName',
  // },
  // {
  //   title: '创建时间',
  //   dataIndex: 'createTime',
  // },
];
// 查询
export const searchFormSchema: FormSchema[] = [
  {
    field: 'studentNumber',
    label: '学号',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    field: 'classNumber',
    label: '班级',
    component: 'ApiSelect',
    colProps: { span: 6 },
    componentProps: {
      api: getClassPageInfo,
      showSearch: true,
      optionFilterProp: 'label',
      params: { page: 0, pageSize: 10000 },
      resultField: 'items',
      labelField: 'className',
      valueField: 'classNumber',
    },
  },
  {
    field: 'achievementtype',
    label: '考试类型',
    component: 'ApiSelect',
    colProps: { span: 6 },
    componentProps: {
      api: dictStore.getDictValueToCode,
      params: { Code: 'achievement_type' },
      labelField: 'value',
      valueField: 'id',
    },
  },
  {
    field: 'auditStatus',
    label: '审批状态',
    component: 'ApiSelect',
    colProps: { span: 6 },
    componentProps: {
      api: dictStore.getDictValueToCode,
      params: { Code: 'grade_audit_status' },
      labelField: 'value',
      valueField: 'id',
    },
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
    field: 'studentId',
    label: '学生',
    component: 'ApiSelect',
    labelWidth: 100,
    required: true,
    componentProps: {
      api: getStuPageInfo,
      showSearch: true,
      optionFilterProp: 'label',
      params: { page: 0, pageSize: 10000 },
      resultField: 'items',
      labelField: 'name',
      valueField: 'id',
    },
  },
  {
    field: 'semesterId',
    label: '学期',
    component: 'ApiSelect',
    labelWidth: 100,
    required: true,
    componentProps: {
      api: dictStore.getDictValueToCode,
      showSearch: true,
      optionFilterProp: 'label',
      params: { Code: 'semester' },
      labelField: 'value',
      valueField: 'id',
    },
  },
  {
    field: 'coursesId',
    label: '课程',
    component: 'ApiSelect',
    labelWidth: 100,
    required: true,
    componentProps: {
      api: getCoursePageInfo,
      showSearch: true,
      optionFilterProp: 'label',
      params: { page: 0, pageSize: 10000 },
      resultField: 'items',
      labelField: 'courseName',
      valueField: 'id',
    },
  },
  {
    field: 'achievementtype',
    label: '考试类型',
    component: 'ApiSelect',
    labelWidth: 100,
    required: true,
    componentProps: {
      api: dictStore.getDictValueToCode,
      params: { Code: 'achievement_type' },
      labelField: 'value',
      valueField: 'id',
    },
  },
  {
    field: 'normalperformance',
    label: '平时成绩',
    component: 'InputNumber',
    labelWidth: 100,
    required: true,
  },
  {
    field: 'examinationResult',
    label: '考试成绩',
    component: 'InputNumber',
    labelWidth: 100,
    required: true,
  },
  {
    field: 'gradeSettingId',
    label: '成绩设置',
    component: 'ApiSelect',
    labelWidth: 100,
    required: true,
    componentProps: {
      api: getGradeSetting,
      params: { page: 0, pageSize: 1000000 },
      resultField: 'items',
      labelField: 'gradeSettingName',
      valueField: 'id',
    },
  },
  {
    field: 'gradeStatus',
    label: '成绩状态',
    component: 'ApiSelect',
    labelWidth: 100,
    required: true,
    componentProps: {
      api: dictStore.getDictValueToCode,
      params: { Code: 'grade_status' },
      labelField: 'value',
      valueField: 'id',
    },
  },
  {
    field: 'remark',
    label: '备注',
    component: 'InputTextArea',
    labelWidth: 100,
    required: true,
  },
];

// 审批表单
export const examineColumns: FormSchema[] = [
  {
    field: 'auditStatus',
    label: '审批状态',
    component: 'ApiSelect',
    labelWidth: 100,
    required: true,
    colProps: { span: 20 },
    componentProps: {
      api: dictStore.getDictValueToCode,
      params: { Code: 'grade_audit_status' },
      labelField: 'value',
      valueField: 'id',
      optionFilterProp: 'label',
    },
  },
];
