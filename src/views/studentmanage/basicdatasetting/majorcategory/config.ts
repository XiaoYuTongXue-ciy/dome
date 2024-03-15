import { BasicColumn, FormSchema } from '@/components/Table';
import { getListInfo as getSchoolListInfo } from '@/api/sysOrg';
import { getPageInfo as getDepartPagetInfo } from '@/api/departmentalsetting';

export const columns: BasicColumn[] = [
  {
    title: '学校',
    dataIndex: 'schoolName',
    width: 200,
  },
  {
    title: '系部',
    dataIndex: 'departmentName',
    width: 180,
  },
  {
    title: '专业类别编码',
    dataIndex: 'majorCode',
    width: 100,
  },
  {
    title: '专业类别名称',
    dataIndex: 'majorName',
    width: 200,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'schoolId',
    label: '学校名称',
    component: 'ApiSelect',
    colProps: { span: 8 },
    componentProps: ({ formModel, formActionType }) => {
      return {
        api: getSchoolListInfo,
        params: 'schoolName',
        labelField: 'name',
        valueField: 'id',
        required: true,
        onChange: async (e: any) => {
          formModel.majorCategoryId = undefined; //  reset majorCategoryId value
          const { updateSchema } = formActionType;
          updateSchema({
            field: 'departmentId',
            componentProps: {
              api: getDepartPagetInfo,
              params: { schoolId: e, pageSize: 20 },
              resultField: 'items',
              labelField: 'departmentName',
              valueField: 'id',
              immediate: true,
            },
          });
        },
      };
    },
  },
  {
    field: 'departmentId',
    label: '系部',
    component: 'ApiSelect',
    colProps: { span: 8 },
    dynamicDisabled: ({ values }) => !!values.id,
    componentProps: {
      api: getDepartPagetInfo,
      resultField: 'items',
      labelField: 'departmentName',
      valueField: 'id',
      immediate: true,
    },
  },
  {
    field: 'majorName',
    label: '专业类别名称',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'majorCode',
    label: '专业类别编码',
    component: 'Input',
    colProps: { span: 8 },
  },
];

export const addFormSchema: FormSchema[] = [
  {
    field: 'id',
    show: false,
    slot: '',
  },
  {
    field: 'departmentId',
    label: '系部',
    component: 'ApiSelect',
    required: true,
    colProps: { span: 15 },
    componentProps: {
      api: getDepartPagetInfo,
      resultField: 'items',
      labelField: 'departmentName',
      valueField: 'id',
    },
  },
  {
    field: 'majorName',
    label: '类别名称',
    required: true,
    component: 'Input',
    colProps: { span: 15 },
  },

  {
    field: 'majorCode',
    label: '类别编码',
    required: true,
    component: 'Input',
    colProps: { span: 15 },
  },
  {
    field: 'remark',
    label: '备注',
    component: 'Input',
    defaultValue: '无',
    colProps: { span: 15 },
  },
];
