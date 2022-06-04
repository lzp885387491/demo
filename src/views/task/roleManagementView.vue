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
            <div class="list" v-for="(item, index) in arr" :key="index">
              <el-submenu :index="index + ''">
                <template slot="title">
                  <i class="el-icon-user"></i>
                  <span>{{ item.label }}</span>
                </template>
                <div v-for="(el, i) in item.children" :key="i">
                  <el-menu-item-group>
                    <el-menu-item :index="i + '1'">
                      <i class="el-icon-user"></i>
                      {{ el.roleName }}
                    </el-menu-item>
                  </el-menu-item-group>
                </div>
              </el-submenu>
            </div>
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
import { getRoleListApi, getRoleGroupListApi } from "@/api/api";
import base from "@/mixins/base";
export default {
  mixins: [base],
  data() {
    return {
      roleList: [], //角色列表
      groupingList: [], // 分组列表
      arr: [], // 这个是角色管理左侧下拉列表需要便利的数据
    };
  },
  async created() {
    let [getRoleList, getRoleGroupList] = await Promise.all([
      getRoleListApi({ pagination: false }),
      getRoleGroupListApi({ pagination: false }),
    ]);
    this.roleList = getRoleList.data.data.rows;
    this.groupingList = getRoleGroupList.data.data.rows;
    this.groupingList.forEach((el) => {
      let children = this.roleList.filter((item) => {
        if (el.id == item.groupId) {
          return item;
        }
      });
      this.arr.push({
        label: el.groupName,
        children: children,
      });
    });
    // console.log(this.arr);
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
