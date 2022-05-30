<template>
  <div class="box">
    <el-container>
      <el-header class="header"
        ><i class="mlr-10 el-icon-user"></i>
        <span class="text">角色管理</span>
      </el-header>
      <el-container>
        <el-aside class="menu-bar">
          <el-menu
            default-active="1-1"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
          >
            <div class="flex-items add plr-10">
              <div class="colorBlue smallHand">
                <i class="el-icon-user"></i>
                新增角色
              </div>
              <div class="colorBlue smallHand">
                <i class="el-icon-user"></i>
                新键分组
              </div>
            </div>
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-user"></i>
                <span>默认</span>
              </template>
              <el-menu-item-group>
                <el-menu-item
                  index="1-1"
                  @click="navigator('jurisdictionView')"
                >
                  <i class="el-icon-user"></i>
                  所有者
                </el-menu-item>
                <el-menu-item index="1-2">
                  <i class="el-icon-user"></i>
                  管理员
                </el-menu-item>
                <el-menu-item index="1-3">
                  <i class="el-icon-user"></i>
                  部门主管
                </el-menu-item>
                <el-menu-item index="1-4">
                  <i class="el-icon-user"></i>
                  成员
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-menu-item index="2">
              <i class="el-icon-user"></i>
              <span slot="title"> 职务 </span>
            </el-menu-item>
            <el-menu-item index="3">
              <i class="el-icon-user"></i>
              <span slot="title">总监</span>
            </el-menu-item>
            <el-menu-item index="4">
              <i class="el-icon-user"></i>
              <span slot="title">区域</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main class="main">
          <!-- 子路由显示的地方 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import base from "@/mixins/base";
export default {
  mixins: [base],
  data() {
    return {
      //
    };
  },
  methods: {
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
.box {
  & .header {
    display: flex;
    align-items: center;
    height: 60px;
    border-bottom: 2px solid #ebeff1;
    & .el-icon-user {
      font-size: 22px;
    }
    & .text {
      font-size: 25px;
    }
  }
  & .menu-bar {
    width: 200px !important;
    height: calc(100vh - 123px);
    background-color: yellow;
    & .el-menu-vertical-demo {
      height: 100%;
      & .add {
        height: 30px;
      }
    }
  }
  .main {
    padding: 0;
  }
}
</style>