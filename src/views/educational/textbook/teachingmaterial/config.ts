/* eslint-disable @typescript-eslint/no-unused-vars */
import { BasicColumn, FormSchema } from '@/components/Table';
import { getPageInfo as getMajorPageInfo } from '@/api/major'; // 专业
import { getPageInfo as getCoursePageInfo } from '@/api/course'; // 课程
import { getPageInfo as getClassPageInfo } from '@/api/classes'; // 班级
import { useDictStore } from '@/store/modules/dict.js';

const dictStore = useDictStore();

export const columns: BasicColumn[] = [
  {
    title: '学期',
    dataIndex: 'semester',
    width: 200,
  },
  {
    title: '教材名称',
    dataIndex: 'textBookName',
    width: 100,
  },
  {
    title: '作者',
    dataIndex: 'author',
    width: 100,
  },
  {
    title: '出版社',
    dataIndex: 'publisher',
    width: 120,
  },
  {
    title: '使用专业',
    dataIndex: 'major',
    width: 120,
  },
  {
    title: '使用班级',
    dataIndex: 'className',
    width: 120,
  },
  {
    title: '课程',
    dataIndex: 'course',
    width: 120,
  },

  {
    title: '价格/元',
    dataIndex: 'price',
    sorter: true,
    width: 100,
  },
  {
    title: '库存量',
    dataIndex: 'number',
    width: 100,
  },
  {
    title: '录入时间',
    dataIndex: 'createTime',
    width: 200,
    sorter: true,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'author',
    label: '作者',
    colProps: { span: 6 },
    component: 'Input',
  },
  {
    field: 'textbookname',
    label: '书名',
    colProps: { span: 6 },
    component: 'Input',
  },
  {
    field: 'semesterId',
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
  {
    field: 'publisher',
    label: '出版社',
    colProps: { span: 6 },
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
    field: 'textBookName',
    label: '教材名称',
    required: true,
    colProps: { span: 15 },
    component: 'Input',
  },
  {
    field: 'author',
    label: '作者',
    required: true,
    colProps: { span: 15 },
    component: 'Input',
  },
  {
    field: 'publisher',
    label: '出版社',
    required: true,
    colProps: { span: 15 },
    component: 'Input',
  },
  {
    field: 'majorId',
    label: '使用专业',
    required: true,
    component: 'ApiSelect',
    colProps: { span: 15 },
    componentProps: ({ formModel, formActionType }) => {
      return {
        api: getMajorPageInfo,
        resultField: 'items',
        labelField: 'majorName',
        valueField: 'id',
        immediate: true,
        showSearch: true,
        optionFilterProp: 'label',
        onChange: async (e: any) => {
          console.log(e);
          formModel.classId = undefined;
          const { updateSchema } = formActionType;
          updateSchema({
            field: 'classId',
            componentProps: {
              api: getClassPageInfo,
              params: { majorId: e, pageSize: 20 },
              resultField: 'items',
              labelField: 'className',
              valueField: 'id',
              immediate: true,
            },
          });
          updateSchema({
            field: 'courseId',
            componentProps: {
              api: getCoursePageInfo,
              params: { majorId: e, pageSize: 20 },
              resultField: 'items',
              labelField: 'courseName',
              valueField: 'id',
              immediate: true,
            },
          });
        },
      };
    },
  },
  {
    field: 'classId',
    label: '使用班级',
    component: 'ApiSelect',
    required: true,
    dynamicDisabled: ({ values }) => !!values.id,
    colProps: { span: 15 },
    componentProps: {
      api: getClassPageInfo,
      params: { pageSize: 5000 },
      resultField: 'items',
      labelField: 'className',
      valueField: 'id',
    },
  },
  {
    field: 'courseId',
    label: '课程',
    component: 'ApiSelect',
    required: true,
    dynamicDisabled: ({ values }) => !!values.id,
    colProps: { span: 15 },
    componentProps: {
      api: getCoursePageInfo,
      params: { pageSize: 5000 },
      resultField: 'items',
      labelField: 'courseName',
      valueField: 'id',
      immediate: true,
    },
  },
  {
    field: 'price',
    label: '单价',
    required: true,
    colProps: { span: 15 },
    component: 'InputNumber',
  },
  {
    field: 'number',
    label: '库存',
    required: true,
    colProps: { span: 15 },
    component: 'InputNumber',
  },
];
