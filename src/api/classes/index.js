import { defHttp } from '/@/utils/http/axios';

const BASEURL = '/dBClassInformation';

const Api = {
  page: `${BASEURL}/page`,
  list: `${BASEURL}/list`,
  detail: `${BASEURL}/detail`,
  add: `${BASEURL}/add`,
  update: `${BASEURL}/update`,
  delete: `${BASEURL}/delete`,
  classbyMajorList: `${BASEURL}/classbyMajorList`,
};

// 列表页
export const getPageInfo = (data) =>
  defHttp.post({
    url: Api.page,
    data,
  });

// 列表页
export const getListInfo = (data) =>
  defHttp.get({
    url: Api.list,
    data,
  });

// 详情
export const getDetailInfo = (params) => {
  return defHttp.get({
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

// 获取班级信息表列表
export const getClassByMajorList = () =>
  defHttp.get({
    url: Api.classbyMajorList,
  });
