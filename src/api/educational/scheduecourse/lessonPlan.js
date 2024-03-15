// 教学计划
import { defHttp } from '/@/utils/http/axios';

const BASEURL = '/lessonPlan';

const Api = {
  page: `${BASEURL}/page`,
  detail: `${BASEURL}/detail`,
  list: `${BASEURL}/list`,
  teacherByCourseList: `${BASEURL}/teacherByCourseList`,
  teacherByNameList: `${BASEURL}/teacherByNameList`,
  teacherTitleByCourseList: `${BASEURL}/teacherTitleByCourseList`,
  getListBySchedule: `${BASEURL}/getListBySchedule`,
  add: `${BASEURL}/add`,
  update: `${BASEURL}/update`,
  delete: `${BASEURL}/delete`,
  uploadFile: `${BASEURL}/import`,
  download: `${BASEURL}/export`,
  templateFile: '/templateFile/download',
  scheduleListByClassId: `${BASEURL}/getScheduleListByClassId`, // 手动排课时，获取未排课列表
};

// 分页列表
export const getPageInfo = (params) =>
  defHttp.post({
    url: Api.page,
    params,
  });

// 教学计划列表
export const getPlanList = () =>
  defHttp.get({
    url: Api.list,
  });

// 详情
export const getDetailInfo = (params) =>
  defHttp.get({
    url: Api.detail,
    params,
  });

//  新增
export const add = (data) =>
  defHttp.post({
    url: Api.add,
    data,
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

// 获取教师列表
export const getTeacherByCourseList = () =>
  defHttp.get({
    url: Api.teacherByCourseList,
  });

// 获取教师名称列表
export const getTeacherTitle = () =>
  defHttp.get({
    url: Api.teacherTitleByCourseList,
  });

// 通过固排参数获取教学计划
export const getListBySchedule = (params) =>
  defHttp.get({
    url: Api.getListBySchedule,
    params,
  });

// 手动排课时，获取未排课列表
export const getScheduleListByClassId = (params) =>
  defHttp.get({
    url: Api.scheduleListByClassId,
    params,
  });

// 导入
export const uploadApi = (params, onUploadProgress) =>
  defHttp.uploadFile(
    {
      url: Api.uploadFile,
      onUploadProgress,
    },
    params,
  );
// 导出
export const getExport = (params) =>
  defHttp.post(
    {
      url: Api.download,
      params,
      responseType: 'blob',
    },
    { errorMessageMode: 'none', isTransformResponse: false },
  );

// 获取未排课教师列表
export const getTeacherByNameList = () =>
  defHttp.get({
    url: Api.teacherByNameList,
  });

// 模板
export const getTemplateFile = (params) =>
  defHttp.get(
    {
      url: Api.templateFile,
      params,
      responseType: 'blob',
    },
    { errorMessageMode: 'none', isTransformResponse: false },
  );
