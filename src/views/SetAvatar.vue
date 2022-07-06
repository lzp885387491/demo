<template>
  <div>
    <el-upload
      class="avatar-uploader"
      action="/api//upload/image"
      :data="from"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
    <el-button @click="open" type="primary">保存头像</el-button>
  </div>
</template>

<script>
import { setUpdateInfoApi, getUserInfoApi } from "../api/api";
// 上传头像功能
// 1、把头像上传到oss服务器
// 2、oss服务器会把你上传的图片地址返回给你
// 3、头像在你的电脑本地磁盘中 ，上传到oss（object  storage save）服务器
// 如何上传？ element-UI =》上传组件
// 上传一个文件到这个文件中
// 上传成功后，去console.log(组件地址)
export default {
  data() {
    return {
      imageUrl: "",
      from: {
        type: 2,
      },
      avatarImg: "",
      userInfo: "", // 用户信息接口返回值
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.avatarImg = res.data; // 用于一会保存在vuex中用
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    async gituserinfo() {
      let res = await getUserInfoApi();
      if (res.data.status == 1) {
        this.userInfo = res.data.data;
        this.$store.commit("userInfoData", this.userInfo);
      }
    },
    open() {
      this.$alert("您是否确定保存当前头像？", {
        confirmButtonText: "确定",
        callback: () => {
          setUpdateInfoApi({
            avatarImg: this.avatarImg,
          }).then((res) => {
            if (res.data.status == 1) {
              this.$message({
                type: "success",
                message: `保存成功`,
              });
            }
            // 修改成功之后 把vuex中的数据更新到最新数据
            // 在修改头像之前 要先调用一下最新的用户信息
            getUserInfoApi().then((res) => {
              if (res.data.status == 1) {
                this.userInfo = res.data.data;
                this.$store.commit("userInfoData", this.userInfo);
              }
            });
          });
        },
      });
    },
  },
};
</script>

<style>
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