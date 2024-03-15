import { defHttp } from '/@/utils/http/axios';

const BASEURL = '/MonthlyWork';

const Api = {
  list: `${BASEURL}/list`,
  page: `${BASEURL}/page`,
  detail: `${BASEURL}/detail`,
  add: `${BASEURL}/add`,
  update: `${BASEURL}/update`,
  delete: `${BASEURL}/delete`,
  export: `${BASEURL}/export`,
};

// 月度工作安排列表
export const getListInfo = () =>
  defHttp.get({
    url: Api.list,
  });
// 分页列表
export const getPageInfo = (params) =>
  defHttp.post({
    url: Api.page,
    params,
  });

// 详情
export const getDetailInfo = (params) =>
  defHttp.post({
    url: Api.detail,
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
// 导出列表信息
export const getExport = (params) => {
  return defHttp.post(
    {
      url: Api.export,
      params,
      responseType: 'blob',
    },
    { errorMessageMode: 'none', isTransformResponse: false },
  );
};
