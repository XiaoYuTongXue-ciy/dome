import { defHttp } from '@/utils/http/axios';

const BASEURL = '/stuGrade';

const GREADURL = '/gradeSetting';
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
  publish: `${BASEURL}/publicUpdate`,
  examine: `${BASEURL}/examine`,
};

const gradeApi = {
  page: `${GREADURL}/page`,
};

// 成绩设置列表
export const getGradeSetting = (data) =>
  defHttp.post({
    url: gradeApi.page,
    data,
  });

// 审核发布
export const publishRelease = (data) =>
  defHttp.post({
    url: Api.publish,
    data,
  });

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
  return defHttp.uploadFile(
    {
      url: Api.uploadFile,
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

// 审核
export const examineGrade = (params) => {
  return defHttp.post({
    url: Api.examine,
    params,
  });
};
