<template>
  <div class="register flex-center">
    <!-- 注册界面 -->
    <div>
      <h1>用户注册</h1>
      <div class="box flex-center">
        <div class="center">
          <!-- 步骤条 -->
          <div>
            <el-steps :active="1" class="Step-bar">
              <el-step title="步骤 1" icon="el-icon-edit"></el-step>
              <el-step title="步骤 2" icon="el-icon-upload"></el-step>
            </el-steps>
          </div>
          <!-- form表单 -->
          <div class="form">
            <div class="ipt flex-center">
              <span class="mr-5">*</span>
              <el-input
                v-model="username"
                placeholder="请输入用户名"
              ></el-input>
            </div>
            <div class="ipt flex-center">
              <span class="mr-5">*</span>
              <el-input v-model="name" placeholder="请输入真实姓名"></el-input>
            </div>
            <div class="ipt flex-center">
              <span class="mr-5">*</span>
              <el-input v-model="password" placeholder="请输入密码"></el-input>
            </div>
            <div class="ipt flex-center">
              <span class="mr-5">*</span>
              <el-input
                v-model="password2"
                placeholder="请再次输入密码"
              ></el-input>
            </div>
            <div class="ipt flex-center">
              <span class="mr-5">*</span>
              <el-input v-model="email" placeholder="请输入邮箱号"></el-input>
            </div>
            <div class="ipt flex-center">
              <span class="mr-5">*</span>
              <el-input v-model="phone" placeholder="请输入电话号"></el-input>
            </div>
            <div class="ipt flex-center">
              <span class="mr-5">*</span>
              <el-input v-model="captcha" placeholder="请输入验证码"></el-input>
              <img @click="getCaotch" :src="captchaSrc" alt="" />
            </div>
            <div>
              <el-button
                type="primary"
                @click="getRegister"
                class="registerld-bt"
                >注册</el-button
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getCaotchApi, getRegisterApi } from "@/api/api";
import base from "@/mixins/base";
export default {
  mixins: [base],
  data() {
    return {
      username: "",
      password: "999999",
      password2: "999999",
      email: "",
      phone: "",
      captcha: "",
      captchaSrc: "/api/captcha",
      emg: "@qq.com",
      name: "",
    };
  },
  created() {
    //键盘监听回车
    window.addEventListener("keydown", (e) => {
      if (e.code == "Enter" || e.code == "NumpadEnter") {
        this.getRegister();
      }
    });
  },
  methods: {
    getCaotch() {
      this.captchaSrc = getCaotchApi();
    },
    async getRegister() {
      const { username, password, email, name, emg, phone, captcha } = this;
      let res = await getRegisterApi({
        username,
        password,
        name,
        email: email + emg,
        phone,
        captcha,
      });
      console.log(res);
      if (res.data.status == 1) {
        this.$message({
          type: "success",
          message: "注册成功",
        });
        this.navigator("login");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.register {
  width: 100%;
  height: 100vh;
  & h1 {
    text-align: center;
    padding: 0;
    margin: 0 0 10px 0;
  }
  & .box {
    width: 800px;
    height: 650px;
    box-shadow: 0 0 10px #ccc;
    border-radius: 10px;
    & .center {
      width: 60%;
      height: 80%;
      margin: auto;
      & .form {
        & span {
          color: red;
        }
        & .ipt {
          margin: 20px 0;
        }
        & .registerld-bt {
          width: 100%;
        }
      }
    }
  }
}
</style>
