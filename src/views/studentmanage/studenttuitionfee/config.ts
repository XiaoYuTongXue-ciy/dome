import { BasicColumn, FormSchema } from '@/components/Table';
import { getPageInfo as getMajorPageInfo } from '@/api/major'; // 专业
import { getPageInfo as classesgetPageInfo } from '@/api/classes'; // 班级
// import { getPageInfo as stugetPageInfo } from '@/api/stuInfo'; // 学生
// import { getTuitionfeeList } from './api'; // 费用接口

import { useDictStore } from '@/store/modules/dict.js';
// import { searchParams, onSearch } from '@/utils/Search';

import { getListInfo as getSchoolListInfo } from '@/api/sysOrg'; // 学校

const dictStore = useDictStore();

export const columns: BasicColumn[] = [
  {
    title: '姓名',
    dataIndex: 'studentName',
    width: 100,
  },
  {
    title: '学号',
    dataIndex: 'studentNumber',
    width: 100,
  },
  {
    title: '班级',
    dataIndex: 'className',
    width: 70,
  },
  {
    title: '费用名称',
    dataIndex: 'tuitionfeeName',
    width: 130,
  },
  {
    title: '总金额',
    dataIndex: 'tuitionfeeAmount',
    width: 100,
  },
  {
    title: '是否欠费',
    dataIndex: 'isArrearage',
    width: 80,
    customRender: ({ record }) => {
      return record?.isArrearage ? '是' : '否';
    },
  },
  {
    title: '待缴金额',
    dataIndex: 'arrearageAmount',
    width: 100,
  },
  {
    title: '已缴金额',
    dataIndex: 'paymentAmount',
    width: 100,
  },
  {
    title: '专业',
    dataIndex: 'majorName',
    width: 130,
  },
  {
    title: '年级',
    dataIndex: 'grade',
    width: 100,
  },
];

export const detailInfoColumns: BasicColumn[] = [
  {
    title: '金额',
    dataIndex: 'amount',
    width: 100,
  },
  {
    title: '缴费时间',
    dataIndex: 'createTime',
    width: 100,
  },
  {
    title: '备注',
    dataIndex: 'remark',
    width: 100,
  },
];

// 查询
export const searchFormSchema: FormSchema[] = [
  {
    field: 'schoolId',
    label: '学校',
    component: 'ApiSelect',
    colProps: { span: 8 },
    componentProps: {
      api: getSchoolListInfo,
      showSearch: true,
      optionFilterProp: 'label',
      resultField: 'items',
      labelField: 'name',
      valueField: 'id',
    },
  },
  {
    field: 'studentName',
    label: '姓名',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'studentnumber',
    label: '学号',
    component: 'InputNumber',
    colProps: { span: 8 },
  },
  {
    field: 'isArrearage',
    label: '是否欠费',
    component: 'Select',
    componentProps: {
      options: [
        {
          label: '是',
          value: true,
          key: '1',
        },
        {
          label: '否',
          value: false,
          key: '2',
        },
      ],
    },
    colProps: { span: 8 },
  },
  {
    field: '[startTime,endTime]',
    label: '缴费时间',
    component: 'RangePicker',
    colProps: { span: 8 },
    componentProps: {
      placeholder: ['开始时间', '结束时间'],
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
      showSearch: true,
      optionFilterProp: 'label',
      labelField: 'value',
      valueField: 'id',
    },
  },
  {
    field: 'majorId',
    label: '专业',
    component: 'ApiSelect',
    colProps: { span: 8 },
    componentProps: {
      api: getMajorPageInfo,
      showSearch: true,
      optionFilterProp: 'label',
      resultField: 'items',
      labelField: 'majorName',
      valueField: 'id',
    },
  },
  {
    field: 'classId',
    label: '班级',
    component: 'ApiSelect',
    colProps: { span: 8 },
    componentProps: {
      api: classesgetPageInfo,
      showSearch: true,
      optionFilterProp: 'label',
      resultField: 'items',
      labelField: 'className',
      valueField: 'id',
    },
  },
];

// 新增 编辑
export const addFormSchema: FormSchema[] = [
  {
    field: 'id',
    show: false,
    slot: '',
  },
  {
    field: 'studentId',
    label: '姓名',
    component: 'ApiSelect',
    required: true,
    slot: 'Student',
  },
  {
    field: 'tuitionfeeId',
    label: '费用项目',
    component: 'ApiSelect',
    required: true, // 是否必填
    slot: 'tuition',
  },
  {
    field: 'amount',
    label: '缴费金额',
    component: 'InputNumber',
    required: true, // 是否必填
    defaultValue: 0,
    rules: [
      {
        required: true,
        validator: async (rule, value) => {
          if (!value) {
            return Promise.reject('缴费金额不能为零或空');
          }
          if (!new RegExp(/^[0-9]+(.[0-9]{1,2})?$/).test(value)) {
            return Promise.reject('小数点最多两位');
          }
          return Promise.resolve();
        },
        trigger: 'change',
      },
    ],
    componentProps: {
      prefix: '¥',
      formatter: (value) => `${value}`.replace(/B(?=(d{3})+(?!d))/g, ','),
      style: 'width:100%',
    },
    // renderComponentContent: () => {
    //   return {
    //     prefix: () => '¥',
    //   };
    // },
  },
  {
    field: 'remark',
    label: '备注',
    component: 'InputTextArea',
  },
];
