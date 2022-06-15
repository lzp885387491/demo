<template>
  <div class="box">
    <!--  -->
    <div class="header flex-items">
      <div class="txt">设置角色对应的功能操作、应用管理、后台管理权限</div>
      <div class="checkbox">
        <el-checkbox v-model="headerSelectAll">全选</el-checkbox>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      headerSelectAll: false, // header里 全选的多选框
      news: false, // 消息的多选框
      project: false, // 项目的多选框
      calendar: false, // 日历的多选框
      netDisk: false, //网盘的多选框
    };
  },
};
</script>

<style lang="scss" scoped>
.header {
  box-sizing: border-box;
  padding: 8px 0;
  & .txt {
    padding-left: 20px;
    font-size: 16px;
    color: #e1e1e1;
  }
  & .checkbox {
    padding-right: 20px;
  }
}
.subject {
  box-sizing: border-box;
  height: 665px;
  // background-color: yellowgreen;
  overflow-y: scroll;
  & .item {
    & .item-header {
      box-sizing: border-box;
      width: 100%;
      height: 50px;
      background-color: #f6fafd;
      display: flex;
      align-items: center;
      padding-left: 20px;
    }
    & .value {
      box-sizing: border-box;
      padding: 10px;
      background-color: #fff;
      & .row {
        box-sizing: border-box;
        padding: 5px;
        & .row-checkbox {
          width: 220px;
        }
      }
    }
  }
}
</style>