/* eslint-disable @typescript-eslint/no-unused-vars */
import { BasicColumn, FormSchema } from '@/components/Table';
import { useDictStore } from '@/store/modules/dict.js';

const dictStore = useDictStore();
export const columns: BasicColumn[] = [
  {
    title: '教室楼栋',
    dataIndex: 'building',
    width: 150,
  },
  {
    title: '教室楼层',
    dataIndex: 'floorNumber',
    width: 180,
  },
  {
    title: '教室号',
    dataIndex: 'classRoomNumber',
    width: 100,
  },
  {
    title: '教室详情',
    dataIndex: 'classRoomDetail',
    width: 120,
  },
  {
    title: '容纳人数',
    dataIndex: 'capacity',
    width: 120,
  },
  {
    title: '教室类型',
    dataIndex: 'classRoomTypeName',
    width: 120,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'building',
    label: '教室楼栋',
    component: 'Input',
    colProps: { span: 7 },
  },
  {
    field: 'floorNumber',
    label: '教室楼层',
    component: 'Input',
    colProps: { span: 7 },
  },
  {
    field: 'classRoomNumber',
    label: '教室号',
    component: 'Input',
    colProps: { span: 7 },
  },
  {
    field: 'capacity',
    label: '容纳人数',
    component: 'Input',
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
    field: 'building',
    label: '教室楼栋',
    component: 'Input',
    required: true,
  },
  {
    field: 'floorNumber',
    label: '教室楼层',
    component: 'Input',
    required: true,
  },
  {
    field: 'classRoomNumber',
    label: '教室号',
    component: 'Input',
    required: true,
  },
  {
    field: 'capacity',
    label: '容纳人数',
    component: 'Input',
    required: true,
  },
  {
    field: 'classRoomTypeId',
    label: '教室类型',
    component: 'ApiSelect',
    required: true,
    componentProps: {
      api: dictStore.getDictValueToCode,
      params: { Code: 'class_room_type' },
      labelField: 'value',
      valueField: 'id',
    },
  },
];
