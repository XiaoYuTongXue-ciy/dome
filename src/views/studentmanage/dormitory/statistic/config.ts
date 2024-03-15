import { BasicColumn, FormSchema } from '@/components/Table';
import { getListInfo as getSchoolListInfo } from '@/api/sysOrg'; // 学校
import { getPageInfo as getMajorPageInfo } from '@/api/major'; // 专业
import { getPageInfo as getClassListInfo } from '@/api/classes'; // 班级

import { majorParams, onMajorSearch } from './utils';

export const columns: BasicColumn[] = [
  {
    title: '标题',
    dataIndex: 'title',
    width: 100,
  },
  {
    title: '男女比例',
    dataIndex: 'maleToFemaleRatio',
    width: 100,
  },
  {
    title: '住宿率比',
    dataIndex: 'accommodationRatio',
    width: 100,
  },
  {
    title: '男生入住率',
    dataIndex: 'maleOccupancyRate',
    width: 100,
  },
  {
    title: '女生入住率',
    dataIndex: 'femaleUccupancyRate',
    width: 100,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'schoolId',
    label: '学校名称',
    component: 'ApiSelect',
    colProps: { span: 8 },
    componentProps: {
      api: getSchoolListInfo,
      params: 'schoolName',
      labelField: 'name',
      valueField: 'id',
    },
  },
  {
    field: 'majorId',
    label: '专业',
    component: 'ApiSelect',
    colProps: { span: 6 },
    componentProps: {
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
];
