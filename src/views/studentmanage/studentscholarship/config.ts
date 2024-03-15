import { BasicColumn, FormSchema } from '@/components/Table';
import { getPageInfo as getMajorPageInfo } from '@/api/major'; // 专业
import { getPageInfo as classesgetPageInfo } from '@/api/classes'; // 班级
import { getPageInfo as stugetPageInfo } from '@/api/stuInfo'; // 学生
import { getPageInfo as scholarshipgetPageInfo } from '@/api/scholarship'; // 奖学金
import { useDictStore } from '@/store/modules/dict.js';
import { searchParams, onSearch } from '@/utils/Search';

const dictStore = useDictStore();

export const columns: BasicColumn[] = [
  {
    title: '学期',
    dataIndex: 'semester',
    width: 200,
  },
  {
    title: '姓名',
    dataIndex: 'studentName',
    width: 100,
  },
  {
    title: '学号',
    dataIndex: 'studentNumber',
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
    title: '奖学金名称',
    dataIndex: 'scholarshipName',
    width: 100,
  },
  {
    title: '总额',
    dataIndex: 'amount',
    width: 80,
  },
  {
    title: '获奖等级',
    dataIndex: 'scholarshiplevelName',
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
      api: getMajorPageInfo,
      resultField: 'items',
      labelField: 'majorName',
      valueField: 'id',
      showSearch: true,
      immediate: true,
      optionFilterProp: 'label',
      parent: { pageSize: 5000 },
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
    field: 'scholarshiplevel',
    label: '奖学金等级',
    component: 'ApiSelect',
    colProps: { span: 6 },
    componentProps: {
      api: dictStore.getDictValueToCode,
      params: { Code: 'scholarship_level' },
      labelField: 'value',
      valueField: 'id',
    },
  },
  {
    field: 'scholarshiplevelId',
    label: '学期',
    component: 'ApiSelect',
    colProps: { span: 6 },
    componentProps: {
      api: dictStore.getDictValueToCode,
      params: { Code: 'semester' },
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
    field: 'semesterId',
    label: '学期',
    component: 'ApiSelect',
    colProps: { span: 15 },
    required: true,
    componentProps: {
      api: dictStore.getDictValueToCode,
      params: { Code: 'semester' },
      labelField: 'value',
      valueField: 'id',
    },
  },
  {
    field: 'scholarshipId',
    label: '奖学金名称',
    component: 'ApiSelect',
    colProps: { span: 15 },
    required: true, // 是否必填
    componentProps: {
      showSearch: true, //是否输入
      api: scholarshipgetPageInfo,
      resultField: 'items',
      labelField: 'scholarshipName',
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
  {
    field: 'remark',
    label: '备注',
    component: 'InputTextArea',
    defaultValue: '无',
  },
];
