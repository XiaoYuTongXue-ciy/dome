import { defHttp } from '/@/utils/http/axios';

const BASEURL = '/sysAuth';

const Api = {
  login: `${BASEURL}/login`,
  captcha: `${BASEURL}/captcha`,
  userInfo: `${BASEURL}/userInfo`,
  logout: `${BASEURL}/logout`,
};

/**
 * @description: user login api
 */
export function loginApi(params, mode) {
  return defHttp.post(
    {
      url: Api.login,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

// 获取验证码
export function getCaptcha() {
  return defHttp.get({ url: Api.captcha }, { errorMessageMode: 'none' });
}

// 获取用户信息
export function getUserInfo() {
  return defHttp.get({ url: Api.userInfo });
}

// 获取用户信息
export function logout() {
  return defHttp.post({ url: Api.logout });
}
