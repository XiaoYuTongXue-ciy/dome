import { defHttp } from '/@/utils/http/axios';

const BASEURL = '/sysRole';

const Api = {
  page: `${BASEURL}/page`,
  list: `${BASEURL}/list`,
  grantMenu: `${BASEURL}/grantMenu`,
  grantDataScope: `${BASEURL}/grantDataScope`,
  ownMenuList: `${BASEURL}/ownMenuList`,
  ownOrgList: `${BASEURL}/ownOrgList`,
  status: `${BASEURL}/setStatus`,
  add: `${BASEURL}/add`,
  update: `${BASEURL}/update`,
  delete: `${BASEURL}/delete`,
};

// 分页列表
export const getPageInfo = (params) =>
  defHttp.post({
    url: Api.page,
    params,
  });

// 角色列表
export const getRoleList = () => {
  return defHttp.get({
    url: Api.list,
  });
};

// 授权角色菜单
export const grantMenu = (params) =>
  defHttp.post({
    url: Api.grantMenu,
    params,
  });

// 授权角色数据范围
export const grantDataScope = (params) =>
  defHttp.post({
    url: Api.grantDataScope,
    params,
  });

// 菜单Id 集合
export const getOwnMenuList = (params) => {
  return defHttp.get({
    url: Api.ownMenuList,
    params,
  });
};
// 机构Id 集合
export const getOwnOrgList = (params) => {
  return defHttp.get({
    url: Api.ownOrgList,
    params,
  });
};
// 设置角色状态
export const setStatus = (params) =>
  defHttp.post({
    url: Api.status,
    params,
  });

//  新增
export const add = (params) =>
  defHttp.post({
    url: Api.add,
    params,
  });

//  更新
export const update = (params) =>
  defHttp.post({
    url: Api.update,
    params,
  });

// 删除
export const deleteItem = (params) =>
  defHttp.post({
    url: Api.delete,
    params,
  });
