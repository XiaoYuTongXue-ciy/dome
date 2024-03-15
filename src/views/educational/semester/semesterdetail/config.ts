import { BasicColumn, FormSchema } from '@/components/Table';
import { getListInfo as getSchoolListInfo } from '@/api/sysOrg'; // 学校
import { getDictValueByCode } from '@/api/sysDict/dictType';

import { debounce } from 'lodash-es';
import { computed, unref, ref } from 'vue';

export const columns: BasicColumn[] = [
  {
    title: '学校名称',
    dataIndex: 'schoolName',
    width: 200,
    key: 'schoolName',
  },
  {
    title: '学期',
    dataIndex: 'semester',
    key: 'semester',
    width: 200,
  },
  {
    title: '教学周数',
    dataIndex: 'teachingWeeks',
    width: 100,
  },
  {
    title: '学期开始时间',
    dataIndex: 'schoolOpeningTime',
    width: 200,
    sorter: true,
  },
  {
    title: '学期结束时间',
    dataIndex: 'holidayTime',
    width: 200,
  },
  {
    title: '日上课节数',
    dataIndex: 'lessonNumber',
    width: 120,
  },
  {
    title: '上课时间',
    dataIndex: 'classTimeInfos',
    key: 'classTimeInfos',
    customRender: ({ record }) => {
      return record.classTimeInfos.map((item) => {
        return (item.info = item.description + '：' + item.goClassTime + '~' + item.classOverTime);
      });
    },
    width: 120,
  },
  {
    title: '月度工作安排',
    dataIndex: 'monthlyWorkInfos',
    key: 'monthlyWorkInfos',
    customRender: ({ record }) => {
      return record.monthlyWorkInfos.map((item) => {
        return (item.info = item.monthly + '：' + item.workDescription);
      });
    },
    width: 120,
  },
  {
    title: '学期详情',
    dataIndex: 'title',
    width: 260,
    ellipsis: false,
  },
  {
    title: '说明',
    dataIndex: 'description',
    width: 120,
  },
  {
    title: '备注',
    dataIndex: 'remark',
    width: 120,
  },
];

const keyword = ref<string>('');
export const searchParams = computed<Recordable<string | number>>(() => {
  return { dictTypeCode: 'semester', name: unref(keyword), pageSize: 5000 };
});

export const onSearch = debounce((e) => {
  keyword.value = e.target._value;
}, 500);

export const searchFormSchema: FormSchema[] = [
  {
    field: 'schoolId',
    label: '学校名称',
    component: 'ApiSelect',
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
    colProps: { span: 8 },
    componentProps: {
      api: getDictValueByCode,
      params: { Code: 'semester', pageSize: 5000 },
      showSearch: true,
      optionFilterProp: 'label',
      resultField: 'items',
      labelField: 'value',
      valueField: 'id',
    },
  },
  {
    field: 'lessonNumber',
    label: '日上课节数',
    component: 'InputNumber',
    componentProps: {
      min: 0,
      placeholder: '请输入',
    },
    colProps: { span: 8 },
  },
  {
    field: 'schoolOpeningTime',
    label: '学期开始时间',
    colProps: { span: 8 },
    component: 'DatePicker',
    componentProps: {
      'show-time': true,
    },
  },
  {
    field: 'holidayTime',
    label: '学期结束时间',
    colProps: { span: 8 },
    component: 'DatePicker',
    componentProps: {
      'show-time': true,
    },
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'id',
    show: false,
    slot: '',
  },
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
    componentProps: {
      api: getDictValueByCode,
      params: { Code: 'semester', pageSize: 5000 },
      showSearch: true,
      optionFilterProp: 'label',
      resultField: 'items',
      labelField: 'value',
      valueField: 'id',
    },
  },
  {
    field: 'title',
    label: '学期详情',
    required: true,
    component: 'Input',
    componentProps: {
      placeholder: '例：xxx学校:20xx-20xx学年度第x学期',
    },
  },
  {
    field: 'schoolOpeningTime',
    label: '学期开始时间',
    required: true,
    component: 'DatePicker',
    componentProps: {
      'show-time': true,
    },
  },
  {
    field: 'holidayTime',
    label: '学期结束时间',
    required: true,
    component: 'DatePicker',
    componentProps: {
      'show-time': true,
    },
  },
  {
    field: 'daysPerWeek',
    label: '周上课天数',
    required: true,
    component: 'InputNumber',
    componentProps: {
      min: 0,
      placeholder: '请输入',
    },
  },
  {
    field: 'description',
    label: '说明',
    required: true,
    component: 'InputTextArea',
    componentProps: {
      placeholder: '请输入',
      rows: 4,
    },
  },
  {
    field: 'remark',
    label: '备注',
    component: 'Input',
    required: true,
    defaultValue: '无',
  },
];
