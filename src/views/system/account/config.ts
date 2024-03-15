import { h } from 'vue';
import { Switch } from 'ant-design-vue';
import { BasicColumn, FormSchema } from '@/components/Table';
import { accountOptions, accountMap } from './utils';
import { setStatus } from '@/api/sysUser';
import { getRoleList } from '@/api/role'; // 角色
import { getListInfo as getOrgList } from '@/api/sysOrg'; // 机构
import { getListInfo as getPosList } from '@/api/sysPos'; // 职位
import { useMessage } from '@/hooks/web/useMessage';

export const columns: BasicColumn[] = [
  {
    title: '头像',
    dataIndex: 'avatar',
    width: 80,
  },
  {
    title: '账户',
    dataIndex: 'account',
    width: 100,
  },
  {
    title: '姓名',
    dataIndex: 'realName',
    width: 100,
  },
  {
    title: '手机号',
    dataIndex: 'phone',
    width: 140,
  },
  {
    title: '账户类型',
    dataIndex: 'accountType',
    width: 120,
    customRender: ({ record }) => {
      return record?.accountType ? accountMap[record?.accountType] : '';
    },
  },
  {
    title: '角色集合',
    dataIndex: 'roleName',
    width: 180,
  },
  {
    title: '所属部门',
    dataIndex: 'orgName',
    width: 160,
  },
  {
    title: '职位名称',
    dataIndex: 'posName',
    width: 100,
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 100,
    customRender: ({ record }) => {
      if (!Reflect.has(record, 'pendingStatus')) {
        record.pendingStatus = false;
      }
      return h(Switch, {
        checked: record.status === 1,
        checkedChildren: '启用',
        unCheckedChildren: '停用',
        loading: record.pendingStatus,
        onChange(checked) {
          record.pendingStatus = true;
          const newStatus = checked ? 1 : 2;
          const { createMessage } = useMessage();
          setStatus(record.id, newStatus)
            .then(() => {
              record.status = newStatus;
              createMessage.success(`已成功修改角色状态`);
            })
            .catch(() => {
              createMessage.error('修改角色状态失败');
            })
            .finally(() => {
              record.pendingStatus = false;
            });
        },
      });
    },
  },
  {
    title: '备注',
    dataIndex: 'remark',
    width: 100,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'orgId',
    label: '所属部门',
    component: 'ApiTreeSelect',
    componentProps: {
      api: getOrgList,
      labelField: 'name',
      valueField: 'id',
    },
    colProps: { span: 6 },
  },
  {
    field: 'account',
    label: '账号',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    field: 'realName',
    label: '真实姓名',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    field: 'phone',
    label: '手机号',
    component: 'Input',
    colProps: { span: 6 },
    componentProps: {
      maxLength: 11,
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
    field: 'account',
    label: '账户名称',
    component: 'Input',
    required: true,
    colProps: { span: 20 },
  },
  {
    field: 'accountType',
    label: '账户类型',
    required: true,
    component: 'Select',
    componentProps: {
      options: accountOptions,
    },
    colProps: { span: 20 },
  },
  {
    field: 'realName',
    label: '真实姓名',
    required: true,
    component: 'Input',
    colProps: { span: 20 },
  },
  {
    field: 'nickName',
    label: '昵称',
    component: 'Input',
    colProps: { span: 20 },
  },
  {
    field: 'phone',
    label: '手机号',
    component: 'Input',
    componentProps: {
      maxLength: 11,
    },
    colProps: { span: 20 },
  },
  {
    field: 'roleIdList',
    label: '角色集合',
    required: true,
    component: 'ApiSelect',
    componentProps: {
      api: getRoleList,
      mode: 'multiple',
      resultField: 'result',
      labelField: 'name',
      valueField: 'id',
    },
    colProps: { span: 20 },
  },
  {
    field: 'email',
    label: '邮箱',
    component: 'Input',
    colProps: { span: 20 },
  },
  {
    field: 'orderNo',
    label: '排序',
    required: true,
    component: 'InputNumber',
    colProps: { span: 20 },
  },
  {
    field: 'orgId',
    label: '所属部门',
    component: 'ApiTreeSelect',
    componentProps: {
      api: getOrgList,
      labelField: 'name',
      valueField: 'id',
    },
    required: true,
    colProps: { span: 20 },
  },
  {
    field: 'posId',
    label: '职位',
    required: true,
    component: 'ApiSelect',
    componentProps: {
      api: getPosList,
      resultField: 'items',
      labelField: 'name',
      valueField: 'id',
    },
    colProps: { span: 20 },
  },
  {
    field: 'remark',
    label: '备注',
    required: true,
    defaultValue: '无',
    component: 'Input',
    colProps: { span: 20 },
  },
  {
    field: 'divider',
    label: '附属部门',
    component: 'Divider',
    componentProps: {
      orientation: 'center',
    },
  },
  {
    field: '0',
    component: 'Input',
    label: ' ',
    slot: 'add',
  },
];
