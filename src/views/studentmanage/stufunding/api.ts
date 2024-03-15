import { defHttp } from '@/utils/http/axios';

const BASEURL = '/studentFunding';
const FUNDURL = '/funding';

const Api = {
  page: `${BASEURL}/page`,
  list: `${BASEURL}/list`,
  detail: `${BASEURL}/detail`,
  add: `${BASEURL}/add`,
  update: `${BASEURL}/update`,
  delete: `${BASEURL}/delete`,
  export: `${BASEURL}/export`,
  uploadFile: `${BASEURL}/import`,
  templateFile: '/templateFile/download',
};

const fundApi = {
  getList: `${FUNDURL}/page`,
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
  console.log('uploadApi', params);
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

export const getFundList = (data) =>
  defHttp.post({
    url: fundApi.getList,
    data,
  });
