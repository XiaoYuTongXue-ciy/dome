// 教师特殊排课要求
import { defHttp } from '/@/utils/http/axios';

const BASEURL = '/teacherSchedule';

const Api = {
  list: `${BASEURL}/list`,
  page: `${BASEURL}/page`,
  detail: `${BASEURL}/detail`,
  add: `${BASEURL}/add`,
  // update: `${BASEURL}/update`,
  batchSave: `${BASEURL}/batchSave`,
  delete: `${BASEURL}/delete`,
};

// 获取列表
export const getList = (params) =>
  defHttp.get({
    url: Api.list,
    params,
  });

// 获取分页列表
export const getPageInfo = (data) =>
  defHttp.post({
    url: Api.page,
    data,
  });

// 获取详情
export const detail = (params) =>
  defHttp.get({
    url: Api.detail,
    params,
  });

//  新增
export const add = (data) =>
  defHttp.post({
    url: Api.add,
    data,
  });

// 保存
export const batchSave = (params) =>
  defHttp.post({
    url: Api.batchSave,
    params,
  });

// 删除
export const deleteItem = (params) =>
  defHttp.post({
    url: Api.delete,
    params,
  });
