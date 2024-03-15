import { BasicColumn, FormSchema } from '@/components/Table';
import { getPageInfo as getUserList } from '@/api/sysUser';

export const columns: BasicColumn[] = [
  {
    title: '成绩设置名称',
    dataIndex: 'gradeSettingName',
  },
  {
    title: '平时成绩比例',
    dataIndex: 'normalperformanceScale',
  },
  {
    title: '考试成绩比例',
    dataIndex: 'examinationResultScale',
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
// 查询
export const searchFormSchema: FormSchema[] = [
  {
    field: 'gradeSettingName',
    label: '成绩设置名称',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    field: 'createUserId',
    label: '创建人',
    component: 'ApiSelect',
    colProps: { span: 6 },
    componentProps: {
      api: getUserList,
      showSearch: true,
      optionFilterProp: 'label',
      params: { page: 0, pageSize: 10000 },
      resultField: 'items',
      labelField: 'realName',
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
    field: 'gradeSettingName',
    label: '成绩设置名称',
    component: 'Input',
    labelWidth: 100,
    required: true,
  },
  {
    field: 'normalperformanceScale',
    label: '平时成绩比例',
    component: 'InputNumber',
    required: true,
    labelWidth: 100,
    componentProps: {
      min: 0,
      max: 1,
      step: 0.1,
      // formatter: (value: string) => (value ?? true ? `${value}%` : ''),
      // parser: (value: string) => value.replace('%', ''),
    },
  },
  {
    field: 'examinationResultScale',
    label: '考试成绩比例',
    component: 'InputNumber',
    required: true,
    labelWidth: 100,
    componentProps: {
      min: 0,
      max: 1,
      step: 0.1,
      // formatter: (value: string) => (value ?? true ? `${value}%` : ''),
      // parser: (value: string) => value.replace('%', ''),
    },
  },
];
