import { BasicColumn, FormSchema } from '@/components/Table'; // 奖学金
import { getPageInfo } from '@/api/sysOrg';

export const columns: BasicColumn[] = [
  {
    title: '学校名称',
    dataIndex: 'schoolName',
    width: 200,
  },
  {
    title: '系部名称',
    dataIndex: 'departmentName',
    width: 200,
  },
];
// 查询
export const searchFormSchema: FormSchema[] = [
  {
    field: 'schoolId',
    label: '学校名称',
    component: 'ApiSelect',
    colProps: { span: 8 },
    componentProps: {
      api: getPageInfo,
      params: 'schoolName',
      labelField: 'name',
      valueField: 'id',
    },
  },
  {
    field: 'departmentName',
    label: '系部名称',
    component: 'Input',
    colProps: { span: 7 },
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
    field: 'schoolId',
    label: '学校名称',
    component: 'ApiSelect',
    required: true,
    colProps: { span: 15 },
    componentProps: {
      api: getPageInfo,
      resultField: 'items',
      labelField: 'name',
      valueField: 'id',
    },
  },
  {
    field: 'departmentName',
    label: '系部名称',
    component: 'Input',
    colProps: { span: 15 },
    required: true,
  },
];
