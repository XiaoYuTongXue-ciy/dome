/* eslint-disable @typescript-eslint/no-unused-vars */
import { BasicColumn, FormSchema } from '@/components/Table';
import { getPageInfo as getDepartmentPageInfo } from '@/api/departmentalSetting';
import { getPageInfo as getUserPageInfo } from '@/api/sysUser';
import { getListInfo as getSchoolListInfo } from '@/api/sysOrg';
import { getMajorCategoryPageIofo } from '@/api/major';
import { addMajorParams, searchMajorParams, onAddMajorSearch, onSearchMajorSearch } from './utils';

export const columns: BasicColumn[] = [
  {
    title: '学校名称',
    dataIndex: 'schoolName',
    width: 180,
  },
  {
    title: '系部名称',
    dataIndex: 'departmentName',
    width: 120,
  },
  {
    title: '专业类别代码',
    dataIndex: 'majorCategoryCode',
    width: 80,
  },
  {
    title: '类别名称',
    dataIndex: 'majorCategoryName',
    width: 150,
  },

  {
    title: '专业名称',
    dataIndex: 'majorName',
    width: 150,
  },
  {
    title: '专业代码',
    dataIndex: 'majorCode',
    width: 80,
  },
  {
    title: '学制',
    dataIndex: 'majorDuration',
    width: 50,
  },
  {
    title: '专业介绍',
    dataIndex: 'majorDescription',
    width: 200,
  },

  {
    title: '专业负责人',
    dataIndex: 'majorleader',
    width: 80,
  },
  {
    title: '负责人电话',
    dataIndex: 'leaderPhone',
    width: 120,
  },
  {
    title: '专任老师',
    dataIndex: 'accredteacher',
    key: 'accredteacherInfo',
    customRender: ({ record }) => {
      return record?.accredteacherInfo?.map((item) => item?.realName);
    },
    width: 120,
  },
  {
    title: '兼职老师',
    dataIndex: 'partteacherInfo',
    key: 'partteacherInfo',
    customRender: ({ record }) => {
      return record?.partteacherInfo?.map((item) => item?.realName);
    },
    width: 120,
  },
  {
    title: '备注',
    dataIndex: 'remark',
    width: 100,
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
        onChange: async (e: any) => {
          formModel.departmentId = undefined; //  reset departmentId value
          const { updateSchema } = formActionType;
          updateSchema({
            field: 'departmentId',
            componentProps: {
              api: getDepartmentPageInfo,
              params: { schoolId: e, pageSize: 20 },
              resultField: 'items',
              labelField: 'departmentName',
              valueField: 'id',
              immediate: true,
              onChange: async (e: any) => {
                formModel.majorId = undefined; //  reset majorId value
                const { updateSchema } = formActionType;
                updateSchema({
                  field: 'pId',
                  componentProps: {
                    api: getMajorCategoryPageIofo,
                    params: { departmentId: e, pageSize: 20 },
                    resultField: 'items',
                    labelField: 'majorName',
                    valueField: 'id',
                    immediate: true,
                  },
                });
              },
            },
          });
        },
      };
    },
  },
  {
    field: 'departmentId',
    label: '系部名称',
    component: 'ApiSelect',
    colProps: { span: 8 },
    componentProps: {
      api: getDepartmentPageInfo,
      resultField: 'items',
      labelField: 'departmentName',
      valueField: 'id',
      immediate: true,
      showSearch: true,
    },
  },

  {
    field: 'pId',
    label: '专业类别',
    component: 'ApiSelect',
    colProps: { span: 8 },
    componentProps: {
      api: getMajorCategoryPageIofo,
      resultField: 'items',
      labelField: 'majorName',
      valueField: 'id',
      params: searchMajorParams,
      onInput: onSearchMajorSearch,
      filterOption: false,
      showSearch: true,
    },
  },
  {
    field: 'majorduration',
    label: '学制',
    component: 'InputNumber',
    colProps: { span: 8 },
  },
  {
    field: 'majorleader',
    label: '专业负责人',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'leaderPhone',
    label: '专业负责人电话',
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
    field: 'schoolId',
    label: '学校名称',
    component: 'ApiSelect',
    colProps: { span: 20 },
    componentProps: ({ formModel, formActionType }) => {
      return {
        api: getSchoolListInfo,
        params: 'schoolName',
        labelField: 'name',
        valueField: 'id',
        required: true,
        onChange: async (e: any) => {
          formModel.majorId = undefined; //  reset majorId value
          const { updateSchema } = formActionType;
          updateSchema({
            field: 'pId',
            componentProps: {
              api: getMajorCategoryPageIofo,
              params: { schoolId: e, pageSize: 20 },
              resultField: 'items',
              labelField: 'majorName',
              valueField: 'id',
              immediate: true,
              required: true,
            },
          });
        },
      };
    },
  },
  {
    field: 'pId',
    label: '专业类别',
    component: 'ApiSelect',
    colProps: { span: 20 },
    required: true,
    componentProps: {
      api: getMajorCategoryPageIofo,
      resultField: 'items',
      labelField: 'majorName',
      valueField: 'id',
      params: addMajorParams,
      onInput: onAddMajorSearch,
      filterOption: false,
      showSearch: true,
    },
  },
  {
    field: 'majorDuration',
    label: '学制',
    component: 'InputNumber',
    required: true,
    colProps: { span: 20 },
  },
  {
    field: 'accredteacher',
    label: '主任授课老师',
    required: true,
    component: 'ApiSelect',
    colProps: { span: 20 },
    componentProps: {
      resultField: 'items',
      mode: 'multiple',
      api: getUserPageInfo,
      labelField: 'realName',
      valueField: 'id',
      showSearch: true,
    },
  },
  {
    field: 'partteacher',
    label: '兼任授课老师',
    required: true,
    component: 'ApiSelect',
    colProps: { span: 20 },
    componentProps: {
      mode: 'multiple',
      resultField: 'items',
      api: getUserPageInfo,
      labelField: 'realName',
      valueField: 'id',
    },
  },
  {
    field: 'majorCode',
    label: '专业代码',
    required: true,
    component: 'Input',
  },
  {
    field: 'majorName',
    label: '专业名称',
    required: true,
    component: 'Input',
  },
  {
    field: 'majorleader',
    label: '专业负责人',
    required: true,
    component: 'Input',
  },
  {
    field: 'leaderPhone',
    label: '负责人电话',
    required: true,
    component: 'InputNumber',
  },
  {
    field: 'majorDescription',
    label: '专业介绍',
    required: true,
    component: 'InputTextArea',
  },
  {
    field: 'remark',
    label: '备注',
    component: 'Input',
    defaultValue: '无',
  },
];
