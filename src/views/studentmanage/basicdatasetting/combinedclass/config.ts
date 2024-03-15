import { BasicColumn, FormSchema } from '@/components/Table';
import { searchParams, onSearch } from '@/utils/Search';
import { getPageInfo as getCourseInfo } from '@/api/course'; // 课程

export const columns: BasicColumn[] = [
  {
    title: '课程',
    dataIndex: 'courseName',
    width: 100,
  },
  {
    title: '合班班级',
    dataIndex: 'classOutput',
    customRender: ({ record }) => {
      return record.classOutput.map((item) => item.name).join(' | ');
    },
    width: 100,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'courseId',
    label: '课程',
    component: 'ApiSelect',
    colProps: { span: 8 },
    componentProps: {
      immediate: true,
      showSearch: true,
      filterOption: false,
      api: getCourseInfo,
      params: searchParams,
      resultField: 'items',
      labelField: 'courseName',
      valueField: 'id',
      onInput: onSearch,
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
    field: 'courseId',
    label: '课程',
    component: 'ApiSelect',
    colProps: { span: 20 },
    componentProps: {
      immediate: true,
      showSearch: true,
      filterOption: false,
      api: getCourseInfo,
      params: searchParams,
      resultField: 'items',
      labelField: 'courseName',
      valueField: 'id',
      onInput: onSearch,
    },
    required: true,
  },
  {
    field: 'classIds',
    label: '班级',
    component: 'ApiTree',
    slot: 'classOption',
    required: true,
    colProps: { span: 20 },
  },
];
