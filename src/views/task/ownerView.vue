<template>
  <div>
    <!--  -->
    <div class="header mt-10 flex-center2">
      <h5>所有人</h5>
      <h6>系统默认角色，默认具有企业所有功能权限和全部数据可见范围</h6>
    </div>
    <div class="">
      <el-menu
        default-active="2"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
      >
        <el-menu-item index="1" @click="navigator('roleMembersView')"
          >角色成员</el-menu-item
        >
        <el-menu-item index="2" @click="navigator('jurisdictionView')"
          >功能权限</el-menu-item
        >
        <el-menu-item index="3" @click="navigator('rangeView')"
          >数据范围</el-menu-item
        >
      </el-menu>
    </div>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import base from "@/mixins/base";
export default {
  mixins: [base],
  data() {
    return {
      //
      activeIndex: "1",
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>

<style lang="scss" scoped>
//
.header {
  & h5,
  h6 {
    margin: 0;
  }
  & h5 {
    font-size: 18px;
    color: #889db7;
    padding-left: 20px;
  }
  & h6 {
    color: #adadad;
  }
}
</style>