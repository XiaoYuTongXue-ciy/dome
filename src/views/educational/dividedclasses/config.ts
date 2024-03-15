import { h } from 'vue';
import { Tag } from 'ant-design-vue';
import { BasicColumn, FormSchema } from '@/components/Table';
import { getDictValueByCode } from '@/api/sysDict/dictType';
import { getPageInfo as getMajorPageInfo } from '@/api/major'; // 专业
import { getPageInfo as getSchoolPageInfo } from '@/api/sysOrg'; // 学校
import { genderOptions, genderMap, YesOrNo } from './utils';
import { useDictStore } from '@/store/modules/dict.js';

const dictStore = useDictStore();

export const columns: BasicColumn[] = [
  {
    title: '报名编号',
    dataIndex: 'id',
    width: 100,
  },
  {
    title: '报名类型',
    dataIndex: 'enrollmenType',
    width: 100,
  },
  {
    title: '报名时间',
    dataIndex: 'enrollmenTime',
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
    title: '中考总分',
    dataIndex: 'examgrades',
    width: 100,
  },
  {
    title: '生源地',
    dataIndex: 'placeOriginStudents',
    width: 120,
  },
  {
    title: '毕业学校',
    dataIndex: 'juniorHighSchool',
    width: 180,
  },
  {
    title: '报到专业',
    dataIndex: 'registeredMajor',
    width: 180,
  },
  {
    title: '毕业学校地区',
    dataIndex: 'juniorHighSchoolAreaValue',
    customRender: ({ record }) => {
      const cities = record?.juniorHighSchoolAreaValue || [];
      return cities.join('/');
    },
    width: 150,
  },
  {
    title: '第一志愿',
    dataIndex: 'enrollmentMajorOne',
    width: 150,
  },
  {
    title: '第二志愿',
    dataIndex: 'enrollmentMajorTwo',
    width: 150,
  },
  {
    title: '第三志愿',
    dataIndex: 'enrollmentMajorThree',
    width: 150,
  },
  {
    title: '是否住宿',
    dataIndex: 'isAccommodation',
    customRender: ({ record }) => {
      return record?.isAccommodation ? '是' : '否';
    },
    width: 80,
  },
  {
    title: '是否往届生',
    dataIndex: 'isPastStudents',
    customRender: ({ record }) => {
      return record?.isPastStudents ? '是' : '否';
    },
    width: 100,
  },
  {
    title: '是否服从调剂',
    dataIndex: 'isAcceptTransfer',
    customRender: ({ record }) => {
      return record?.isAcceptTransfer ? '是' : '否';
    },
    width: 100,
  },
  {
    title: '状态',
    dataIndex: 'auditStatus',
    customRender: ({ record }) => {
      const allCheckIn = record.auditStatus;
      const enable = allCheckIn === '已审核';
      const color = enable ? 'green' : 'red';
      return h(Tag, { color: color }, () => allCheckIn);
    },
    width: 80,
  },
  {
    title: '备注',
    dataIndex: 'remark',
    width: 100,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'gradeId',
    label: '年级',
    component: 'ApiSelect',
    colProps: { span: 7 },
    componentProps: {
      api: getDictValueByCode,
      params: { Code: 'grade' },
      labelField: 'value',
      valueField: 'id',
    },
  },
  {
    field: 'id',
    label: '报名编号',
    colProps: { span: 7 },
    component: 'InputNumber',
  },
  {
    field: 'Name',
    label: '姓名',
    colProps: { span: 7 },
    component: 'Input',
  },
  {
    field: 'gender',
    label: '性别',
    colProps: { span: 7 },
    component: 'Select',
    componentProps: {
      options: genderOptions,
    },
  },
  {
    field: 'startExamgrades',
    label: '分数开始区间',
    component: 'InputNumber',
    colProps: { span: 7 },
  },
  {
    field: 'endExamgrades',
    label: '分数结束区间',
    component: 'InputNumber',
    colProps: { span: 7 },
  },
  {
    field: '[startEnrollmenTime, endEnrollmenTime]',
    label: '报名时间',
    component: 'RangePicker',
    colProps: { span: 7 },
    componentProps: {
      placeholder: ['开始时间', '结束时间'],
    },
  },
  {
    field: '[startAuditTime, endAuditTime]',
    label: '审核时间',
    component: 'RangePicker',
    colProps: { span: 7 },
    componentProps: {
      placeholder: ['开始时间', '结束时间'],
    },
  },
  {
    field: 'juniorHighSchoolArea',
    component: 'ApiCascader',
    label: '毕业学校地区',
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
        Code: 'unit_area',
      },
      isLeaf: (record) => {
        return !record.children.length;
      },
    },
  },
  {
    field: 'enrollmenTypeId',
    label: '报名类型',
    component: 'ApiSelect',
    colProps: { span: 7 },
    componentProps: {
      api: dictStore.getDictValueToCode,
      params: { Code: 'enrollment_type' },
      labelField: 'value',
      valueField: 'id',
    },
  },
  {
    field: 'isAcceptTransfer',
    label: '是否服从调剂',
    component: 'ApiSelect',
    colProps: { span: 7 },
    componentProps: {
      options: YesOrNo,
    },
  },
  {
    field: 'juniorHighSchool',
    label: '毕业学校',
    colProps: { span: 7 },
    component: 'Input',
  },
  {
    field: 'isAccommodation',
    label: '是否住宿',
    component: 'ApiSelect',
    colProps: { span: 7 },
    componentProps: {
      options: YesOrNo,
    },
  },
  {
    field: 'majorId',
    label: '报名专业',
    component: 'ApiSelect',
    colProps: { span: 7 },
    componentProps: {
      api: getMajorPageInfo,
      resultField: 'items',
      labelField: 'majorName',
      valueField: 'id',
    },
  },
  {
    field: 'registeredMajorId',
    label: '报到专业',
    component: 'ApiSelect',
    colProps: { span: 7 },
    componentProps: {
      api: getMajorPageInfo,
      resultField: 'items',
      labelField: 'majorName',
      valueField: 'id',
    },
  },
  {
    field: 'isPastStudents',
    label: '是否往届生',
    component: 'ApiSelect',
    colProps: { span: 7 },
    componentProps: {
      options: YesOrNo,
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
    field: 'schoolId',
    label: '学校名称',
    component: 'ApiSelect',
    required: true,
    colProps: { span: 15 },
    componentProps: {
      api: getSchoolPageInfo,
      resultField: 'items',
      labelField: 'name',
      valueField: 'id',
    },
  },
  {
    field: 'gradeId',
    label: '年级',
    component: 'ApiSelect',
    required: true,
    colProps: { span: 15 },
    componentProps: {
      api: getDictValueByCode,
      params: { Code: 'grade' },
      labelField: 'value',
      valueField: 'id',
    },
  },
  {
    field: 'enrollmenTypeId',
    label: '报名类型',
    required: true,
    component: 'ApiSelect',
    colProps: { span: 15 },
    componentProps: {
      api: dictStore.getDictValueToCode,
      params: { Code: 'enrollment_type' },
      labelField: 'value',
      valueField: 'id',
    },
  },
  {
    field: 'name',
    component: 'Input',
    label: '姓名',
    required: true,
    colProps: { span: 15 },
  },
  {
    field: 'gender',
    label: '性别',
    component: 'Select',
    required: true,
    colProps: { span: 15 },
    componentProps: {
      options: genderOptions,
    },
  },
  {
    field: 'documentTypeId',
    label: '证件类型',
    required: true,
    component: 'ApiSelect',
    colProps: { span: 15 },
    componentProps: {
      api: dictStore.getDictValueToCode,
      params: { Code: 'document_type' },
      labelField: 'value',
      valueField: 'id',
    },
  },
  {
    field: 'idCardNumber',
    label: '身份证号',
    component: 'Input',
    required: true,
    colProps: { span: 15 },
    componentProps: {
      maxlength: 18,
    },
  },
  {
    field: 'politicalProfileId',
    component: 'ApiSelect',
    label: '政治面貌',
    required: true,
    colProps: { span: 15 },
    componentProps: {
      api: dictStore.getDictValueToCode,
      params: { Code: 'political_profile' },
      labelField: 'value',
      valueField: 'id',
    },
  },
  {
    field: 'ethnicGroupId',
    component: 'ApiSelect',
    label: '民族',
    required: true,
    colProps: { span: 15 },
    componentProps: {
      api: dictStore.getDictValueToCode,
      params: { Code: 'ethnic_group' },
      labelField: 'value',
      valueField: 'id',
    },
  },
  {
    field: 'examRegistrationNumber',
    label: '中考报名号',
    component: 'Input',
    colProps: { span: 15 },
    required: true,
  },
  {
    field: 'admissionTicketNumber',
    label: '准考证号',
    component: 'Input',
    colProps: { span: 15 },
    required: true,
  },
  {
    field: 'isPastStudents',
    label: '是否往届生',
    component: 'ApiSelect',
    required: true,
    colProps: { span: 15 },
    componentProps: {
      options: YesOrNo,
    },
  },
  {
    field: 'enrollmenTime',
    label: '报名时间',
    component: 'DatePicker',
    required: true,
    colProps: { span: 15 },
  },
  {
    field: 'examinationTypeId',
    component: 'ApiSelect',
    label: '考试类型',
    required: true,
    colProps: { span: 15 },
    componentProps: {
      api: dictStore.getDictValueToCode,
      params: { Code: 'examination_type' },
      labelField: 'value',
      valueField: 'id',
    },
  },
  {
    field: 'juniorHighSchool',
    label: '毕业学校',
    component: 'Input',
    required: true,
    colProps: { span: 15 },
  },
  {
    field: 'juniorHighSchoolArea',
    component: 'ApiCascader',
    label: '毕业学校地区',
    colProps: { span: 15 },
    required: true,
    componentProps: {
      expandTrigger: 'hover',
      childrenFetch: 'children',
      optionLabelProp: 'children',
      dynamicFetch: false,
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
    field: 'examgrades',
    label: '中考分数',
    component: 'InputNumber',
    required: true,
    colProps: { span: 15 },
  },
  {
    field: 'isAccommodation',
    label: '是否住宿',
    component: 'ApiSelect',
    required: true,
    colProps: { span: 15 },
    componentProps: {
      options: YesOrNo,
    },
  },
  {
    field: 'isAcceptTransfer',
    label: '是否服从调剂',
    component: 'ApiSelect',
    required: true,
    colProps: { span: 15 },
    componentProps: {
      options: YesOrNo,
    },
  },
  {
    field: 'language',
    label: '语文',
    component: 'InputNumber',
    colProps: { span: 15 },
  },
  {
    field: 'math',
    label: '数学',
    component: 'InputNumber',
    colProps: { span: 15 },
  },
  {
    field: 'english',
    label: '英语',
    component: 'InputNumber',
    colProps: { span: 15 },
  },
  {
    field: 'physicsAndChemistry',
    label: '物理、化学',
    component: 'InputNumber',
    colProps: { span: 15 },
  },
  {
    field: 'moralityAndRulelaw',
    label: '道德与法治',
    component: 'InputNumber',
    colProps: { span: 15 },
  },
  {
    field: 'physicalEducation',
    label: '体育',
    component: 'InputNumber',
    colProps: { span: 15 },
  },
  {
    field: 'experimentalOperation',
    label: '物化生实验操作',
    component: 'InputNumber',
    colProps: { span: 15 },
  },
  {
    field: 'otherAchievements',
    label: '其他成绩',
    component: 'InputNumber',
    colProps: { span: 15 },
  },
  {
    field: 'homeAddress',
    label: '家庭地址',
    component: 'Input',
    colProps: { span: 15 },
  },
  {
    field: 'placeOriginStudentsId',
    component: 'ApiSelect',
    label: '生源地',
    colProps: { span: 15 },
    required: true,
    componentProps: {
      api: dictStore.getDictValueToCode,
      params: { Code: 'place_origin_students' },
      labelField: 'value',
      valueField: 'id',
    },
  },
  {
    field: 'height',
    label: '身高(CM)',
    component: 'InputNumber',
    colProps: { span: 15 },
  },
  {
    field: 'weight',
    label: '体重(KG)',
    component: 'InputNumber',
    colProps: { span: 15 },
  },
  {
    field: 'postalCode',
    label: '邮政编码',
    component: 'Input',
    colProps: { span: 15 },
  },
  {
    field: 'contactPhone',
    label: '联系电话',
    component: 'Input',
    colProps: { span: 15 },
  },
  {
    field: 'qq',
    label: 'QQ',
    component: 'Input',
    colProps: { span: 15 },
  },
  {
    field: 'wechat',
    label: '微信',
    component: 'Input',
    colProps: { span: 15 },
  },
  {
    field: 'familyName',
    label: '家长姓名',
    component: 'Input',
    colProps: { span: 15 },
  },
  {
    field: 'familyPhone',
    label: '家长电话',
    component: 'Input',
    colProps: { span: 15 },
  },
  {
    field: 'enrollmentMajorOneId',
    label: '第一志愿专业',
    component: 'ApiSelect',
    required: true,
    colProps: { span: 15 },
    componentProps: {
      api: getMajorPageInfo,
      resultField: 'items',
      labelField: 'majorName',
      valueField: 'id',
    },
  },
  {
    field: 'enrollmentMajorTwoId',
    label: '第二志愿专业',
    required: true,
    component: 'ApiSelect',
    colProps: { span: 15 },
    componentProps: {
      api: getMajorPageInfo,
      resultField: 'items',
      labelField: 'majorName',
      valueField: 'id',
    },
  },
  {
    field: 'enrollmentMajorThreeId',
    label: '第三志愿专业',
    component: 'ApiSelect',
    required: true,
    colProps: { span: 15 },
    componentProps: {
      api: getMajorPageInfo,
      resultField: 'items',
      labelField: 'majorName',
      valueField: 'id',
    },
  },
  {
    field: 'diplomaNumber',
    label: '毕业证号',
    component: 'Input',
    colProps: { span: 15 },
  },
  {
    field: 'pastGraduatesCategoryId',
    component: 'ApiSelect',
    label: '往届生类别',
    required: true,
    colProps: { span: 15 },
    componentProps: {
      api: dictStore.getDictValueToCode,
      params: { Code: 'category_past_graduates' },
      labelField: 'value',
      valueField: 'id',
    },
  },
  {
    field: 'examineeCategoryId',
    component: 'ApiSelect',
    label: '考生类别',
    required: true,
    colProps: { span: 15 },
    componentProps: {
      api: dictStore.getDictValueToCode,
      params: { Code: 'examinee_category' },
      labelField: 'value',
      valueField: 'id',
    },
  },

  {
    field: 'auditStatusId',
    component: 'ApiSelect',
    label: '审核状态',
    required: true,
    colProps: { span: 15 },
    componentProps: {
      api: dictStore.getDictValueToCode,
      params: { Code: 'audit_status' },
      labelField: 'value',
      valueField: 'id',
    },
  },
  {
    field: 'registeredMajorId',
    label: '报到专业',
    component: 'ApiSelect',
    colProps: { span: 15 },
    required: true,
    componentProps: {
      api: getMajorPageInfo,
      resultField: 'items',
      labelField: 'majorName',
      valueField: 'id',
    },
  },
  {
    field: 'auditTime',
    label: '审核时间',
    required: true,
    component: 'DatePicker',
    colProps: { span: 15 },
  },
  {
    field: 'understandChannel',
    label: '了解我校渠道',
    component: 'Input',
    colProps: { span: 15 },
  },
  {
    field: 'otherChannel',
    label: '其他渠道了解学校',
    component: 'Input',
    colProps: { span: 15 },
  },
  {
    field: 'referrerName',
    label: '推荐人姓名',
    component: 'Input',
    colProps: { span: 15 },
  },
  {
    field: 'referrerPhone',
    label: '推荐人联系方式',
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

// 分班
export const schemas: FormSchema[] = [
  {
    field: 'schoolId',
    label: '学校名称',
    component: 'ApiSelect',
    required: true,
    colProps: { span: 24 },
    componentProps: {
      api: getSchoolPageInfo,
      resultField: 'items',
      labelField: 'name',
      valueField: 'id',
    },
  },
  {
    field: 'gradeId',
    label: '年级',
    component: 'ApiSelect',
    required: true,
    colProps: { span: 24 },
    componentProps: {
      api: getDictValueByCode,
      params: { Code: 'grade' },
      labelField: 'value',
      valueField: 'id',
    },
  },
  {
    field: 'majorId',
    label: '报名专业',
    component: 'ApiSelect',
    required: true,
    colProps: { span: 24 },
    componentProps: {
      api: getMajorPageInfo,
      resultField: 'items',
      labelField: 'majorName',
      valueField: 'id',
    },
  },

  {
    field: 'isSequences',
    label: '成绩分班',
    component: 'Checkbox',
    colProps: { span: 10 },
    helpMessage: ['默认以审核顺序分班'],
  },
];
