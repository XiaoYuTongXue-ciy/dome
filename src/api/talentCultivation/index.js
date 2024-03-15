import { defHttp } from '/@/utils/http/axios';

const BASEURL = '/dBTalentDevelopmentPlan';

const Api = {
  list: `${BASEURL}/list`,
  page: `${BASEURL}/page`,
  detail: `${BASEURL}/detail`,
  delete: `${BASEURL}/delete`,
  uploadFile: `${BASEURL}/import`,
  sysFile: '/sysFile/downloadFile',
  majorCategory: '/dBMajor/MajorCategoryPage',
};

// 培养方案列表
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
  defHttp.get({
    url: Api.detail,
    params,
  });

// 删除
export const deleteItem = (params) =>
  defHttp.post({
    url: Api.delete,
    params,
  });

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

// 专业类别分页列表
export const getMajorCategoryPageIofo = (params) =>
  defHttp.post({
    url: Api.majorCategory,
    params,
  });
