<template>
  <div class="setavatr">
    <div class="flex">
      <div class="mr-10">
        <img
          v-if="imageUrl"
          :src="imageUrl"
          @click="fanhui"
          alt="图片加载失败"
          class="avatar"
        />
      </div>
      <el-upload
        class="avatar-uploader"
        action="/api//upload/image"
        :data="from"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <!-- <img v-if="imageUrl" :src="imageUrl" class="avatar" /> -->
        <i class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </div>
    <div>
      <h2>默认的</h2>
      <div class="flex">
        <div v-for="(item, i) in avatarlist" :key="i">
          <img
            v-if="item.url"
            @click="choice(item)"
            :src="item.url"
            alt="图片加载失败"
            class="avatar mlr-5"
          />
        </div>
      </div>
    </div>
    <el-button v-if="imageUrl" @click="open" type="primary">保存头像</el-button>
  </div>
</template>

<script>
import { setUpdateInfoApi, avatarList, getUserInfoApi } from "../api/api";
export default {
  data() {
    return {
      imageUrl: this.$store.state.user.userInfoData.avatarImg,
      from: {
        type: 2,
      },
      avatarImg: "",
      userInfo: "", // 用户信息接口返回值
      avatarlist: [],
      url: "",
      huancui: "",
    };
  },
  async created() {
    this.imageUrl = this.$store.state.user.userInfoData.avatarImg;
    let res = await avatarList();
    if (res.data.status == 1) {
      this.avatarlist = res.data.data;
    }
  },
  methods: {
    //
    fanhui() {
      this.avatarImg = this.imageUrl;
    },
    // 点击默认头像出发的
    choice(url) {
      this.avatarImg = url.url;
      this.url = url.url;
    },
    handleAvatarSuccess(res, file) {
      this.avatarImg = res.data; // 用于一会保存在vuex中用
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isPNG = file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG & !isPNG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG & isPNG & isLt2M;
    },
    open() {
      this.$alert("您是否确定保存当前头像？", {
        confirmButtonText: "确定",
        callback: () => {
          // 点击完确定按钮 先判断当前选没选头像

          if (this.avatarImg == "") {
            this.$message({
              type: "warning",
              message: `请先选择头像！`,
            });
            return;
          } else if (this.avatarImg == this.$store.state.user.avatarImg) {
            this.$message({
              type: "warning",
              message: `请勿重复上传`,
            });
            return;
          }
          // 有选中的头像 就调接口
          setUpdateInfoApi({
            avatarImg: this.avatarImg,
          }).then((res) => {
            // 掉完接口 先判断接口调成功没
            if (res.data.status == 1) {
              // 成功 提示保存成功
              this.$message({
                type: "success",
                message: `保存成功`,
              });
              this.$store.commit("user/avatarImg", this.avatarImg);
              // 修改成功之后 把vuex中的数据更新到最新数据
              // 在修改头像之前 要先调用一下最新的用户信息
              getUserInfoApi().then((res) => {
                if (res.data.status == 1) {
                  this.userInfo = res.data.data;
                  this.$store.commit("user/userInfoData", res.data.data);
                }
              });
            }
          });
        },
      });
    },
  },
};
</script>

<style>
.setavatr {
  box-sizing: border-box;
  padding: 10px;
}
.active {
  background-color: black;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>