import { defHttp } from '/@/utils/http/axios';

const BASEURL = '/dBStudentInformation';

const Api = {
  page: `${BASEURL}/page`,
};

//分页查询学生信息表
export const getPageInfo = (data) =>
  defHttp.post({
    url: Api.page,
    data,
  });
