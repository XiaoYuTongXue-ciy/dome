import { BasicColumn, FormSchema } from '@/components/Table';
import { useDictStore } from '@/store/modules/dict.js';
import { genderOptions, genderMap } from './utils';

const dictStore = useDictStore();

export const columns: BasicColumn[] = [
  {
    dataIndex: 'id',
    ifShow: false,
  },
  {
    title: '工号',
    dataIndex: 'jobNumber',
    width: 100,
  },
  {
    title: '姓名',
    dataIndex: 'name',
    width: 100,
  },
  {
    title: '性别',
    dataIndex: 'gender',
    width: 50,
    customRender: ({ record }) => {
      return record?.gender ? genderMap[record?.gender] : '';
    },
  },
  {
    title: '最高学历',
    dataIndex: 'highestEducationValue',
    customRender: ({ record }) => {
      const cities = record?.highestEducationValue || [];
      return cities.join('/');
    },
    width: 100,
  },
  {
    title: '最高学历院校',
    dataIndex: 'highestEducationOrganization',
    width: 100,
  },
  {
    title: '现任岗位类别',
    dataIndex: 'currentJobCategory',
    width: 150,
  },
  {
    title: '现任岗位等级',
    dataIndex: 'currentJoblevel',
    width: 150,
  },
  {
    title: '教职工类别',
    dataIndex: 'facultyCategoryValue',
    customRender: ({ record }) => {
      const cities = record?.facultyCategoryValue || [];
      return cities.join('/');
    },
    width: 100,
  },
  {
    title: '聘用类型',
    dataIndex: 'employmentCategory',
    width: 150,
  },
  {
    title: '政治面貌',
    dataIndex: 'politicalProfile',
    width: 150,
  },
  {
    title: '移动电话',
    dataIndex: 'mobileTelephone',
    width: 100,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'name',
    label: '姓名',
    colProps: { span: 6 },
    component: 'Input',
  },
  {
    field: 'jobNumber',
    label: '工号',
    colProps: { span: 6 },
    component: 'Input',
  },
  {
    field: 'gender',
    label: '性别',
    colProps: { span: 6 },
    component: 'Select',
    componentProps: {
      options: genderOptions,
    },
  },
  {
    field: 'jobNumber',
    label: '移动电话',
    colProps: { span: 6 },
    component: 'Input',
  },
  {
    field: 'employmentCategoryId',
    label: '聘请类别',
    component: 'ApiSelect',
    colProps: { span: 6 },
    componentProps: {
      api: dictStore.getDictValueToCode,
      params: { Code: 'employment_category' },
      labelField: 'value',
      valueField: 'id',
    },
  },
  {
    field: 'currentStateId',
    label: '当前状态',
    component: 'ApiSelect',
    colProps: { span: 6 },
    componentProps: {
      api: dictStore.getDictValueToCode,
      params: { Code: 'current_state' },
      labelField: 'value',
      valueField: 'id',
    },
  },
  {
    field: 'currentJobCategoryId',
    label: '现任岗位类别',
    component: 'ApiSelect',
    colProps: { span: 6 },
    componentProps: {
      api: dictStore.getDictValueToCode,
      params: { Code: 'current_post_category' },
      labelField: 'value',
      valueField: 'id',
    },
  },
  {
    field: 'highestDegreelevelId',
    label: '最高学位层次',
    component: 'ApiSelect',
    colProps: { span: 6 },
    componentProps: {
      api: dictStore.getDictValueToCode,
      params: { Code: 'highest_degree_level' },
      labelField: 'value',
      valueField: 'id',
    },
  },
  {
    field: 'highestEducation',
    label: '最高学历',
    component: 'ApiCascader',
    colProps: { span: 6 },
    componentProps: {
      api: dictStore.getDictValueToCode,
      initFetchParams: {
        Code: 'highest_education',
      },
      dynamicFetch: false,
      expandTrigger: 'hover',
      childrenField: 'children',
      labelField: 'value',
      valueField: 'id',
      isLeaf: (record) => {
        return !record.children.length;
      },
    },
  },
  {
    field: 'currentJoblevelId',
    label: '岗位等级',
    component: 'ApiSelect',
    colProps: { span: 6 },
    componentProps: {
      api: dictStore.getDictValueToCode,
      params: { Code: 'current_post_level' },
      labelField: 'value',
      valueField: 'id',
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
    field: 'jobNumber',
    label: '工号',
    required: true,
    colProps: { span: 15 },
    component: 'Input',
    componentProps: {
      maxlength: 18,
    },
  },
  {
    field: 'name',
    label: '姓名',
    required: true,
    colProps: { span: 15 },
    component: 'Input',
  },
  {
    field: 'avatar',
    label: '选择照片',
    slot: 'avatar',
    required: true,
    component: 'CropperAvatar',
  },
  {
    field: 'gender',
    label: '性别',
    required: true,
    colProps: { span: 15 },
    component: 'Select',
    componentProps: {
      options: genderOptions,
    },
  },
  {
    field: 'birthDate',
    label: '出生日期',
    component: 'DatePicker',
    required: true,
    colProps: { span: 15 },
  },

  {
    field: 'serviceYearMonth',
    label: '参加工作年月',
    component: 'DatePicker',
    required: true,
    colProps: { span: 15 },
  },
  {
    field: 'teachingyear',
    label: '从教年月',
    component: 'DatePicker',
    required: true,
  },
  {
    field: 'arrivalDate',
    label: '来校年月',
    component: 'DatePicker',
    required: true,
  },
  {
    field: 'appointmentPost',
    label: '聘任岗位',
    component: 'Input',
    required: true,
  },
  {
    field: 'ethnicGroupId',
    component: 'ApiSelect',
    label: '民族',
    required: true,
    componentProps: {
      api: dictStore.getDictValueToCode,
      params: { Code: 'ethnic_group' },
      labelField: 'value',
      valueField: 'id',
    },
  },
  {
    field: 'documentTypeId',
    label: '证件类型',
    required: true,
    component: 'ApiSelect',
    componentProps: {
      api: dictStore.getDictValueToCode,
      params: { Code: 'document_type' },
      labelField: 'value',
      valueField: 'id',
    },
  },
  {
    field: 'certificateNumber',
    label: '身份证号',
    component: 'InputNumber',
    required: true,
    componentProps: {
      maxlength: 18,
    },
  },
  {
    field: 'mobileTelephone',
    label: '联系电话',
    component: 'InputNumber',
    componentProps: {
      maxlength: 11,
    },
  },
  {
    field: 'politicalProfileId',
    component: 'ApiSelect',
    label: '政治面貌',
    required: true,
    componentProps: {
      api: dictStore.getDictValueToCode,
      params: { Code: 'political_profile' },
      labelField: 'value',
      valueField: 'id',
    },
  },
  {
    field: 'highestEducation',
    label: '最高学历',
    component: 'ApiCascader',
    required: true,
    componentProps: {
      api: dictStore.getDictValueToCode,
      initFetchParams: {
        Code: 'highest_education',
      },
      dynamicFetch: false,
      expandTrigger: 'hover',
      childrenField: 'children',
      labelField: 'value',
      valueField: 'id',
      isLeaf: (record) => {
        return !record.children.length;
      },
    },
  },
  {
    field: 'highestDegreelevelId',
    label: '最高学位',
    component: 'ApiSelect',
    required: true,
    componentProps: {
      api: dictStore.getDictValueToCode,
      params: { Code: 'highest_degree_level' },
      labelField: 'value',
      valueField: 'id',
    },
  },
  {
    field: 'highestDegreeMajorsStudied',
    label: '最高学位专业',
    component: 'Input',
    required: true,
  },
  {
    field: 'highestDegreeOrganization',
    label: '最高学位院校',
    component: 'Input',
    required: true,
  },
  {
    field: 'highestEducationMajorsStudied',
    label: '最高学历专业',
    component: 'Input',
    required: true,
  },
  {
    field: 'highestEducationOrganization',
    label: '最高学历院校',
    component: 'Input',
    required: true,
  },

  {
    field: 'teacherTypeId',
    label: '教师类型',
    component: 'ApiSelect',
    required: true,
    componentProps: {
      api: dictStore.getDictValueToCode,
      params: { Code: 'teacher_type' },
      labelField: 'value',
      valueField: 'id',
    },
  },
  {
    field: 'currentStateId',
    label: '当前状态',
    component: 'ApiSelect',
    required: true,
    componentProps: {
      api: dictStore.getDictValueToCode,
      params: { Code: 'current_state' },
      labelField: 'value',
      valueField: 'id',
    },
  },
  {
    field: 'onDutySituationId',
    label: '在岗情况',
    component: 'ApiSelect',
    required: true,
    componentProps: {
      api: dictStore.getDictValueToCode,
      params: { Code: 'in_service_situation' },
      labelField: 'value',
      valueField: 'id',
    },
  },

  {
    field: 'facultySourceId',
    label: '教职工来源',
    component: 'ApiSelect',
    required: true,
    componentProps: {
      api: dictStore.getDictValueToCode,
      params: { Code: 'faculty_source' },
      labelField: 'value',
      valueField: 'id',
    },
  },
  {
    field: 'employmentCategoryId',
    label: '聘请类别',
    component: 'ApiSelect',
    required: true,
    componentProps: {
      api: dictStore.getDictValueToCode,
      params: { Code: 'employment_category' },
      labelField: 'value',
      valueField: 'id',
    },
  },
  {
    field: 'facultyCategory',
    label: '教职工类别',
    component: 'ApiCascader',
    required: true,
    componentProps: {
      api: dictStore.getDictValueToCode,
      initFetchParams: {
        Code: 'faculty_category',
      },
      dynamicFetch: false,
      expandTrigger: 'hover',
      childrenField: 'children',
      apiParamKey: 'id',
      labelField: 'value',
      valueField: 'id',
      isLeaf: (record) => {
        return !record.children.length;
      },
    },
  },
  {
    field: 'currentJobCategoryId',
    label: '现任岗位类别',
    component: 'ApiSelect',
    required: true,
    componentProps: {
      api: dictStore.getDictValueToCode,
      params: { Code: 'current_post_category' },
      labelField: 'value',
      valueField: 'id',
    },
  },
  {
    field: 'currentJoblevelId',
    label: '岗位等级',
    component: 'ApiSelect',
    required: true,
    componentProps: {
      api: dictStore.getDictValueToCode,
      params: { Code: 'current_post_level' },
      labelField: 'value',
      valueField: 'id',
    },
  },
  {
    field: 'jobCategoryId',
    label: '兼任岗位类别',
    component: 'ApiSelect',
    componentProps: {
      api: dictStore.getDictValueToCode,
      params: { Code: 'part_time_job_category' },
      labelField: 'value',
      valueField: 'id',
    },
  },
  {
    field: 'legalRepresentativeNameId',
    label: '兼任岗位等级',
    component: 'ApiSelect',
    componentProps: {
      api: dictStore.getDictValueToCode,
      params: { Code: 'current_post_level' },
      labelField: 'value',
      valueField: 'id',
    },
  },
];
