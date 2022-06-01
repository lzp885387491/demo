<template>
  <div>
    <div class="main">
      <div class="aside">
        <div class="calendar">
          <el-calendar class="rili" v-model="value"></el-calendar>
        </div>
        <div class="task">
          <h4>Today Task</h4>
          <div class="list">
            <div class="flex-items">
              <el-checkbox class="checkboxTxt">
                <span class="title">35135</span>
              </el-checkbox>
              <span class="text">08:00 - 10:00 AM</span>
            </div>
            <div class="flex-items">
              <el-checkbox class="checkboxTxt">
                <span class="title">35135</span>
              </el-checkbox>
              <span class="text">11:00 - 12:00 AM</span>
            </div>
            <div class="flex-items">
              <el-checkbox class="checkboxTxt">
                <span class="title">35135</span>
              </el-checkbox>
              <span class="text">13:00 - 16:00 AM</span>
            </div>
          </div>
        </div>
      </div>
      <div class="container">
        <div class="notify">
          <div class="title flex-items">
            <h4>Notification</h4>
            <span class="right-txt">view all</span>
          </div>
          <div class="major">
            <div class="subject flex">
              <div class="icon-box flex-center">
                <div class="el-icon-edit-outline"></div>
              </div>
              <div class="info">
                <div class="title">
                  jsaf kuqhbiu fhqie uyhiq hii dasdfqf ugy
                </div>
                <div class="describe">18 Aug 2020 - 1000 AM</div>
                <el-button class="el-button-yl" type="warning"
                  >asdsadqf</el-button
                >
              </div>
              <div class="circular">
                <img class="circular-img" src="../../assets/1.png" alt="" />
              </div>
            </div>
          </div>
        </div>
        <div class="chat">
          <div class="flex">
            <div class="flex-center">
              <h1 class="title mr-10">Team Chat</h1>
              <div>总人数：{{ count }}个人！</div>
            </div>
          </div>
          <div class="container2">
            <div v-for="(item, index) in news" :key="index">
              <div
                ref="talkchat"
                class="mine"
                v-if="item.avatarName == data.avatarName"
              >
                <div>
                  <div class="info-item mine">
                    <div class="item-tx mr-5">
                      {{ setName(item.avatarName) }}
                    </div>
                    <div class="item-name">{{ item.avatarName }}</div>
                  </div>
                  <div class="msg mr-35">
                    {{ item.msg }}
                  </div>
                </div>
              </div>
              <div ref="talkchat" v-else>
                <div class="info-item">
                  <div class="item-tx mr-5">{{ setName(item.avatarName) }}</div>
                  <div class="item-name">{{ item.avatarName }}</div>
                </div>
                <div class="msg">
                  {{ item.msg }}
                </div>
              </div>
            </div>
          </div>
          <footer class="footer flex-items">
            <el-input
              clear="ipt-msg"
              placeholder="请输入内容"
              v-model="msg"
              clearable
            >
            </el-input>
            <el-button type="primary" class="sendOut" @click="sendSocketMsg">
              <span class="el-icon-s-promotion sendOut-icon"></span>
            </el-button>
          </footer>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getUserInfoApi } from "@/api/api";
export default {
  data() {
    return {
      value: new Date(),
      checked: false, // 多选框是否选中的
      msg: "", // 用户在聊天输入框输入的数据
      data: "", // 获取的当前用户的信息
      news: [], // 后端返回的消息体
      count: "",
    };
  },
  async created() {
    let res = await getUserInfoApi();
    if (res.data.status == 1) {
      this.data = res.data.data; // 把当前登录的用户的信息赋值给data
    }
    window.addEventListener("keydown", this.keydown, true);
  },
  sockets: {
    userCount: function (count) {
      console.log("count", count);
      this.count = count;
    },
    connect: function () {
      //建立连接后调用的函数
      // console.log("socket connected...");
      // 进入聊天室
      this.$socket.emit("addUser", {
        userId: this.data.id,
        avatarName: this.data.avatarName,
      });
    },
    // message 是服务端返回的信息  这个res就是服务端定义的接口名
    receiveMsg: function (message) {
      // console.log("服务的返回的信息", message);
      // 获取聊天室返回的数据
      this.news.push(message);
      this.$nextTick(() => {
        let talk = this.$refs.talkchat;
        // console.log("this.$nextTick ~ talk", talk);
        talk[talk.length - 1].scrollIntoView(false);
      });
    },

    // 断开时调用的函数
    disconnect: function () {
      console.log("disconnect!");
      // 离开聊天
      this.$socket.emit("removeUser", {
        userId: this.data.id,
        avatarName: this.data.avatarName,
      });
    },
  },
  methods: {
    keydown(event) {
      if (event.key == "Enter") {
        this.sendSocketMsg();
        //使用KeyboardEvent.keyCode处理事件并将handled设置为true。
        event.preventDefault();
      }
    },
    setName(value) {
      let name = value.slice(0, 1);
      return name;
    },
    sendSocketMsg() {
      //向服务端发送消息
      if (this.msg == "") {
        this.$message({
          type: "warning",
          message: "请先输入内容",
        });
        return;
      } else {
        this.$socket.emit("sendMsg", {
          userId: this.data.id,
          type: 1,
          avatarName: this.data.avatarName,
          msg: this.msg,
        });
        this.msg = "";
      }
    },
  },
  destroyed() {
    window.removeEventListener("keydown", this.keydown, true);
  },
};
</script>

<style lang="scss" scoped>
::v-deep .el-calendar-day {
  max-width: 80px;
  max-height: 70px;
  text-align: center;
}

::v-deep .calendar {
  max-width: 100%;
  min-width: 370px;
  box-sizing: border-box !important;
}

::-webkit-scrollbar {
  width: 0 !important;
}

.main {
  height: calc(100vh - 60px - 20px);
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  & .aside {
    display: grid;
    grid-template-rows: 1fr auto;
    & .task {
      & h4 {
        padding-left: 20px;
      }
      & .list {
        background-color: #fafafc;
        display: grid;
        gap: 15px 0;
        padding: 20px;
        & .title {
          font-size: 16px;
        }
        & .text {
          font-size: 14px;
          color: #9491e3;
          font-weight: 700;
        }
      }
    }
  }
  & .container {
    display: grid;
    grid-template-rows: 220px auto;
    & .notify {
      & .right-txt {
        color: #e9d6b8;
      }
      & .major {
        height: 150px;
        & .subject {
          padding: 20px;
          border-radius: 10px;
          height: 100%;
          background-color: #58419b;
          box-sizing: border-box;
          min-width: 535px;
          position: relative;
          & .circular {
            width: 100px;
            height: 100px;
            position: absolute;
            bottom: 0;
            right: 0;
            & .circular-img {
              width: 100%;
              height: 100%;
            }
          }
          & .icon-box {
            width: 45px;
            height: 45px;
            background-color: #ffffff53;
          }
          & .el-icon-edit-outline {
            display: inline-block;
            color: #fff;
            font-size: 30px;
          }
          & .el-button-yl {
            margin-top: 20px;
            border-radius: 8px;
          }
          & .info {
            margin-left: 20px;
            & .title {
              font-size: 24px;
              color: #fff;
            }
          }
        }
      }
    }
    & .chat {
      height: 100%;
      overflow-y: hidden;
      position: relative;
      & .container2 {
        position: absolute;
        left: 0;
        bottom: 50px;
        height: calc(100% - 120px);
        overflow-y: scroll;
        width: 100%;
        & .info-item {
          padding: 10px;
          display: flex;
          align-items: center;
          & .item-tx {
            // 头像的
            width: 30px;
            height: 30px;
            background-color: #57419bab;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 50%;
            color: #fff;
          }
          & .item-name {
            font-size: 14px;
            color: #9491e3;
          }
        }
        & .msg {
          font-size: 14px;
          min-height: 16px;
          display: inline-block;
          margin-left: 35px;
          background-color: #57419b95;
          padding: 8px 12px;
          border-radius: 4px;
        }
        & .mine {
          display: flex;
          flex-direction: row-reverse;
        }
      }
      & .footer {
        background-color: #fff;
        width: 100%;
        height: 40px;
        display: flex;
        align-items: center;
        position: absolute;
        bottom: 0;
        & .sendOut {
          width: 80px;
          height: 40px;
          & .sendOut-icon {
            font-size: 20px;
          }
        }
      }
    }
  }
}
</style>