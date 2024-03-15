import { defHttp } from '/@/utils/http/axios';

const BASEURL = '/clockingIn';

const Api = {
  page: `${BASEURL}/page`,
  add: `${BASEURL}/add`,
  update: `${BASEURL}/update`,
  delete: `${BASEURL}/delete`,
  detail: `${BASEURL}/detail`,
};

// 考勤管理列表页
export const getPageInfo = (params) =>
  defHttp.post({
    url: Api.page,
    params,
  });

// 考勤信息详情
export const getDetailInfo = (params) =>
  defHttp.get({
    url: Api.detail,
    params,
  });

// 考勤信息 新增
export const add = (params) =>
  defHttp.post({
    url: Api.add,
    params,
  });

// 考勤信息 更新
export const update = (params) =>
  defHttp.post({
    url: Api.update,
    params,
  });

// 考勤信息 删除
export const deleteItem = (params) =>
  defHttp.post({
    url: Api.delete,
    params,
  });

// 考勤信息 删除
export const detail = (params) =>
  defHttp.post({
    url: Api.detail,
    params,
  });
