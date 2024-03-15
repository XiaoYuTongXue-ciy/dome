// 课表设置
import { defHttp } from '/@/utils/http/axios';

const BASEURL = '/scheduleSetting';

const Api = {
  list: `${BASEURL}/list`,
  detail: `${BASEURL}/getSetListByDetailId`,
  add: `${BASEURL}/add`,
  update: `${BASEURL}/update`,
  delete: `${BASEURL}/delete`,
  batchsave: `${BASEURL}/batchsave`,
};

// 获取列表
export const getList = (params) =>
  defHttp.get({
    url: Api.list,
    params,
  });

// 获取学期排课基本设置列表
export const detail = (params) =>
  defHttp.get({
    // url: Api.detail + `/${id}`,
    url: Api.detail,
    params,
  });

//  新增
export const add = (data) =>
  defHttp.post({
    url: Api.add,
    data,
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

// 保存
export const batchSave = (params) =>
  defHttp.post({
    url: Api.batchsave,
    params,
  });
