import { FormSchema, BasicColumn } from '@/components/Table';

export const formSchema: FormSchema[] = [
  {
    field: 'id',
    show: false,
    slot: '',
  },
  {
    field: 'isCancelConflict',
    label: ' 是否取消冲突',
    defaultValue: false,
    component: 'RadioGroup',
    componentProps: {
      options: [
        {
          label: '排课要求发生冲实时，允许逐渐取消相关要求，直至把课排完。',
          value: true,
        },
        {
          label: '即使排课要求冲实，也不要取消相关要求，没排完的课留待后面手动安排',
          value: false,
        },
      ],
    },
  },
  {
    field: 'isTeacherBalance',
    label: '是否课程连堂',
    // required: true,
    component: 'RadioGroup',
    defaultValue: false,
    componentProps: {
      options: [
        {
          label: '教师当天的课程尽量安排在一个上午或一个下午完成',
          value: true,
        },
        {
          label: '教师当天的课程上午、下午均衡安排',
          value: false,
        },
      ],
    },
  },
  {
    field: 'isClassBalance',
    label: '是否同时安排',
    defaultValue: false,
    component: 'Checkbox',
    renderComponentContent: '允许同班同课程同一天上、下午可同時安排',
  },
  {
    field: 'isCancelCourseSchedule',
    label: '取消禁排要求',
    defaultValue: false,
    component: 'Checkbox',
    colProps: {
      span: 8,
    },
    renderComponentContent: '取消课程禁排',
  },
  {
    field: 'isCancelTeacherSchedule',
    label: ' ',
    defaultValue: false,
    component: 'Checkbox',
    colProps: {
      span: 8,
    },
    renderComponentContent: '取消教师禁排',
  },
  {
    field: 'isCancelClassRoomSchedule',
    label: ' ',
    defaultValue: false,
    component: 'Checkbox',
    colProps: {
      span: 8,
    },
    renderComponentContent: '取消场地禁排',
  },
  {
    field: 'isCancelMaxCourseSchedule',
    label: ' ',
    // labelWidth: 1,
    defaultValue: false,
    component: 'Checkbox',
    colProps: {
      span: 8,
    },
    renderComponentContent: '取消学科同时段最大安排数',
  },
  {
    field: 'isCancelSpecialSchedule',
    label: ' ',
    defaultValue: false,
    component: 'Checkbox',
    colProps: {
      span: 8,
    },
    renderComponentContent: '取消特殊排课条件',
  },
];

export const columns: BasicColumn[] = [
  {
    title: '教师',
    dataIndex: 'teacherName',
    width: 160,
  },
  {
    title: '特殊排课要求',
    dataIndex: 'schedule',
    width: 160,
    customRender: ({ record }) => {
      if (record.schedule === 1) {
        return `每周最多连续上课： ${record.numder} 天`;
      } else if (record.schedule === 2) {
        return `第${record.slot}节课最多上：${record.numder}次`;
      } else if (record.schedule === 3) {
        return `每天最多连续上课：${record.numder} 节`;
      }
    },
  },
];
