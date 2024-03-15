<template>
  <div id="index-page" style="font-size: 15px">
    <div class="title">
      <div class="logo"> </div>
      <div class="project-name"> 智慧校园综合管理系统</div>
    </div>
    <div class="user-info">
      <img
        class="avatar"
        src="https://new-xuefenyinhang.oss-cn-hangzhou.aliyuncs.com/common/userFemale.png"
        alt=""
      />
      <div>{{ userInfo.account }}</div>
      <img
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAMAAAC7IEhfAAAAOVBMVEUAAAD///////////////////////////////////////////////////////////////////////8KOjVvAAAAEnRSTlMAwBDwMNBAUCBgsIDgkN+gcH9U+NjrAAABhklEQVQ4y52UW7KEIAxEJ7xFBO39L/YiJuDoLa0aPiwJx8Y0CZ9fh1oyAB3NG2jB44VcgUREFY/P4AwoFn4BGaAXcMoDJPcf4TdfHxUbIBCViUD2AwsWNVAA6MUcSSXsM7Thb57oVY09CJCwGp5YR/VhrlYhTU4DCx+Ghg5V4uacSTPzoc0XYH48LJHMSF86G9Fmzo4Apb0A+WQA50BhmAus4pl1wumeKpOq9LSNRk+MgOSV8gmgQ05XzshfWQn7Kq6aTg15Pvw4zHWiWHiZMxhLA5yvRQMQL9EPoBH9CJgeigyeT6znuL+I9sSRkU2wkC1Ts7rZnuRTILOnGcDMnjavNYZ5jgAU+SiGUTFoI5mvcpOGOrWHWqO1cf18ZaBFcXnsONla6cMUdUcmXg69mWlv1XJBlxo3Utdiis3gartUZo2nLmB6FdKkOHQ0bzfqXGhuBrpnXOVqnaWFBd2noezLYol/vEcHSA/YABQQX2/csm0bAfMz6E8XzgupATSnX0dwzt2jf8JfHKs36+fyAAAAAElFTkSuQmCC"
        alt=""
      />
      <img
        @click="handleLogOut"
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAAAjxJREFUWEftmE9OFEEYxd/buQN3sgL2JmJYuBRuACdATgCeQDiBcgK5gdwAOAGEhLW60xWyN3nmkSoopnvo6q5uekzmS2bRmarqX3//6yNmXDjjfKgASloEsAdgA8AaAD+XyiUA/w5J/mhz2CNASQb6BmClzSEt1v4B8JHkce6ee8CguYsB4SKTId/majIF3AfwOZzyE8A+yZPcL31qXbCMtfYmrDsi6fc1Sgp4BuB92LHdF1wkkGSfPg3P5yT93Cgp4E0SEC9J2hS9SR+AijQke08/c8BSW/8PGnRu/V4SJIP6oMEkfQkV6iA3S6RRPDhg6iahMMS86+pSmzXGBEwLg+v0Zh3kmIBp4rZyayFHAww++QHA18T0FchiQElbSY3tko3cQfmMKL8BvCPpfuChH5TUOkgkTWqgC2DdnmuSr2cZ8BfJpT4A3W3Hzrur9l4B2AHwIhzwF8A6yatiwK5ESQtm/3MLFq8Vt/5gkg6WOykOkq6Qklz63MFPhRsbME3UFc3NggatuWjKrdSsqVVGM3Gua8wBJzoYB0a8OPlidh+t0zT6rBqUlAaGpwwHTaZ+bkADfQpQc8Am61T+l1SkQU+dlsOpq7mzkzaUpYDp6GO3zQQqF1KS5zNuDCytfdA3Ls8FLb7AOOI8Q2k1z6uDDRckz30MGGtv1vxncvxmmIVcjRSsc+1dy/n4yQGmO2RrcmjIbBeaNgJ2tLlXc+aPgVOgsLut58F1fGlvrCCVbqb07UPt733M1jfoP8EBOjjJ7oN8AAAAAElFTkSuQmCC"
        alt=""
      />
    </div>
    <div class="content">
      <div
        @click="handleLogin(menuModules[0].id)"
        class="menu"
        style="background: url('@/../../Image/menu4.png') no-repeat"
      >
        <span>{{ menuModules[0]?.title }}</span>
      </div>
      <div
        @click="handleLogin(menuModules[1].id)"
        class="menu"
        style="background: url('@/../../Image/menu2.png') no-repeat"
      >
        <span>{{ menuModules[1]?.title }}</span>
      </div>
      <div
        @click="handleLogin(menuModules[2].id)"
        class="menu"
        style="background: url('@/../../Image/menu3.png') no-repeat"
      >
        <span>{{ menuModules[2]?.title }}</span>
      </div>
    </div>
  </div>
</template>
<script setup>
  import { ref } from 'vue';
  import { onBeforeRouteLeave } from 'vue-router';

  import { useUserStoreWithOut } from '@/store/modules/user.ts';
  import { usePermissionStoreWithOut } from '@/store/modules/permission.ts';
  import { getModule } from '@/api/sysAuth/menu.js';

  const userStore = useUserStoreWithOut();
  const usePermission = usePermissionStoreWithOut();

  const userInfo = ref(userStore.getUserInfo);
  const menuModules = ref([]);

  const loadMenuModule = async () => {
    const res = await getModule().catch((e) => console.log(e));
    menuModules.value = res;
  };
  loadMenuModule();

  const handleLogin = async (moduleId) => {
    localStorage.setItem('moduleId', moduleId);
    await usePermission.setCurrentModule(moduleId);
    await userStore.loadChildMenu(moduleId);
  };

  const handleLogOut = async () => {
    await userStore.logout(true);
  };

  window.onresize = () => {
    document.documentElement.style.fontSize = document.documentElement.clientWidth / 100 + 'px';
  };

  onBeforeRouteLeave(() => {
    window.onresize = null;
  });
</script>
<style scoped lang="less">
  #index-page {
    position: relative;
    width: 100%;
    min-height: 100vh;
    overflow: hidden;
    background: url('@/assets/images/Index-bg.png');
    background-size: 100% 100%;
    color: white;
    font-size: 1.6rem;

    .title {
      display: flex;
      position: fixed;
      top: 2rem;
      left: 2rem;
      height: auto;
      letter-spacing: 2px;
      gap: 15px;

      .logo {
        width: 3.5rem;
        height: 3.5rem;
        background: url('@/assets/images/logo.png') no-repeat;
        background-size: contain;
      }

      .project-name {
        display: flex;
        align-items: center;
        margin-top: 0.9rem;
        font-family: 'Courier New', Courier, monospace;
        font-size: 2.5rem;
        font-weight: 600;
        line-height: 3rem;
      }
    }

    .user-info {
      display: flex;
      position: fixed;
      top: 3rem;
      right: 4rem;
      align-items: center;
      width: auto;
      gap: 1rem;

      img {
        width: 1.1rem;
        height: 1.1rem;

        &:hover {
          cursor: pointer;
        }
      }

      img.avatar {
        width: 2.2rem;
        height: 2.2rem;
      }
    }

    .content {
      display: flex;
      position: fixed;
      top: 10rem;
      right: 0;
      left: 0;
      justify-content: center;
      width: 60rem;
      height: auto;
      margin: auto;
      gap: 3rem;

      .menu {
        position: relative;
        width: 12rem;
        height: 15rem;
        transition: 0.7s;
        border-radius: 1rem;
        background-size: cover !important;
        cursor: pointer;

        &:hover {
          transform: scale(1.1);
        }

        &:nth-child(1) {
          background: url('@/assets/images/menu4.png');
        }

        &:nth-child(2) {
          background: url('@/assets/images/menu2.png');
        }

        &:nth-child(3) {
          background: url('@/assets/images/menu3.png');
        }

        span {
          display: inline-block;
          position: absolute;
          bottom: 2rem;
          width: 100%;
          font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
          font-size: 1.4rem;
          text-align: center;
        }

        img {
          width: 2rem;
          height: 2rem;
        }
      }
    }
  }
</style>
