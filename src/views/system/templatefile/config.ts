/* eslint-disable @typescript-eslint/no-unused-vars */
import { BasicColumn, FormSchema } from '@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '模板名称',
    dataIndex: 'templateName',
    width: 150,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'templateName',
    label: '模板名称',
    colProps: { span: 8 },
    component: 'Input',
  },
];

export const addFormSchema: FormSchema[] = [
  {
    field: 'id',
    show: false,
    slot: '',
  },
  {
    field: 'TemplateName',
    label: '模板名称',
    component: 'Input',
    required: true,
  },
  {
    field: 'TemplateCode',
    label: '模板编码',
    component: 'Input',
    required: true,
  },
  {
    field: 'FileId',
    label: '上传文件',
    component: 'Upload',
    slot: 'fileId',
    required: true,
  },
];
