import { BasicColumn, FormSchema } from '@/components/Table';
import { getListInfo } from '@/api/major'; // 专业
import { getPageInfo as classesgetPageInfo } from '@/api/classes'; // 班级
import { getPageInfo as stugetPageInfo } from '@/api/stuInfo'; // 学生
import { getPageInfo as enterpriseGetPageInfo } from '@/api/internshipenterprisesetting'; // 企业
import { getPageInfo } from '@/api/sysUser'; // 老师
import { useDictStore } from '@/store/modules/dict.js';
import { searchParams, onSearch } from '@/utils/Search';

const dictStore = useDictStore();

export const columns: BasicColumn[] = [
  {
    title: '姓名',
    dataIndex: 'studentName',
    width: 100,
  },
  {
    title: '学号',
    dataIndex: 'studentnumber',
    width: 100,
  },
  {
    title: '班级',
    dataIndex: 'className',
    width: 100,
  },
  {
    title: '专业',
    dataIndex: 'majorName',
    width: 100,
  },
  {
    title: '年级',
    dataIndex: 'grade',
    width: 100,
  },
  {
    title: '指导老师',
    dataIndex: 'instructorName',
    width: 100,
  },
  {
    title: '备注',
    dataIndex: 'remark',
    width: 100,
  },
];
// 查询
export const searchFormSchema: FormSchema[] = [
  {
    field: 'studentName',
    label: '姓名',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    field: 'studentnumber',
    label: '学号',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    field: 'classId',
    label: '班级',
    component: 'ApiSelect',
    colProps: { span: 6 },
    componentProps: {
      api: classesgetPageInfo,
      resultField: 'items',
      labelField: 'className',
      valueField: 'id',
    },
  },
  {
    field: 'majorId',
    label: '专业',
    component: 'ApiSelect',
    colProps: { span: 6 },
    componentProps: {
      api: getListInfo,
      params: 'majorname',
      labelField: 'majorname',
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
    },
  },
  {
    field: 'instructorName',
    label: '指导老师',
    component: 'ApiSelect',
    colProps: { span: 6 },
    componentProps: {
      api: getPageInfo,
      resultField: 'items',
      labelField: 'account',
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
    field: 'enterpriseId',
    label: '实习企业',
    component: 'ApiSelect',
    colProps: { span: 15 },
    rules: [{ required: true }],
    componentProps: {
      api: enterpriseGetPageInfo,
      resultField: 'items',
      labelField: 'unitName',
      valueField: 'id',
    },
  },
  {
    field: 'instructorId',
    label: '指导老师',
    component: 'ApiSelect',
    colProps: { span: 15 },
    componentProps: {
      api: getPageInfo,
      resultField: 'items',
      labelField: 'account',
      valueField: 'id',
    },
  },
  {
    field: 'studentId',
    label: '姓名',
    component: 'ApiSelect',
    required: true,
    colProps: { span: 15 },
    componentProps: {
      immediate: true,
      showSearch: true,
      filterOption: false,
      api: stugetPageInfo,
      resultField: 'items',
      params: searchParams,
      onInput: onSearch,
      labelField: 'nameAndNumber',
      valueField: 'id',
    },
  },
  // {
  //   field: '',
  //   label: '实习岗位',
  //   colProps: { span: 15 },
  //   rules: [{ required: true }],
  //   component: 'Input',
  // },
  {
    field: 'remark',
    label: '备注',
    component: 'Input',
    defaultValue: '无',
  },
];
