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
            :default-active="defaulActive"
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
            <el-submenu
              :index="item.id"
              v-for="item in roleData"
              :key="item.id"
            >
              <template slot="title">
                <i class="el-icon-user"></i>
                <span>{{ item.roleName }}</span>
              </template>
              <el-menu-item-group
                v-for="children in item.children"
                :key="children.id"
              >
                <el-menu-item :index="children.id">
                  <i class="el-icon-user"></i>
                  {{ children.roleName }}
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
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
      defaulActive: "101",
      roleData: [
        {
          id: "1",
          roleName: "默认",
          children: [
            {
              id: "101",
              roleName: "所有者",
            },
            {
              id: "102",
              roleName: "管理员",
            },
            {
              id: "103",
              roleName: "部门主管",
            },
            {
              id: "104",
              roleName: "成员",
            },
          ],
        },
        {
          id: "2",
          roleName: "职务",
          children: [
            {
              id: "201",
              roleName: "所有者2",
            },
            {
              id: "202",
              roleName: "管理员2",
            },
            {
              id: "203",
              roleName: "部门主管2",
            },
            {
              id: "204",
              roleName: "成员2",
            },
          ],
        },
        {
          id: "3",
          roleName: "总监",
          children: [
            {
              id: "301",
              roleName: "所有者3",
            },
            {
              id: "302",
              roleName: "管理员3",
            },
            {
              id: "303",
              roleName: "部门主管3",
            },
            {
              id: "304",
              roleName: "成员3",
            },
          ],
        },
        {
          id: "4",
          roleName: "区域",
          children: [
            {
              id: "401",
              roleName: "所有者4",
            },
            {
              id: "402",
              roleName: "管理员4",
            },
            {
              id: "403",
              roleName: "部门主管4",
            },
            {
              id: "404",
              roleName: "成员4",
            },
          ],
        },
      ],
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