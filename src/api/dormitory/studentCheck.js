// 学生住宿
import { defHttp } from '/@/utils/http/axios';

const BASEURL = '/studentCheckIn';

const Api = {
  list: `${BASEURL}/list`,
  page: `${BASEURL}/page`,
  detail: `${BASEURL}/detail`,
  add: `${BASEURL}/add`,
  update: `${BASEURL}/update`,
  delete: `${BASEURL}/delete`,
};

// 列表页
export const getPageInfo = (data) =>
  defHttp.post({
    url: Api.page,
    data,
  });

// 详情
export const getDetailInfo = (params) => {
  return defHttp.post({
    url: Api.detail,
    params,
  });
};

//  新增
export const add = (data) => {
  return defHttp.post({
    url: Api.add,
    data,
  });
};

//  更新
export const update = (params) => {
  return defHttp.post({
    url: Api.update,
    params,
  });
};

// 删除
export const deleteItem = (params) => {
  return defHttp.post({
    url: Api.delete,
    params,
  });
};
