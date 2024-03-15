import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';

const about: AppRouteModule = {
  path: '/course',
  name: 'Course',
  component: LAYOUT,
  redirect: '/course/index',
  meta: {
    hideChildrenInMenu: true,
    icon: 'simple-icons:about-dot-me',
    title: '课程管理',
    orderNo: 11,
  },
  // children: [
  //   {
  //     path: 'index',
  //     name: 'Course',
  //     component: () => import('/@/views/courses/index.vue'),
  //     meta: {
  //       title: '课程管理',
  //       icon: 'simple-icons:about-dot-me',
  //       hideMenu: true,
  //     },
  //   },
  // ],
};

export default about;
