import { defHttp } from '@/utils/http/axios';

const BASEURL = '/eduResources';

const Api = {
  page: `${BASEURL}/page`,
  list: `${BASEURL}/list`,
  detail: `${BASEURL}/get`,
  add: `${BASEURL}/add`,
  update: `${BASEURL}/update`,
  delete: `${BASEURL}/delete`,
  export: `${BASEURL}/export`,
  uploadFile: `${BASEURL}/import`,
  sysFile: '/sysFile/downloadFile',
  templateFile: '/templateFile/download',
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
export const add = (params) => {
  return defHttp.uploadFile(
    {
      url: Api.add,
    },
    params,
  );
};

//  更新
export const update = (params) => {
  return defHttp.uploadFile(
    {
      url: Api.update,
    },
    params,
  );
};

// 删除
export const deleteItem = (params) => {
  return defHttp.post({
    url: Api.delete,
    params,
  });
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

// 导入
export const uploadApi = (params, onUploadProgress) => {
  return defHttp.uploadFile(
    {
      url: `${BASEURL}/import`,
      onUploadProgress,
    },
    params,
  );
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
