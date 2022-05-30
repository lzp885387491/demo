<template>
  <div class="login flex-center">
    <!-- 登录界面  800*600 -->
    <div class="box flex-center">
      <div class="left flex-center">
        <div class="text">
          <div class="m flex-center">m</div>
          <div class="info">
            <div class="text">modedsa</div>
            <div class="text-info">asdqfeqwfeqsa</div>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="form">
          <div>
            <div class="p-13">USERNAME</div>
            <el-input v-model="username" placeholder="请输入用户名"></el-input>
          </div>
          <div>
            <div class="p-13">PASSWORD</div>
            <el-input
              v-model="password"
              show-password
              placeholder="请输入密码"
            ></el-input>
          </div>
          <div class="p-13">验证码</div>
          <div class="flex-center">
            <div>
              <el-input v-model="captcha" placeholder="请输入验证码"></el-input>
            </div>
            <div class="captcha">
              <!-- 验证码 -->
              <img @click="getCaotch" :src="captchaSrc" alt="" />
            </div>
          </div>
          <div class="ptb-15 flex-items">
            <span>忘记密码</span>
            <span>去注册</span>
          </div>
          <div>
            <el-button class="login-button" @click="getLgin" type="primary">
              Login
            </el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getCaotchApi, getLginApi } from "@/api/api";
import { encrypt } from "@/assets/utils/index";
import base from "@/mixins/base";

export default {
  mixins: [base],
  data() {
    return {
      username: "lixiansen",
      password: "999999",
      captcha: "",
      captchaSrc: "/api/captcha",
    };
  },
  created() {
    //键盘监听回车
    window.addEventListener("keydown", this.keydown, true);
  },
  methods: {
    keydown(event) {
      if (event.key == "Enter") {
        this.getLgin();
        //使用KeyboardEvent.keyCode处理事件并将handled设置为true。
        event.preventDefault();
      }
    },
    async getLgin() {
      const { username, password, captcha } = this;
      var res = await getLginApi({
        username,
        password: encrypt(password),
        captcha,
      });
      if (res.data.status == 1) {
        sessionStorage.setItem("token", res.data.data);
        this.$message({
          type: "success",
          message: "登录成功",
        });
        this.navigator("home");
      } else {
        this.$message({
          type: "warning",
          message: "登录失败,原因是:" + res.data.msg,
        });
      }
    },
    // 刷新验证码
    getCaotch() {
      this.captchaSrc = getCaotchApi();
    },
  },
  destroyed() {
    window.removeEventListener("keydown", this.keydown, true);
  },
};
</script>

<style lang="scss" scoped>
.login {
  width: 100vw;
  height: 100vh;
  background-color: #f5f8fd;
  & .box {
    min-width: 800px;
    min-height: 600px;
    background-color: #f5f8fd;
    border: 13px solid #1e80e1;
    & .left {
      width: 297px;
      height: 480px;
      background-color: #1e80e1;
      transform: skew(-10deg) translateX(40px);
      & .text {
        transform: skew(10deg);
        & .m {
          width: 80px;
          height: 80px;
          box-shadow: #59a2ea 0 0 5px;
          font-size: 60px;
          color: #fff;
          margin-bottom: 30px;
          margin-left: 20px;
        }
        & .info {
          color: #fff;
          padding-left: 10px;
          & .text {
            transform: skew(-10deg);
            font-size: 20px;
          }
          & .text-info {
            font-size: 12px;
          }
        }
      }
    }
    & .right {
      width: 397px;
      height: 400px;
      box-sizing: border-box;
      padding-left: 80px;
      padding-right: 35px;
      background-color: #fff;
      & .form {
        color: #567cec;
        padding: 20px 0;
        & .login-button {
          width: 100%;
        }
        & .captcha {
          width: 200px;
        }
      }
    }
  }
}
</style>
