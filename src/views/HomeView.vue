<template>
  <div>
    <el-container class="container">
      <el-header class="header">
        <!-- 顶部导航栏 -->
        <div class="warp flex-items">
          <div class="logo flex-items">
            <img class="icon mr-5" src="../assets/logo.png" alt="" />
            <span>现代学生云平台</span>
          </div>
          <div class="info flex-items">
            <div class="flex-items mlr-5">
              <img src="../assets/logo.png" class="icon mlr-5" alt="" />
              <span>{{ data.avatarName || data.phone }}</span>
            </div>
            <div class="flex-items signOut" @click="signOut">
              <img src="../assets/logo.png" class="icon mlr-5" alt="" />
              <span>退出</span>
            </div>
          </div>
        </div>
      </el-header>
      <el-container>
        <!-- 左侧菜单栏 -->
        <el-aside class="list">
          <el-menu
            default-active="1"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color="#0e1a34"
            text-color="#fff"
            active-text-color="#ffd04b"
          >
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span> 题库管理 </span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="1-1" @click="navigator('questionView')">
                  题库管理
                </el-menu-item>
                <el-menu-item index="1-2" @click="navigator('htmlQuestion')">
                  Html题库
                </el-menu-item>
                <el-menu-item index="1-3" @click="navigator('jsQuestion')">
                  JS题库
                </el-menu-item>
                <el-menu-item index="1-4" @click="navigator('cssQuestion')">
                  css题库
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-menu-item index="2">
              <i class="el-icon-menu"></i>
              <span slot="title"> 匹配比赛 </span>
            </el-menu-item>
            <el-menu-item index="3">
              <i class="el-icon-document"></i>
              <span slot="title"> 报名系统 </span>
            </el-menu-item>
            <el-menu-item index="4">
              <i class="el-icon-setting"></i>
              <span slot="title"> 刷题系统 </span>
            </el-menu-item>
            <el-menu-item index="5" @click="navigator('login')">
              <i class="el-icon-s-custom"></i>
              <span slot="title"> 登 录 </span>
            </el-menu-item>
            <el-menu-item index="6" @click="navigator('register')">
              <i class="el-icon-cpu"></i>
              <span slot="title"> 注 册 </span>
            </el-menu-item>
            <el-submenu index="7">
              <template slot="title">
                <i class="el-icon-postcard"></i>
                <span> 个人中心 </span>
              </template>
              <el-menu-item-group>
                <el-menu-item
                  index="7-1"
                  @click="navigator('modifyPersonalInformation')"
                >
                  修改个人信息
                </el-menu-item>
                <el-menu-item index="7-2" @click="navigator('myTaskView')">
                  我的任务
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="8">
              <template slot="title">
                <i class="el-icon-chat-line-square"></i>
                <span> 任务中心 </span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="8-1" @click="navigator('createTaskView')">
                  创建任务
                </el-menu-item>
                <el-menu-item index="8-2" @click="navigator('taskListView')">
                  任务列表
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="9">
              <template slot="title">
                <i class="el-icon-loading"></i>
                <span> 角色管理 </span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="9-1" @click="navigator('roleManagement')">
                  <i class="el-icon-set-up"></i>
                  角色管理
                </el-menu-item>
                <el-menu-item index="9-2" @click="navigator('createRole')">
                  <i class="el-icon-turn-off"></i>
                  创建角色
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-menu-item index="10" @click="navigator('userListView')">
              <i class="el-icon-menu"></i>
              <span slot="title"> 用户列表 </span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <!-- 右侧主体部分 -->
        <el-main class="subject">
          <!-- 正文 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import base from "@/mixins/base";
import { getUserInfoApi } from "@/api/api";
export default {
  mixins: [base],
  data() {
    return {
      data: "",
    };
  },
  async created() {
    let res = await getUserInfoApi();
    if (res.data.status == 1) {
      this.data = res.data.data;
    } else {
      this.$message({
        message: "请重新登录",
        type: "warning",
      });
      this.navigator("login");
    }
  },
  methods: {
    signOut() {
      sessionStorage.setItem("token", null);
      this.$message({
        message: "退出成功,请登录",
        type: "warning",
      });
      this.navigator("login");
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  & .header {
    padding: 0;
    min-width: 900px;
    width: 100%;
    height: 60px !important;
    background-color: #4e82ef;
    color: #fff;
    & .logo {
      font-size: 20px;
    }
    & .signOut {
      cursor: pointer;
    }
  }
  & .list {
    height: calc(100vh - 60px);
    max-width: 200px !important;
    min-width: 150px !important;
    background-color: #0e1a34;
    color: #fff;
  }
  @media screen and (max-width: 1300px) {
    .list {
      width: 135px !important;
    }
    .subject {
      min-width: 700px;
    }
  }
  ::-webkit-scrollbar {
    width: 0 !important;
  }
  & .subject {
    padding: 0;
    height: calc(100vh - 60px);
    background-color: #fff;
  }
}
</style>
