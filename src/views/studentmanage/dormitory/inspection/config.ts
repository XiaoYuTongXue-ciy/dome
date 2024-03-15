import { ref, h } from 'vue';
import { Tag } from 'ant-design-vue';
import { BasicColumn, FormSchema } from '@/components/Table';
import { getPageInfo as getStudentPageInfo } from '@/api/dormitory/studentCheck'; // 学生
import { getPageInfo as getDormitoryPageInfo } from '@/api/dormitory'; // 宿舍
import { dormitoryParams, onDormitorySearch } from './utils';

const studentOptions = ref([]);
export const columns: BasicColumn[] = [
  {
    title: '查寝时间',
    dataIndex: 'inspectionTime',
    width: 180,
    sorter: true,
  },
  {
    title: '宿舍',
    dataIndex: 'dormitoryDetail',
    width: 160,
  },
  {
    title: '是否全到',
    dataIndex: 'isBatchInDormitory',
    customRender: ({ record }) => {
      const allCheckIn = record.isBatchInDormitory;
      const enable = allCheckIn === '是';
      const color = enable ? 'green' : 'red';
      return h(Tag, { color: color }, () => allCheckIn);
    },
    width: 80,
  },
  {
    title: '在寝人数',
    dataIndex: 'inDormitoryStudents',
    customRender: ({ record }) => {
      return record.inDormitoryStudents?.length + '人';
    },
    width: 120,
  },
  {
    title: '请假人数',
    dataIndex: 'askForLeaveStudents',
    customRender: ({ record }) => {
      return record.askForLeaveStudents ? record.askForLeaveStudents?.length + '人' : '0人';
    },
    width: 120,
  },
  {
    title: '缺寝人数',
    dataIndex: 'notInDormitoryStudents',
    customRender: ({ record }) => {
      return record.notInDormitoryStudents ? record.notInDormitoryStudents?.length + '人' : '0人';
    },
    width: 120,
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
    field: 'building',
    label: '楼栋',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'floorNumber',
    label: '楼层',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'roomNumber',
    label: '房号',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: '[startCheckInTime, endCheckInTime]',
    label: '查寝时间',
    component: 'RangePicker',
    colProps: { span: 8 },
    componentProps: {
      'show-time': true,
      placeholder: ['开始日期', '结束日期'],
    },
  },
];

// 新增
export const formSchema: FormSchema[] = [
  {
    field: 'id',
    show: false,
    slot: '',
  },
  {
    field: 'dormitoryId',
    label: '宿舍',
    component: 'ApiSelect',
    required: true,
    colProps: { span: 15 },
    componentProps: {
      showSearch: true,
      filterOption: false,
      api: getDormitoryPageInfo,
      resultField: 'items',
      params: dormitoryParams,
      onInput: onDormitorySearch,
      labelField: 'dormitoryDetail',
      valueField: 'id',
      onChange: async (e, v) => {
        const params = {
          building: v.building,
          floorNumber: v.floorNumber,
          roomNumber: v.roomNumber,
        };
        const data = await getStudentPageInfo(params);
        studentOptions.value = data.items.map((item) => {
          return {
            label: item?.studentName,
            value: item?.studentId,
          };
        });
      },
    },
  },
  {
    field: 'inspectionTime',
    label: '查寝日期',
    colProps: { span: 15 },
    component: 'DatePicker',
    required: true,
    componentProps: {
      'show-time': true,
      // 'default-value': dayjs(),
    },
  },
  {
    field: 'isBatchInDormitory',
    label: '是否全勤',
    component: 'Checkbox',
    componentProps: ({ formModel, formActionType }) => {
      return {
        onChange: async (e: any) => {
          const checked = e.target.checked;
          const { updateSchema } = formActionType;
          if (checked) {
            formModel.notInDormitoryStudentIds = undefined;
            formModel.askForLeaveStudentIds = undefined;
            updateSchema([
              {
                field: 'notInDormitoryStudentIds',
                componentProps: {
                  disabled: true,
                },
              },
              {
                field: 'askForLeaveStudentIds',
                componentProps: {
                  disabled: true,
                },
              },
            ]);
          } else {
            updateSchema([
              {
                field: 'notInDormitoryStudentIds',
                componentProps: {
                  disabled: false,
                  options: studentOptions,
                  mode: 'multiple',
                },
              },
              {
                field: 'askForLeaveStudentIds',
                componentProps: {
                  disabled: false,
                  options: studentOptions,
                  mode: 'multiple',
                },
              },
            ]);
          }
        },
      };
    },
  },
  {
    field: 'notInDormitoryStudentIds',
    label: '缺寝学生',
    component: 'Select',
    colProps: { span: 15 },
    componentProps: {
      options: studentOptions,
      mode: 'multiple',
    },
  },
  {
    field: 'askForLeaveStudentIds',
    label: '请假学生',
    component: 'ApiSelect',
    colProps: { span: 15 },
    componentProps: {
      options: studentOptions,
      mode: 'multiple',
    },
  },

  {
    field: 'remark',
    label: '备注',
    required: true,
    defaultValue: '无',
    colProps: { span: 15 },
    component: 'Input',
  },
];
export const detailInfoChildColumns: BasicColumn[] = [
  {
    title: '在寝学生',
    dataIndex: 'checkInStudents',
    customRender: ({ record }) => {
      let checkInStudents = '';
      if (!record.inDormitoryStudents) {
        checkInStudents = '无';
      } else {
        checkInStudents = record.inDormitoryStudents.map((item) => item.studentName).join('、');
      }
      return (record.checkInStudents = checkInStudents);
    },
    width: 120,
  },
  {
    title: '请假学生',
    dataIndex: 'leaveStudents',
    customRender: ({ record }) => {
      let leaveStudents = '';
      if (!record.askForLeaveStudents || record.askForLeaveStudents.length === 0) {
        leaveStudents = '无';
      } else {
        leaveStudents = record.askForLeaveStudents.map((item) => item.studentName).join('、');
      }
      return (record.leaveStudents = leaveStudents);
    },
    width: 120,
  },
  {
    title: '缺勤学生',
    dataIndex: 'noInStudents',
    customRender: ({ record }) => {
      let noInStudents = '';
      if (!record.notInDormitoryStudents || record.notInDormitoryStudents.length === 0) {
        noInStudents = '无';
      } else {
        noInStudents = record.notInDormitoryStudents.map((item) => item.studentName).join('、');
      }
      return (record.noInStudents = noInStudents);
    },
    width: 120,
  },
];
