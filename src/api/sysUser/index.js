import { defHttp } from '/@/utils/http/axios';

const BASEURL = '/sysUser';

const Api = {
  page: `${BASEURL}/page`,
  baseInfo: `${BASEURL}/baseInfo`,
  setStatus: `${BASEURL}/setStatus`,
  grantRole: `${BASEURL}/grantRole`,
  changePwd: `${BASEURL}/changePwd`,
  resetPwd: `${BASEURL}/resetPwd`,
  ownRoleList: `${BASEURL}/ownRoleList`,
  ownExtOrgList: `${BASEURL}/ownExtOrgList`,
  add: `${BASEURL}/add`,
  update: `${BASEURL}/update`,
  delete: `${BASEURL}/delete`,
};

// 列表页
export const getPageInfo = (params) =>
  defHttp.post({
    url: Api.page,
    params,
  });

// 用户基本信息
export const getBaseInfo = () => {
  defHttp.get({
    url: Api.baseInfo,
  });
};

// 设置用户状态
export const setStatus = (id, status) =>
  defHttp.post({
    url: Api.setStatus,
    params: { id, status },
  });

// 授权用户角色
export const grantRole = (params) =>
  defHttp.post({
    url: Api.grantRole,
    params,
  });

// 修改用户密码
export const changePwd = (params) =>
  defHttp.post({
    url: Api.changePwd,
    params,
  });
// 重置用户密码
export const resetPwd = (params) =>
  defHttp.post({
    url: Api.resetPwd,
    params,
  });
// 获取用户拥有角色集合
export const getOwnRoleList = (id) =>
  defHttp.get({
    url: Api.ownRoleList + `/${id}`,
  });

// 获取用户扩展机构合集
export const getOwnExtOrgList = (id) =>
  defHttp.get({
    url: Api.ownExtOrgList + `/${id}`,
  });

// 增加用户
export const add = (params) =>
  defHttp.post({
    url: Api.add,
    params,
  });
// 更新用户
export const update = (params) =>
  defHttp.post({
    url: Api.update,
    params,
  });
// 删除用户
export const deleteItem = (params) =>
  defHttp.post({
    url: Api.delete,
    params,
  });
