import { defHttp } from '/@/utils/http/axios';

const BASEURL = '/sysPos';

const Api = {
  list: `${BASEURL}/list`,
  add: `${BASEURL}/add`,
  undata: `${BASEURL}/undata`,
  delete: `${BASEURL}/delete`,
};

// 职位列表
export const getListInfo = () =>
  defHttp.get({
    url: Api.list,
  });

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
