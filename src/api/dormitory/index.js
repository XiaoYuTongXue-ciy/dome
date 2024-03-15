import { defHttp } from '/@/utils/http/axios';

const BASEURL = '/dormitory';

const Api = {
  page: `${BASEURL}/page`,
  detail: `${BASEURL}/detail`,
  add: `${BASEURL}/add`,
  update: `${BASEURL}/update`,
  delete: `${BASEURL}/delete`,
  checkInPage: `${BASEURL}/dormitoryInspectionPage`, // 宿舍查寝
  checkInDeatil: `${BASEURL}/GetDormitoryInspection`, // 宿舍查寝详情
  addCheckInRecord: `${BASEURL}/addDormitoryInspection`, // 查寝记录新增
  statisticInfo: `${BASEURL}/getDormitoryStatistics`, // 获取住宿数据统计
};

// 信息统计
export const getDormitoryStatistics = (params) =>
  defHttp.post({
    url: Api.getDormitoryStatistics,
    params,
  });

// 列表页
export const getPageInfo = (params) =>
  defHttp.post({
    url: Api.page,
    params,
  });

// 详情
export const getDetailInfo = (params) => {
  return defHttp.get({
    url: Api.detail,
    params,
  });
};

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

// 查寝信息
export const getCheckInPage = (params) =>
  defHttp.post({
    url: Api.checkInPage,
    params,
  });

//增加查寝信息
export const addDormitoryInspection = (params) =>
  defHttp.post({
    url: Api.addCheckInRecord,
    params,
  });

// 获取宿舍查寝详情
export const getCheckInDetail = (params) =>
  defHttp.get({
    url: Api.checkInDeatil,
    params,
  });

// 获取住宿数据统计
export const getSatisticInfo = (params) =>
  defHttp.post({
    url: Api.statisticInfo,
    params,
  });
