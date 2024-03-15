import { FormSchema } from '@/components/Table';
import { getListInfo as getSchoolListInfo } from '@/api/sysOrg'; // 学校

export const formSchema: FormSchema[] = [
  {
    field: 'schoolId',
    label: '学校',
    component: 'ApiSelect',
    required: true,
    colProps: { span: 24 },
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
    colProps: { span: 24 },
    slot: 'semSearch',
  },
];
