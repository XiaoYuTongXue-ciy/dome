// 固排禁排
import { defHttp } from '/@/utils/http/axios';

const BASEURL = '/fixationOrBanSchedule';

const Api = {
  detail: `${BASEURL}/getScheduleListByDetailId`,
  batchSave: `${BASEURL}/batchSave`,
  clearDetail: `${BASEURL}/batchDeleteByDetail`,
  delete: `${BASEURL}/batchDeleteFixationSchedule`,
};

// 排课信息
export const detail = (params) =>
  defHttp.get({
    url: Api.detail,
    params,
  });

// 保存
export const batchSave = (params) =>
  defHttp.post({
    url: Api.batchSave,
    params,
  });

// 清空班级/教师/教室固排禁排
export const clearItem = (params) =>
  defHttp.post({
    url: Api.clearDetail,
    params,
  });

// 清空所有固排禁排
export const deleteItem = (params) =>
  defHttp.post({
    url: Api.delete,
    params,
  });
