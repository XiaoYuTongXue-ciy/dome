import { BasicColumn, FormSchema } from '/@/components/Table';

export const columns: BasicColumn[] = [
  // 序号、开始时间、结束时间、发起人、综合签到率
  {
    title: '开始时间',
    dataIndex: 'clockingInStartTime',
  },
  {
    title: '结束时间',
    dataIndex: 'clockingInEndTime',
  },
  {
    title: '发起人',
    dataIndex: 'initiatorName',
  },
  {
    title: '发起人',
    dataIndex: 'initiatorId',
    ifShow: false,
  },
  {
    title: '综合签到率',
    dataIndex: 'signInRate',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: '[checkInStartTime, checkInEndTime]',
    label: '起始时间',
    component: 'RangePicker',
    componentProps: {
      'show-time': true,
    },
    colProps: { span: 7 },
  },
  {
    field: 'initiatorId',
    label: '发起人',
    component: 'Input',
    helpMessage: ['支持输入搜索'],
    slot: 'localSearch',
    colProps: { span: 6 },
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'id',
    ifShow: false,
  },
  {
    field: 'clockingInStartTime',
    label: '开始时间',
    required: true,
    component: 'DatePicker',
    componentProps: {
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
      showTime: true,
      style: { width: '100%' },
    },
  },
  {
    field: 'clockingInEndTime',
    label: '结束时间',
    required: true,
    component: 'DatePicker',
    componentProps: {
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
      showTime: true,
      style: { width: '100%' },
    },
  },
  {
    field: 'initiatorId',
    label: '发起人',
    required: true,
    helpMessage: ['支持输入搜索'],
    slot: 'localSearch',
    component: 'Select',
    componentProps: {
      formatter: (value: string) => (!value ? '' : value),
    },
  },
];

export const detailInfoColumns: BasicColumn[] = [
  {
    title: '年级',
    dataIndex: 'grade',
  },
  {
    title: '班级名称',
    dataIndex: 'classname',
  },
];
export const detailInfoChildColumns: BasicColumn[] = [
  {
    title: '姓名',
    dataIndex: 'name',
  },
  {
    title: '签到状态',
    dataIndex: 'status',
    editRow: true,
    editComponent: 'Switch',
    editValueMap: (value) => {
      return value ? '已签' : '未签';
    },
  },
];
