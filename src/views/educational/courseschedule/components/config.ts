import { FormSchema } from '@/components/Table';
import { getListInfo as getSchoolListInfo } from '@/api/sysOrg'; // 学校

import { useDictStore } from '@/store/modules/dict.js';

const dictStore = useDictStore();

export const formSchema: FormSchema[] = [
  {
    field: 'schoolId',
    label: '学校',
    component: 'ApiSelect',
    required: true,
    componentProps: {
      api: getSchoolListInfo,
      params: 'schoolName',
      labelField: 'name',
      valueField: 'id',
    },
  },
  {
    field: 'semesterId',
    label: '学期',
    component: 'ApiSelect',
    required: true,
    slot: 'semSearch',
  },
];

export const totalFormSchema: FormSchema[] = [
  {
    field: 'schoolId',
    label: '学校',
    component: 'ApiSelect',
    required: true,
    colProps: { span: 8 },
    componentProps: {
      api: getSchoolListInfo,
      params: 'schoolName',
      labelField: 'name',
      valueField: 'id',
    },
  },
  {
    field: 'semesterId',
    label: '学期',
    component: 'ApiSelect',
    required: true,
    colProps: { span: 8, offset: 2 },
    slot: 'semSearch',
  },
];

export const classroomSchema: FormSchema[] = [
  {
    field: 'schoolId',
    label: '学校',
    component: 'ApiSelect',
    required: true,
    colProps: { span: 8 },
    componentProps: {
      api: getSchoolListInfo,
      params: 'schoolName',
      labelField: 'name',
      valueField: 'id',
    },
  },
  {
    field: 'semesterId',
    label: '学期',
    component: 'ApiSelect',
    required: true,
    colProps: { span: 8 },
    slot: 'semSearch',
  },
  {
    field: 'classRoomTypeId',
    label: '教室类型',
    component: 'ApiSelect',
    colProps: { span: 8 },
    required: true,
    componentProps: {
      api: dictStore.getDictValueToCode,
      params: { Code: 'class_room_type' },
      labelField: 'value',
      valueField: 'id',
    },
  },
];
