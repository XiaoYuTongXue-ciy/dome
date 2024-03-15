import { BasicColumn, FormSchema } from '@/components/Table';
import { useDictStore } from '@/store/modules/dict.js';

const dictStore = useDictStore();

export const columns: BasicColumn[] = [
  {
    title: '楼栋',
    dataIndex: 'building',
    width: 100,
    sorter: true,
  },
  {
    title: '楼层',
    dataIndex: 'floorNumber',
    width: 100,
    sorter: true,
  },
  {
    title: '房号',
    dataIndex: 'roomNumber',
    width: 100,
    sorter: true,
  },
  {
    title: '宿舍类型',
    dataIndex: 'dormitoryTypeName',
    width: 100,
  },
  {
    title: '容纳人数',
    dataIndex: 'capacity',
    width: 100,
  },
  {
    title: '现容纳人数  ',
    dataIndex: 'nowCapacity',
    width: 100,
  },
  {
    title: '备注',
    dataIndex: 'remark',
    width: 100,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'building',
    label: '楼栋',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    field: 'floorNumber',
    label: '楼层',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    field: 'roomNumber',
    label: '房间号',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    field: 'dormitoryTypeId',
    label: '宿舍类型',
    component: 'ApiSelect',
    colProps: { span: 6 },
    componentProps: {
      api: dictStore.getDictValueToCode,
      params: { Code: 'dormitory_type' },
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
    field: 'building',
    label: '楼栋',
    component: 'Input',
    required: true,
    colProps: { span: 15 },
  },
  {
    field: 'floorNumber',
    label: '楼层',
    required: true,
    component: 'Input',
    colProps: { span: 15 },
  },
  {
    field: 'roomNumber',
    label: '房号',
    required: true,
    component: 'Input',
    colProps: { span: 15 },
  },
  {
    field: 'capacity',
    label: '容纳人数',
    required: true,
    component: 'InputNumber',
    colProps: { span: 15 },
  },
  {
    field: 'dormitoryTypeId',
    label: '宿舍类型',
    required: true,
    component: 'ApiSelect',
    colProps: { span: 15 },
    componentProps: {
      api: dictStore.getDictValueToCode,
      params: { Code: 'dormitory_type' },
      labelField: 'value',
      valueField: 'id',
    },
  },
  {
    field: 'remark',
    label: '备注',
    required: true,
    defaultValue: '无',
    component: 'Input',
    colProps: { span: 15 },
  },
];
