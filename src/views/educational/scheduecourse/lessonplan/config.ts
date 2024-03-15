import { BasicColumn, FormSchema } from '@/components/Table';
import { getListInfo as getSchoolListInfo } from '@/api/sysOrg'; // 学校
import { getPageInfo as getClassInfo } from '@/api/classes'; // 班级
import { getPageInfo as getUserInfo } from '@/api/teacher'; // 教师

import { useDictStore } from '@/store/modules/dict.js';

const dictStore = useDictStore();

export const columns: BasicColumn[] = [
  {
    title: '学校',
    dataIndex: 'schoolName',
    width: 200,
  },
  {
    title: '学期',
    dataIndex: 'semester',
    width: 200,
  },
  {
    title: '专业名称',
    dataIndex: 'majorName',
    width: 200,
  },
  {
    title: '课程类别名称',
    dataIndex: 'courseCategoryName',
    width: 100,
  },
  {
    title: '课程名称',
    dataIndex: 'courseName',
    width: 160,
  },
  {
    title: '班级名称',
    dataIndex: 'className',
    width: 160,
  },
  {
    title: '授课老师',
    dataIndex: 'lecturerName',
    width: 100,
  },
  {
    title: '授课开始周数',
    dataIndex: 'startWeekly',
    width: 100,
  },
  {
    title: '授课结束周数',
    dataIndex: 'endWeekly',
    width: 100,
  },
  {
    title: '周课时数',
    dataIndex: 'weeklyClassHours',
    width: 80,
  },
  {
    title: '教室类型',
    dataIndex: 'classRoomTypeName',
    customRender: ({ record }) => {
      if (record.classRoomTypeName?.length > 0) {
        return record.classRoomTypeName.join(' | ');
      } else {
        return record.classRoomTypeName;
      }
    },
    width: 200,
  },
];

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
    slot: 'semester',
  },
  {
    field: 'courseId',
    label: '课程',
    component: 'ApiSelect',
    colProps: { span: 8 },
    slot: 'course',
  },
  {
    field: 'classId',
    label: '班级',
    component: 'ApiSelect',
    colProps: { span: 8 },
    componentProps: {
      showSearch: true,
      optionFilterProp: 'label',
      api: getClassInfo,
      params: { pageSize: 5000 },
      resultField: 'items',
      labelField: 'className',
      valueField: 'id',
    },
  },
  {
    field: 'lecturerId',
    label: '授课老师',
    component: 'ApiSelect',
    colProps: { span: 8 },
    componentProps: {
      showSearch: true,
      optionFilterProp: 'label',
      api: getUserInfo,
      params: { pageSize: 5000 },
      resultField: 'items',
      labelField: 'name',
      valueField: 'id',
    },
  },
  {
    field: 'weeklyClassHours',
    label: '周课时数',
    component: 'InputNumber',
    colProps: { span: 8 },
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
    slot: 'schoolSlot',
    required: true,
  },
  {
    field: 'semesterId',
    label: '学期',
    component: 'ApiSelect',
    required: true,
    slot: 'semSearch',
  },
  {
    field: 'courseId',
    label: '课程',
    component: 'ApiSelect',
    required: true,
    slot: 'courseSearch',
  },
  {
    field: 'majorId',
    label: '专业名称',
    required: true,
    component: 'ApiSelect',
    slot: 'majorSearch',
  },
  {
    field: 'classId',
    label: '班级',
    // required: true,
    component: 'ApiSelect',
    slot: 'classSearch',
  },
  {
    field: 'lecturerId',
    label: '授课老师',
    required: true,
    component: 'ApiSelect',
    slot: 'lecturerSearch',
  },
  {
    field: 'startWeekly',
    label: '授课周次',
    component: 'Input',
    colProps: { span: 14 },
    suffix: '周',
    slot: 'startWeek',
  },
  {
    field: 'endWeekly',
    label: '~',
    component: 'Input',
    colProps: { span: 10 },
    labelWidth: 40,
    suffix: '周',
    slot: 'endWeek',
  },
  {
    field: 'weeklyClassHours',
    label: '每周节数',
    required: true,
    component: 'InputNumber',
  },
  {
    field: 'classRoomType',
    label: '教室类型',
    component: 'ApiSelect',
    componentProps: {
      mode: 'multiple',
      api: dictStore.getDictValueToCode,
      params: { Code: 'class_room_type' },
      labelField: 'value',
      valueField: 'id',
    },
  },
];
