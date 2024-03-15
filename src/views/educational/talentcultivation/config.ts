import { BasicColumn, FormSchema } from '@/components/Table';
import { useDictStore } from '@/store/modules/dict.js';
// 学校
import { getListInfo as getSchoolListInfo } from '@/api/sysOrg';
// 专业类别
import { getMajorCategoryPageIofo } from '@/api/talentCultivation';
// import { getMajorCategoryPageIofo, uploadApi } from '@/api/talentCultivation';
// 专业
import { getPageInfo as getMarjorListInfo } from '@/api/major';

const dictStore = useDictStore();

export const columns: BasicColumn[] = [
  {
    title: '学校名称',
    dataIndex: 'schoolName',
    width: 200,
    key: 'schoolName',
  },
  {
    title: '学校主管部门',
    dataIndex: 'schoolDepartmentCharge',
    width: 200,
    key: 'schoolDepartmentCharge',
  },
  {
    title: '专业类别',
    dataIndex: 'majorCategoryName',
    width: 200,
    key: 'majorCategoryName',
  },
  {
    title: '专业名称',
    dataIndex: 'majorName',
    width: 200,
    key: 'majorName',
  },
  {
    title: '专业代码',
    dataIndex: 'majorCode',
    width: 120,
    key: 'majorCode',
  },
  {
    title: '学制（年）',
    dataIndex: 'majorDuration',
    width: 100,
    key: 'majorDuration',
  },
  {
    title: '申请时间',
    dataIndex: 'createTime',
    width: 200,
    key: 'createTime',
    customRender: ({ record }) => {
      const idx = record.createTime.indexOf(' ');
      if (idx > -1) {
        const dateArray = record.createTime.substring(0, idx).split('-');
        const yearMonthDay = `${dateArray[0]}年${dateArray[1]}月${dateArray[2]}日`;
        return yearMonthDay;
      } else {
        return record.createTime;
      }
    },
  },
  {
    title: '专业负责人',
    dataIndex: 'majorleader',
    width: 120,
    key: 'majorleader',
  },
  {
    title: '联系电话',
    dataIndex: 'leaderPhone',
    width: 180,
    key: 'leaderPhone',
  },
  {
    title: '年级',
    dataIndex: 'grade',
    width: 80,
    key: 'grade',
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
          formModel.majorCategoryId = undefined; //  reset majorCategoryId value
          formModel.majorId = undefined; //  reset majorId value
          const { updateSchema } = formActionType;
          updateSchema({
            field: 'majorCategoryId',
            componentProps: {
              api: getMajorCategoryPageIofo,
              params: { schoolId: e },
              resultField: 'items',
              labelField: 'majorName',
              valueField: 'id',
              immediate: true,
              onChange: async (e: any) => {
                formModel.majorId = undefined; //  reset majorId value
                const { updateSchema } = formActionType;
                updateSchema({
                  field: 'majorId',
                  componentProps: {
                    api: getMarjorListInfo,
                    params: { schoolId: formModel.schoolId, pId: e, pageSize: 20 },
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
    field: 'majorCategoryId',
    label: '专业类别',
    component: 'ApiSelect',
    dynamicDisabled: ({ values }) => !!values.id,
    colProps: { span: 8 },
    componentProps: ({ formModel, formActionType }) => {
      return {
        api: getMajorCategoryPageIofo,
        resultField: 'items',
        labelField: 'majorName',
        valueField: 'id',
        immediate: true,
        onChange: async (e: any) => {
          formModel.majorId = undefined; //  reset majorId value
          const { updateSchema } = formActionType;
          updateSchema({
            field: 'majorId',
            componentProps: {
              api: getMarjorListInfo,
              params: { schoolId: formModel.schoolId, pId: e, pageSize: 20 },
              resultField: 'items',
              labelField: 'majorName',
              valueField: 'id',
              immediate: true,
            },
          });
        },
      };
    },
  },
  {
    field: 'majorId',
    label: '专业名称',
    component: 'ApiSelect',
    dynamicDisabled: ({ values }) => !!values.id,
    colProps: { span: 8 },
    componentProps: {
      api: getMarjorListInfo,
      resultField: 'items',
      labelField: 'majorName',
      valueField: 'id',
      immediate: true,
    },
  },
  {
    field: 'gradeId',
    label: '年级',
    component: 'ApiSelect',
    colProps: { span: 8 },
    componentProps: {
      api: dictStore.getDictValueToCode,
      params: { Code: 'grade' },
      labelField: 'value',
      valueField: 'id',
    },
  },
  {
    field: 'majorleader',
    label: '专业负责人',
    colProps: { span: 8 },
    component: 'Input',
  },
];
export const formSchema: FormSchema[] = [
  {
    field: 'gradeId',
    label: '年级',
    component: 'ApiSelect',
    required: true,
    defaultValue: null,
    componentProps: {
      api: dictStore.getDictValueToCode,
      placeholder: '请先选择年级',
      params: { Code: 'grade' },
      labelField: 'value',
      valueField: 'id',
      immediate: true,
    },
  },
  {
    field: 'fileId',
    label: '选择文件',
    slot: 'fileUpload',
    component: 'Upload',
    // ifShow: false,
  },
];
