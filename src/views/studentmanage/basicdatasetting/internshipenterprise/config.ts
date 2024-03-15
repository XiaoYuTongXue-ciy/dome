/* eslint-disable @typescript-eslint/no-unused-vars */
import { ref } from 'vue';
import { BasicColumn, FormSchema } from '@/components/Table';
import { useDictStore } from '@/store/modules/dict.js';
import { getUserInfo, IsOrNo } from './utils';

import dayjs from 'dayjs';

const dictStore = useDictStore();
const currentTime = dayjs();
const falg = ref(true);

export const columns: BasicColumn[] = [
  {
    title: '企业名称',
    dataIndex: 'unitName',
    width: 150,
  },
  {
    title: '企业信用代码',
    dataIndex: 'enterpriseCreditCode',
    width: 180,
  },
  {
    title: '企业联系人',
    dataIndex: 'contactName',
    width: 100,
  },
  {
    title: '企业联系电话',
    dataIndex: 'contactPhone',
    width: 120,
  },
  {
    title: '企业规模',
    dataIndex: 'cooperativeEnterpriseScale',
    width: 120,
  },
  {
    title: '企业性质',
    dataIndex: 'cooperativeUnitNature ',
    customRender: ({ text, record }) => {
      const cities = record?.cooperativeUnitNature || [];
      return cities.join(',');
    },
    width: 120,
  },
  {
    title: '所在省市',
    dataIndex: 'unitArea',
    customRender: ({ text, record }) => {
      const cities = record?.unitArea || [];
      return cities.join(',');
    },
    width: 150,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'RecordYear',
    label: '备案学年',
    component: 'DatePicker',
    colProps: { span: 7 },
    componentProps: {
      picker: 'year',
      valueFormat: 'YYYY',
    },
  },
  {
    field: 'unitName',
    label: '企业名称',
    component: 'Input',
    colProps: { span: 7 },
  },
  {
    field: 'enterpriseCreditCode',
    label: '企业信用代码',
    component: 'Input',
    colProps: { span: 7 },
  },
  {
    field: 'cooperationNatureId',
    label: '合作性质',
    component: 'ApiSelect',
    colProps: { span: 7 },
    componentProps: {
      api: dictStore.getDictValueToCode,
      params: { Code: 'cooperation_nature' },
      labelField: 'value',
      valueField: 'id',
    },
  },
  {
    field: 'contactPhone',
    label: '联系人电话',
    component: 'Input',
    colProps: { span: 7 },
  },
  {
    field: 'cooperativeEnterpriseScaleId',
    label: '企业合作规模',
    component: 'ApiSelect',
    colProps: { span: 7 },
    componentProps: {
      api: dictStore.getDictValueToCode,
      params: { Code: 'cooperative_enterprise_scale' },
      labelField: 'value',
      valueField: 'id',
    },
  },
  {
    field: 'cooperativeUnitNatureId',
    component: 'ApiCascader',
    label: '合作单位性质',
    colProps: { span: 7 },
    componentProps: {
      expandTrigger: 'hover',
      childrenFetch: 'children',
      dynamicFetch: false,
      api: dictStore.getDictValueToCode,
      apiParamKey: 'id',
      labelField: 'value',
      valueField: 'id',
      initFetchParams: {
        Code: 'cooperative_unit_nature',
      },
      isLeaf: (record) => {
        return !record.children.length;
      },
    },
  },
  {
    field: 'SubmissionDate',
    label: '提交日期',
    component: 'DatePicker',
    colProps: { span: 7 },
  },
];

export const addFormSchema: FormSchema[] = [
  {
    field: 'id',
    show: false,
    slot: '',
  },
  {
    field: 'RecordYear',
    label: '备案学年',
    component: 'DatePicker',
    required: true,
    componentProps: {
      picker: 'year',
      valueFormat: 'YYYY',
    },
  },
  {
    field: 'SubmissionDate',
    label: '提交日期',
    component: 'Input',
    defaultValue: currentTime.format('YYYY-MM-DD'),
    componentProps: { disabled: true },
  },
  {
    field: 'submitterId',
    label: '提交人',
    component: 'Input',
    defaultValue: getUserInfo?.value?.realName,
    componentProps: { disabled: true },
  },
  {
    field: 'unitName',
    label: '输入企业名称',
    component: 'Input',
    required: true,
  },
  {
    field: 'owningSectorId',
    component: 'ApiCascader',
    label: '所属行业',
    required: true,
    componentProps: {
      expandTrigger: 'hover',
      childrenFetch: 'children',
      dynamicFetch: false,
      initFetchParams: {
        Code: 'owning_sector',
      },
      api: dictStore.getDictValueToCode,
      labelField: 'value',
      valueField: 'id',
      apiParamKey: 'id',
      isLeaf: (record) => {
        return !record.children.length;
      },
    },
  },
  {
    field: 'owningIndustryId',
    label: '所属产业',
    component: 'ApiSelect',
    required: true,
    componentProps: {
      api: dictStore.getDictValueToCode,
      params: { Code: 'owning_industry' },
      labelField: 'value',
      valueField: 'id',
    },
  },
  {
    field: 'professionalCategoryId',
    component: 'ApiCascader',
    label: '对应专业',
    required: true,
    componentProps: {
      expandTrigger: 'hover',
      childrenFetch: 'children',
      dynamicFetch: false,
      api: dictStore.getDictValueToCode,
      apiParamKey: 'id',
      labelField: 'value',
      valueField: 'id',
      initFetchParams: {
        Code: 'professional_category',
      },
      isLeaf: (record) => {
        return !record.children.length;
      },
    },
  },
  {
    field: 'enterpriseCreditCode',
    label: '企业信用代码',
    component: 'Input',
    componentProps: ({ formModel }) => {
      return {
        onblur: (e) => {
          formModel.organizationCode = e.target._value.slice(9, e.target._value.length - 1);
        },
      };
    },
    rules: [
      {
        validator: async (rule, value) => {
          if (!value) {
            return Promise.reject('请输入18位企业信用代码');
          }
          if (value.length !== 18) {
            return Promise.reject('请输入18位企业信用代码');
          }
          return Promise.resolve();
        },
        trigger: 'blur',
      },
    ],
  },
  {
    field: 'organizationCode',
    label: '单位机构代码',
    component: 'Input',
    componentProps: { disabled: true },
  },
  {
    field: 'legalRepresentativeName',
    label: '企业法人名称',
    component: 'Input',
    required: true,
  },
  {
    field: 'unitAreaId',
    component: 'ApiCascader',
    label: '合作单位行政区域',
    required: true,
    componentProps: {
      expandTrigger: 'click',
      childrenFetch: 'children',
      dynamicFetch: false,
      showCheckedStrategy: 'Cascader.SHOW_PARENT',
      api: dictStore.getDictValueToCode,
      apiParamKey: 'id',
      labelField: 'value',
      valueField: 'id',
      initFetchParams: {
        Code: 'unit_area',
      },
      isLeaf: (record) => {
        return !record.children.length;
      },
    },
  },
  {
    field: 'unitAddress',
    label: '单位地址',
    component: 'Input',
    required: true,
  },
  {
    field: 'contactName',
    label: '企业联系人',
    component: 'Input',
    required: true,
  },
  {
    field: 'contactPosition',
    label: '联系人职务',
    component: 'Input',
    required: true,
  },
  {
    field: 'contactPhone',
    label: '联系人电话',
    component: 'InputNumber',
    required: true,
  },
  {
    field: 'cooperativeUnitAttributeIds',
    label: '合作单位属性',
    component: 'ApiSelect',
    required: true,
    componentProps: {
      mode: 'multiple',
      api: dictStore.getDictValueToCode,
      params: { Code: 'cooperative_unit_attribute' },
      labelField: 'value',
      valueField: 'id',
    },
  },
  {
    field: 'cooperativeUnitNatureId',
    component: 'ApiCascader',
    label: '合作单位性质',
    required: true,
    componentProps: {
      expandTrigger: 'hover',
      childrenFetch: 'children',
      dynamicFetch: false,
      api: dictStore.getDictValueToCode,
      apiParamKey: 'id',
      labelField: 'value',
      valueField: 'id',
      initFetchParams: {
        Code: 'cooperative_unit_nature',
      },
      isLeaf: (record) => {
        return !record.children.length;
      },
      onChange: (value, options) => {
        if (options?.label === '企业') {
          falg.value = false;
        } else {
          falg.value = true;
        }
      },
    },
  },
  {
    field: 'cooperativeEnterpriseScaleId',
    label: '企业规模',
    component: 'ApiSelect',
    required: true,
    componentProps: {
      api: dictStore.getDictValueToCode,
      params: { Code: 'cooperative_enterprise_scale' },
      labelField: 'value',
      valueField: 'id',
    },
  },
  {
    field: 'workforce',
    label: '职工人数',
    component: 'InputNumber',
    required: true,
  },
  {
    field: 'isBelisted',
    label: '是否上市',
    component: 'Select',
    required: true,
    componentProps: {
      options: IsOrNo,
    },
  },
  {
    field: 'isNationalTop500',
    label: '是否全国500强',
    component: 'Select',
    componentProps: {
      options: IsOrNo,
      disabled: falg,
    },
  },
  {
    field: 'registeredCapital',
    label: '注册资本',
    component: 'Input',
    required: true,
    suffix: '万元',
  },
  {
    field: 'cooperationNatureId',
    label: '合作性质',
    component: 'ApiSelect',
    required: true,
    componentProps: {
      api: dictStore.getDictValueToCode,
      params: { Code: 'cooperation_nature' },
      labelField: 'value',
      valueField: 'id',
    },
  },
  {
    field: 'enterpriseIntroduction',
    label: '企业慨述',
    component: 'Input',
    required: true,
  },
  {
    field: 'schoolEnterpriseAgreement',
    component: 'Upload',
    label: '校企合作协议',
    slot: 'schoolEnterpriseUpload',
    required: true,
  },
  {
    field: 'writtenReport',
    component: 'Upload',
    label: '考察书面报告',
    slot: 'writtenReportUpload',
    required: true,
  },
];
