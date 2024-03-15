// 排课服务
import { defHttp } from '/@/utils/http/axios';

const BASEURL = '/schedulingCourse';

const Api = {
  list: `${BASEURL}/list`,
  totalList: `${BASEURL}/getListByTotal`,
  autoSchedue: `${BASEURL}/autoSchedue`,
  manualSchedue: `${BASEURL}/manualSchedue`,
  batchDelete: `${BASEURL}/batchDelete`,
  download: `${BASEURL}/exportBySchedue`,
  downloadTotal: `${BASEURL}/exportBySchedueTotal`,
  getAutoList: `${BASEURL}/GetAutoList`, // 手动排课获取已排课课表
};

// 获取课表
export const getList = (params) =>
  defHttp.get({
    url: Api.list,
    params,
  });
// 获取总课表
export const getTotalList = (params) =>
  defHttp.get({
    url: Api.totalList,
    params,
  });
// 自动排课
export const autoSchedue = (data) =>
  defHttp.post({
    url: Api.autoSchedue,
    data,
  });
// 手动排课
export const manualSchedue = (data) =>
  defHttp.post({
    url: Api.manualSchedue,
    data,
  });

// 导出课表
export const getExportSchedue = (params) => {
  return defHttp.post(
    {
      url: Api.download,
      params,
      responseType: 'blob',
    },
    { errorMessageMode: 'none', isTransformResponse: false },
  );
};

// 导出总课表
export const getExportTotalSchedue = (params) => {
  return defHttp.post(
    {
      url: Api.downloadTotal,
      params,
      responseType: 'blob',
    },
    { errorMessageMode: 'none', isTransformResponse: false },
  );
};

// 清除所有固排禁排
export const deleteItem = (params) =>
  defHttp.post({
    url: Api.delete,
    params,
  });

// 清空所有课表
export const batchDelete = (params) =>
  defHttp.post({
    url: Api.batchDelete,
    params,
  });
// 手动排课时获取已排课程
export const getAutoList = (params) =>
  defHttp.get({
    url: Api.getAutoList,
    params,
  });
