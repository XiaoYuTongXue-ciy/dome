import { defHttp } from '/@/utils/http/axios';

const BASEURL = '/dBCourses';

const Api = {
  page: `${BASEURL}/page`,
  detail: `${BASEURL}/detail`,
  add: `${BASEURL}/add`,
  update: `${BASEURL}/update`,
  delete: `${BASEURL}/delete`,
  export: `${BASEURL}/export`,
  uploadFile: `${BASEURL}/import`,
  templateFile: '/templateFile/download',
};

// 列表页
export const getPageInfo = (params) =>
  defHttp.post({
    url: Api.page,
    params,
  });

// 详情
export const getDetailInfo = (params) =>
  defHttp.get({
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

// 导出
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
