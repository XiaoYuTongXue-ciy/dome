import { defHttp } from '/@/utils/http/axios';

const BASEURL = '/sysMenu';

const Api = {
  module: `${BASEURL}/menuModule`,
  menu: `${BASEURL}/loginMenuTree`,
  menuV2: `${BASEURL}/menuTree`,
  menuList: `${BASEURL}/menuList`,
};

/**
 * @description: user login api
 */
export function getMenu(params) {
  // if (!id) return;
  return defHttp.get({
    url: Api.menu,
    params,
  });
}

export function getMenuV2(params) {
  // if (!params?.id) return;
  return defHttp.get({
    url: Api.menuV2,
    params,
  });
}

export function getModule() {
  return defHttp.get({
    url: Api.module,
  });
}

export function getMenuList(params) {
  return defHttp.get({
    url: Api.menuList,
    params,
  });
}
