import { BasicColumn, FormSchema } from '@/components/Table';
import { getPageInfo } from '@/api/major'; // 专业
import { getPageInfo as classesgetPageInfo } from '@/api/classes'; // 班级
import { getPageInfo as stugetPageInfo } from '@/api/stuInfo'; // 学生
import { getPageInfo as codegetPageInfo } from '@/api/codeofconduct'; // 行为项目
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
    width: 50,
  },
  {
    title: '行为类型',
    dataIndex: 'behaviorTypeName',
    width: 150,
  },
  {
    title: '行为名称',
    dataIndex: 'behaviorName',
    width: 80,
  },
  {
    title: '行为内容',
    dataIndex: 'behaviorContent',
    width: 200,
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
    field: 'studentNumber',
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
      api: getPageInfo,
      resultField: 'items',
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
    field: 'behaviorTypeId',
    label: '选择行为类型',
    component: 'ApiSelect',
    colProps: { span: 6 },
    componentProps: {
      api: dictStore.getDictValueToCode,
      params: { Code: 'code_of_conduct_type' },
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
    field: 'behaviorId',
    label: '行为名称',
    component: 'ApiSelect',
    colProps: { span: 15 },
    required: true,
    componentProps: {
      api: codegetPageInfo,
      resultField: 'items',
      labelField: 'behaviorName',
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
    component: 'Input',
    defaultValue: '无',
  },
];
