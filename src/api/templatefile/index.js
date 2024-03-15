import { defHttp } from '/@/utils/http/axios';

const BASEURL = '/templateFile';

const Api = {
  page: `${BASEURL}/page`,
  add: `${BASEURL}/add`,
  detail: `${BASEURL}/detail`,
  update: `${BASEURL}/update`,
  delete: `${BASEURL}/delete`,
  uploadFile: `${BASEURL}/import`,
  download: `${BASEURL}/download`,
  sysFile: '/sysFile/downloadFile',
}; // semestervalue

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
  return defHttp.post({
    url: Api.detail,
    params,
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

// 模板
export const getTemplateFile = (params) => {
  return defHttp.get(
    {
      url: Api.templateFile,
      params,
      responseType: 'blob',
    },
    { errorMessageMode: 'none', isTransformResponse: false },
  );
};

// 下载
export const getSysFile = (params) => {
  return defHttp.post(
    {
      url: Api.sysFile,
      params,
      responseType: 'blob',
    },
    { errorMessageMode: 'none', isTransformResponse: false },
  );
};

//  新增
export const uploadApi = (params, onUploadProgress) => {
  return defHttp.uploadFile(
    {
      url: `${BASEURL}/add`,
      onUploadProgress,
    },
    params,
  );
};
