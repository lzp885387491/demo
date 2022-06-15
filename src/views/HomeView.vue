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
            default-active="6-1"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color="#0e1a34"
            text-color="#fff"
            active-text-color="#ffd04b"
          >
            <div v-for="(item, index) in sidebarData" :key="index">
              <el-submenu :index="index + ''" v-if="item.children.length != 0">
                <template slot="title">
                  <i :class="item.icon"></i>
                  <span> {{ item.title }} </span>
                </template>
                <div v-if="item.children.length != 0">
                  <el-menu-item-group>
                    <el-menu-item
                      :index="index + '-' + i + ''"
                      v-for="(it, i) in item.children"
                      :key="i"
                      @click="navigator(it.link)"
                    >
                      <i :class="it.icon"></i>
                      <span> {{ it.title }} </span>
                    </el-menu-item>
                  </el-menu-item-group>
                </div>
              </el-submenu>
              <el-menu-item
                v-else
                :index="index + ''"
                @click="navigator(item.link)"
              >
                <i :class="item.icon"></i>
                <span> {{ item.title }} </span>
              </el-menu-item>
            </div>
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
      sidebarData: [
        {
          icon: "el-icon-location",
          title: "题库管理",
          name: "questionView",
          children: [
            {
              icon: "",
              title: "题库管理",
              name: "questionView",
              children: [],
              link: "questionView",
            },
            {
              icon: "",
              title: "Html题库",
              name: "htmlQuestion",
              link: "htmlQuestion",
              children: [],
            },
            {
              icon: "",
              title: "JS题库",
              name: "jsQuestion",
              children: [],
              link: "jsQuestion",
            },
            {
              icon: "",
              title: "css题库",
              name: "cssQuestion",
              children: [],
              link: "cssQuestion",
            },
          ],
        },
        {
          icon: "el-icon-menu",
          title: "匹配比赛",
          name: "",
          children: [],
          link: "",
        },
        {
          icon: "el-icon-document",
          title: "报名系统",
          name: "",
          children: [],
          link: "",
        },
        {
          title: "刷题系统",
          name: "",
          link: "",
          icon: "el-icon-setting",
          children: [],
        },
        {
          title: "个人中心",
          name: "",
          icon: "el-icon-postcard",
          children: [
            {
              icon: "",
              title: "修改个人信息",
              link: "modifyPersonalInformation",
              name: "modifyPersonalInformation",
              children: [],
            },
            {
              icon: "",
              link: "myTaskView",
              title: "我的任务",
              name: "myTaskView",
              children: [],
            },
          ],
        },
        {
          title: "任务中心",
          name: "",
          icon: "el-icon-chat-line-square",
          children: [
            {
              icon: "",
              title: "创建任务",
              name: "createTaskView",
              link: "createTaskView",
              children: [],
            },
            {
              icon: "",
              title: "任务列表",
              link: "taskListView",
              name: "taskListView",
              children: [],
            },
          ],
        },
        {
          title: "角色管理",
          name: "",
          icon: "el-icon-loading",
          children: [
            {
              icon: "",
              title: "角色管理",
              name: "roleManagement",
              children: [],
              link: "roleManagement",
            },
            {
              icon: "",
              title: "创建角色",
              name: "createRole",
              children: [],
              link: "createRole",
            },
            {
              icon: "",
              title: "权限管理",
              name: "JurisdictionCeShiView",
              children: [],
              link: "JurisdictionCeShiView",
            },
          ],
        },
        {
          title: "用户列表",
          name: "userListView",
          icon: "el-icon-menu",
          link: "userListView",
          children: [],
        },
      ], // 首页左侧侧边栏数据
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
