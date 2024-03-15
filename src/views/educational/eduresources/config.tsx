import { BasicColumn, FormSchema } from '@/components/Table';
import { onlinePreview } from '@/utils/file/preview';

import { getPageInfo as getMajorPageInfo } from '@/api/major'; // 专业
import { getPageInfo as getCoursePageInfo } from '@/api/course';
import { getListInfo as getSchoolListInfo } from '@/api/sysOrg'; // 学校
import { getPageInfo as getUserList } from '@/api/sysUser';

export const columns: BasicColumn[] = [
  {
    title: '专业',
    dataIndex: 'majorName',
    width: 100,
  },
  {
    title: '年级',
    dataIndex: 'grade',
    width: 100,
  },
  {
    title: '科目',
    dataIndex: 'courseName',
    width: 100,
  },
  {
    title: '教案',
    dataIndex: 'eduResourcesName',
    width: 100,
  },
  {
    title: '教案备注',
    dataIndex: 'remark',
    width: 100,
  },
  {
    title: '创建人',
    dataIndex: 'createUserName',
    width: 100,
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    width: 100,
  },
  {
    title: '教案文件',
    width: 150,
    helpMessage: '点击文件可预览',
    customRender: ({ record }) => {
      const { fileName, suffix, url } = record.fileInfo;
      return (
        <a style="text-decoration: underline;" onClick={() => onlinePreview(url)}>
          {fileName + suffix}
        </a>
      );
    },
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'majorId',
    label: '专业',
    colProps: { span: 7 },
    component: 'ApiSelect',
    componentProps: {
      api: getMajorPageInfo,
      showSearch: true,
      optionFilterProp: 'label',
      params: { page: 0, pageSize: 1000 },
      resultField: 'items',
      labelField: 'majorName',
      valueField: 'id',
    },
  },
  {
    field: 'gradeId',
    label: '年级',
    colProps: { span: 7 },
    component: 'ApiSelect',
    componentProps: {
      api: getSchoolListInfo,
      params: 'schoolName',
      labelField: 'name',
      valueField: 'id',
    },
  },
  {
    field: 'coursesId',
    label: '课程名',
    colProps: { span: 7 },
    component: 'ApiSelect',
    componentProps: {
      api: getCoursePageInfo,
      showSearch: true,
      optionFilterProp: 'label',
      params: { page: 0, pageSize: 1000 },
      resultField: 'items',
      labelField: 'courseName',
      valueField: 'id',
    },
  },
  {
    field: 'eduResourcesName',
    label: '教案名',
    colProps: { span: 7 },
    component: 'Input',
  },
  {
    field: 'createUserId',
    label: '创建人',
    colProps: { span: 7 },
    component: 'ApiSelect',
    componentProps: {
      api: getUserList,
      showSearch: true,
      optionFilterProp: 'label',
      params: { page: 0, pageSize: 10000 },
      resultField: 'items',
      labelField: 'realName',
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
    field: 'eduResourcesName',
    label: '教案名称',
    component: 'Input',
  },
  {
    field: 'remark',
    label: '教案备注',
    component: 'InputTextArea',
  },
  {
    field: '',
    component: 'Upload',
    label: '上传',
    slot: 'upload',
  },
];
