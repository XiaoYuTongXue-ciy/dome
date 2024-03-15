import { BasicColumn, FormSchema } from '@/components/Table';
import { h } from 'vue';
import { getPageInfo as getTeaPageInfo } from '@/api/teacher';
import { getPageInfo as getCoursePageInfo } from '@/api/course';
import { getPageInfo as getStuPageInfo } from '@/api/stuInfo';

import { Tag } from 'ant-design-vue';

export const columns: BasicColumn[] = [
  {
    title: '授课老师ID',
    dataIndex: 'lecturerId',
    width: 100,
    ifShow: false,
  },
  {
    title: '授课老师',
    dataIndex: 'name',
    width: 100,
    fixed: 'left',
  },
  {
    title: '授课课程ID',
    dataIndex: 'courseId',
    width: 100,
    ifShow: false,
  },
  {
    title: '授课课程代码',
    dataIndex: 'courseCode',
    width: 100,
    ifShow: false,
  },
  {
    title: '课程名称',
    dataIndex: 'courseName',
    width: 100,
    fixed: 'left',
  },

  {
    title: '授课类型',
    dataIndex: 'teachType',
    width: 100,
  },
  {
    title: '上课时间',
    dataIndex: 'classtime',
    width: 100,
  },
  {
    title: '课程进度',
    dataIndex: 'schedule',
    width: 100,
  },
  {
    title: '工作内容',
    dataIndex: 'jobContent',
    width: 100,
  },

  {
    title: '教学内容',
    dataIndex: 'teachingContent',
    width: 100,
  },
  {
    title: '学生学习情况',
    dataIndex: 'stuLearningStatus',
    width: 100,
  },
  {
    title: '教学方案',
    dataIndex: 'teachingScheme',
    width: 100,
  },
  {
    title: '作业情况',
    dataIndex: 'opeSituation',
    width: 100,
  },
  {
    title: '困难点',
    dataIndex: 'difficultpoint',
    width: 100,
  },
  {
    title: '解决措施',
    dataIndex: 'solutionmeasure',
    width: 100,
  },
  {
    title: '自我反思总结',
    dataIndex: 'reflection',
    width: 100,
  },
  {
    title: '班级人数',
    dataIndex: 'headcount',
    width: 100,
  },
  {
    title: '实到人数',
    dataIndex: 'attendance',
    width: 100,
  },
  {
    title: '缺勤人数',
    dataIndex: 'absenteeism',
    width: 70,
    fixed: 'right',
    customRender: ({ record }) => {
      return h(Tag, { color: 'red' }, () => record.absenteeism);
    },
  },
  {
    title: '备注',
    dataIndex: 'remark',
    width: 100,
  },
];

export const detailInfoColumns: BasicColumn[] = [
  {
    title: '缺勤学生',
    width: 100,
    customRender: ({ record }) => {
      return record?.studentInfo?.name || '';
    },
  },
  {
    title: '缺勤原因',
    dataIndex: 'reason',
    width: 100,
  },
];
export const absenteeismForm: FormSchema[] = [
  {
    field: 'id',
    component: 'Input',
    label: '',
    ifShow: false,
  },
  {
    field: 'studentID',
    component: 'ApiSelect',
    componentProps: {
      api: getStuPageInfo,
      showSearch: true,
      optionFilterProp: 'label',
      params: { page: 0, pageSize: 10000 },
      resultField: 'items',
      labelField: 'name',
      valueField: 'id',
    },
    label: '学生',
  },
  {
    field: 'reason',
    component: 'InputTextArea',
    label: '缺勤原因',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'name',
    label: '授课老师',
    colProps: { span: 7 },
    component: 'ApiSelect',
    componentProps: {
      api: getTeaPageInfo,
      showSearch: true,
      optionFilterProp: 'label',
      params: { page: 0, pageSize: 1000 },
      resultField: 'items',
      labelField: 'name',
      valueField: 'name',
    },
  },
  {
    field: 'courseName',
    label: '课程名称',
    colProps: { span: 7 },
    component: 'ApiSelect',
    componentProps: {
      api: getCoursePageInfo,
      showSearch: true,
      optionFilterProp: 'label',
      params: { page: 0, pageSize: 1000 },
      resultField: 'items',
      labelField: 'courseName',
      valueField: 'courseName',
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
    field: '',
    component: 'BasicTitle',
    label: '基本信息',
    componentProps: {
      line: true,
      span: true,
    },
    colProps: {
      span: 24,
    },
  },
  {
    field: 'lecturerId',
    label: '授课老师',
    component: 'ApiSelect',
    colProps: { span: 12 },
    componentProps: {
      api: getTeaPageInfo,
      showSearch: true,
      optionFilterProp: 'label',
      params: { page: 0, pageSize: 1000 },
      resultField: 'items',
      labelField: 'name',
      valueField: 'id',
    },
  },
  {
    field: 'courseId',
    label: '授课课程',
    component: 'ApiSelect',
    colProps: { span: 12 },
    componentProps: {
      api: getCoursePageInfo,
      showSearch: true,
      optionFilterProp: 'label',
      params: { page: 0, pageSize: 1000 },
      resultField: 'items',
      labelField: 'courseName',
      valueField: 'id',
    },
  },
  {
    field: 'teachType',
    component: 'Input',
    colProps: { span: 12 },
    label: '授课类型',
  },
  {
    field: 'classtime',
    colProps: { span: 12 },
    component: 'DatePicker',
    label: '上课时间',
    componentProps: {
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
      showTime: true,
      style: { width: '100%' },
    },
  },
  {
    field: 'schedule',
    component: 'InputTextArea',
    label: '课程进度',
  },
  {
    field: '',
    component: 'BasicTitle',
    label: '教学信息',
    componentProps: {
      line: true,
      span: true,
    },
    colProps: {
      span: 24,
    },
  },
  {
    field: 'jobContent',
    component: 'InputTextArea',
    colProps: { span: 12 },
    label: '工作内容',
  },

  {
    field: 'teachingContent',
    colProps: { span: 12 },
    component: 'InputTextArea',
    label: '教学内容',
  },
  {
    field: 'stuLearningStatus',
    colProps: { span: 12 },
    component: 'InputTextArea',
    label: '学生学习情况',
  },
  {
    field: 'teachingScheme',
    colProps: { span: 12 },
    component: 'InputTextArea',
    label: '教学方案',
  },
  {
    field: 'opeSituation',
    colProps: { span: 12 },
    component: 'InputTextArea',
    label: '作业情况',
  },
  {
    field: 'difficultpoint',
    colProps: { span: 12 },
    component: 'InputTextArea',
    label: '困难点',
  },
  {
    field: 'solutionmeasure',
    colProps: { span: 12 },
    component: 'InputTextArea',
    label: '解决措施',
  },
  {
    field: 'reflection',
    colProps: { span: 12 },
    component: 'InputTextArea',
    label: '自我反思总结',
  },
  {
    field: '',
    component: 'BasicTitle',
    label: '考勤信息',
    componentProps: {
      line: true,
      span: true,
    },
    colProps: {
      span: 24,
    },
  },
  {
    field: 'headcount',
    component: 'InputNumber',
    colProps: { span: 8 },
    label: '班级人数',
  },
  {
    field: 'attendance',
    component: 'InputNumber',
    colProps: { span: 8 },
    label: '实到人数',
  },
  {
    field: 'absenteeism',
    component: 'InputNumber',
    colProps: { span: 8 },
    label: '缺勤人数',
  },
  {
    field: 'remark',
    component: 'InputTextArea',
    colProps: { span: 24 },
    label: '备注',
  },
  {
    field: '',
    component: 'BasicTitle',
    label: '缺勤人员名单',
    componentProps: {
      line: true,
      span: true,
    },
    colProps: {
      span: 24,
    },
  },
  {
    field: 'studentID',
    component: 'ApiSelect',
    label: '学生',
    colProps: { span: 10 },
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
    field: 'reason',
    component: 'Input',
    labelWidth: 90,
    colProps: { span: 10 },
    label: '缺勤原因',
  },
  {
    field: '0',
    component: 'Input',
    colProps: { span: 3 },
    label: ' ',
    labelWidth: 20,
    slot: 'add',
  },
];
