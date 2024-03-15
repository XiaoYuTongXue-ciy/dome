import { BasicColumn } from '@/components/Table';
import { h } from 'vue';
import { Tag } from 'ant-design-vue';

export interface TabItem {
  key: string;
  name: string;
  component: string;
}

export const tabList: TabItem[] = [
  {
    key: 'class',
    name: '班级固排禁排',
    component: 'ClassSetting',
  },
  {
    key: 'teacher',
    name: '教师固排禁排',
    component: 'Teacher',
  },
  {
    key: 'classroom',
    name: '教室固排禁排',
    component: 'Classroom',
  },
  {
    key: 'subject',
    name: '学科固排禁排',
    component: 'Subject',
  },
];

export const columns: BasicColumn[] = [
  {
    title: '课程名',
    dataIndex: 'courseName',
    width: 160,
  },
  {
    title: '班级',
    dataIndex: 'className',
    width: 100,
  },
  {
    title: '教师',
    dataIndex: 'lecturerName',
    width: 100,
  },
  {
    title: '未排节数',
    dataIndex: 'unarrangedNum',
    width: 100,
    customRender: ({ record }) => {
      return h(Tag, { color: 'red' }, () => record.unarrangedNum);
    },
  },
  {
    title: '已排节数',
    dataIndex: 'arrangedNum',
    width: 100,
    customRender: ({ record }) => {
      return h(Tag, { color: 'green' }, () => record.arrangedNum);
    },
  },
  {
    title: '周上课节数',
    dataIndex: 'weeklyClassHours',
    width: 100,
  },
];
