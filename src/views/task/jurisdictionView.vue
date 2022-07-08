<template>
  <div class="box">
    <el-checkbox-group v-model="checkList">
      <el-checkbox label="复选框 A"></el-checkbox>
      <el-checkbox label="复选框 B"></el-checkbox>
      <el-checkbox label="复选框 C"></el-checkbox>
      <el-checkbox label="禁用" disabled></el-checkbox>
      <el-checkbox label="选中且禁用" disabled></el-checkbox>
    </el-checkbox-group>
  </div>
</template>

<script>
import base from "@/mixins/base";
export default {
  mixins: [base],
  data() {
    return {
      checkList: ["选中且禁用", "复选框 A"],
    };
  },
  created() {
    console.log(this.sidebarData);
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
  },
};
</script>

<style lang="scss" scoped>
.box {
  padding: 20px;
}
</style>