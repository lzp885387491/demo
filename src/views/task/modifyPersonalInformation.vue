<template>
  <div class="box">
    <div class="header flex-items">
      <h3>基本信息</h3>
    </div>
    <div class="basicInfo">
      <div class="form">
        <el-form
          :model="ruleForm"
          ref="ruleForm"
          label-width="70px"
          class="demo-ruleForm"
        >
          <el-form-item label="账号昵称" prop="avatarName">
            <el-input v-model="ruleForm.avatarName"></el-input>
          </el-form-item>
          <el-form-item label="真实姓名" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="phone">
            <el-input v-model="ruleForm.phone"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="ruleForm.email"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="resource">
            <!-- <el-radio-group v-model="ruleForm.sex"> -->
            <el-radio v-model="ruleForm.sex" :label="0">男</el-radio>
            <el-radio v-model="ruleForm.sex" :label="1">女</el-radio>
            <!-- </el-radio-group> -->
          </el-form-item>
          <el-form-item label="所在地" prop="region">
            <!-- 用户看到的信息是label -->
            <el-select
              class="select mr-10"
              v-model="ruleForm.provinceNo"
              placeholder="请选择省份"
            >
              <el-option
                v-for="item in Data"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              >
                <span style="float: left">{{ item.name }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{
                  item.code
                }}</span>
              </el-option>
            </el-select>
            <el-select
              v-show="city.length"
              class="select mr-10"
              v-model="ruleForm.cityNo"
              placeholder="请选择市"
            >
              <el-option
                v-for="item in city"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              >
                <span style="float: left">{{ item.name }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{
                  item.code
                }}</span>
              </el-option>
            </el-select>
            <el-select
              v-show="area.length"
              class="select mr-10"
              v-model="ruleForm.areaNo"
              placeholder="请选择区县"
            >
              <el-option
                v-for="item in area"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              >
                <span style="float: left">{{ item.name }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{
                  item.code
                }}</span>
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="简介" prop="desc">
            <el-input
              class="textarea"
              type="textarea"
              v-model="ruleForm.desc"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm()">立即创建</el-button>
            <el-button @click="navigator('home')">取消</el-button>
            <el-button @click="resetForm()">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import base from "@/mixins/base";
import citydata from "../../assets/lib/citydata.json";
import { getUserInfoApi, setUpdateInfoApi } from "@/api/api";
export default {
  mixins: [base],
  data() {
    return {
      ruleForm: {
        phone: "", //手机号
        avatarName: "", //昵称
        name: "", //真实姓名
        sex: "", //性别
        email: "", // 邮箱
        desc: "", //个人介绍
        provinceNo: "", // 省编号
        cityNo: "", // 市编号
        areaNo: "", // 区县编号
      },
      Data: citydata, // 省的列表
      city: [], // 市的列表
      area: [], // 区的列表
      getUserInfoData: [],
    };
  },
  watch: {
    // watch 当一个值发生变化的时候  可以做到逻辑  就可以放到watch中来
    "ruleForm.provinceNo": function (code) {
      // console.log("code", code);
      // 当this.ruleForm.provinceNo发生变化时，就修改city的值
      // 找到code值对应的那个json
      this.ruleForm.cityNo = "";
      this.ruleForm.areaNo = "";
      this.ruleForm.cityNo = this.getUserInfoData.cityNo;
      let res = this.Data.find((item) => item.code == code);
      this.city = res && res.children ? res.children : [];
    },
    "ruleForm.cityNo": function (code) {
      // console.log("code", code);
      // 当this.ruleForm.provinceNo发生变化时，就修改city的值
      // 找到code值对应的那个json
      this.ruleForm.areaNo = "";
      this.ruleForm.areaNo = this.getUserInfoData.areaNo;
      let res = this.city.find((item) => item.code == code);
      this.area = res && res.children ? res.children : [];
    },
  },
  created() {
    this.getUserInfo();
  },
  methods: {
    // 修改个人信息接口
    async submitForm() {
      let res = await setUpdateInfoApi(this.ruleForm);
      if (res.data.status == 1) {
        this.$message({
          message: "修改成功！",
          type: "success",
        });
        this.getUserInfo();
      }
    },
    // 个人信息接口
    async getUserInfo() {
      let res = await getUserInfoApi();
      if (res.data.status == 1) {
        this.getUserInfoData = res.data.data;
        console.log("获取到当前登录的这个账号的信息", this.getUserInfoData);
        this.ruleForm.avatarName = this.getUserInfoData.avatarName; //昵称
        this.ruleForm.email = this.getUserInfoData.email; //邮箱
        this.ruleForm.desc = this.getUserInfoData.desc; //个人介绍
        this.ruleForm.name = this.getUserInfoData.name; //真实姓名
        this.ruleForm.sex = this.getUserInfoData.sex; //性别
        this.ruleForm.phone = this.getUserInfoData.phone; //手机号
        this.ruleForm.desc = this.getUserInfoData.desc; // 个人简介
        this.ruleForm.provinceNo = this.getUserInfoData.provinceNo;
      }
    },
    // form 重置为空方法
    resetForm() {
      this.ruleForm = {
        names: "",
        name: "",
        region: "",
        Gender: "",
        briefIntroduction: "",
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.box {
  & .header {
    box-sizing: border-box;
    width: 100%;
    height: 59px;
    padding: 0 40px;
    border-bottom: 1px solid #e9e6e6;
  }
  & .basicInfo {
    box-sizing: border-box;
    padding: 13px 40px 0 40px;
    & .form {
      width: 580px !important;
      & .select {
        width: 160px !important;
      }
      & ::v-deep .el-textarea__inner {
        height: 100px !important;
      }
    }
  }
}
</style>
