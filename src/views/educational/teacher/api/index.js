import { defHttp } from '/@/utils/http/axios';

const BASEURL = '/teacher';

const Api = {
  page: `${BASEURL}/page`,
  list: `${BASEURL}/list`,
  add: `${BASEURL}/add`,
  update: `${BASEURL}/update`,
  delete: `${BASEURL}/delete`,
  detail: `${BASEURL}/detail`,
  uploadAvatar: `/sysFile/uploadFile`,
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

// 上传头像

export const getuploadAvatar = (params, onUploadProgress) => {
  return defHttp.uploadFile(
    {
      url: `/sysFile/uploadFile`,
      onUploadProgress,
    },
    params,
  );
};
