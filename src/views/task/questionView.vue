<template>
  <div class="jsQuestion">
    <div class="header">
      <div class="nav flex">
        <div class="title">适用考试：</div>
        <div class="flex">
          <div class="but active">全部</div>
          <div class="but">期中考试</div>
          <div class="but">期末考试</div>
          <div class="but">其他考试</div>
        </div>
      </div>
      <div class="nav flex">
        <div class="title">试卷形式：</div>
        <div class="flex">
          <div class="but2 active">全部</div>
          <div class="but2">考生同卷</div>
          <div class="but2">随机顺序</div>
          <div class="but2">考生异卷</div>
        </div>
      </div>
      <div class="nav flex-items">
        <!-- 添加试题   -->
        <div>
          <el-button type="primary">策略组卷</el-button>
          <el-button type="primary">手动组卷</el-button>
          <el-button type="primary">导入试卷</el-button>
        </div>
        <div>
          <el-input
            v-model="search"
            suffix-icon="el-icon-search"
            placeholder="请输入内容"
          ></el-input>
        </div>
      </div>
    </div>
    <div class="subject">
      <div class="item">
        <div class="top flex-items">
          <div class="flex">
            <div class="time">创建时间：2017-08-11 18:30:33</div>
            <div class="but flex-items">
              <div class="mr-10 single">其中考试</div>
              <div class="mr-26 simple">考生同卷</div>
            </div>
            <div class="mr-26">满分：100</div>
            <div>使用次数：18次</div>
          </div>
          <div class="right">
            <img class="icon mr-10" src="../../assets/xinfeng.png" alt="" />
            <img class="icon mr-10" src="../../assets/wenjian.png" alt="" />
            <img class="icon mr-10" src="../../assets/ljt.png" alt="" />
          </div>
        </div>
        <div class="Below">
          <h2>1、Java程序设计其中考试试题</h2>
        </div>
      </div>
      <div class="item">
        <div class="top flex-items">
          <div class="flex">
            <div class="time">创建时间：2017-08-11 18:30:33</div>
            <div class="but flex-items">
              <div class="mr-10 single">其中考试</div>
              <div class="mr-26 simple">考生同卷</div>
            </div>
            <div class="mr-26">满分：100</div>
            <div>使用次数：18次</div>
          </div>
          <div class="right">
            <img class="icon mr-10" src="../../assets/xinfeng.png" alt="" />
            <img class="icon mr-10" src="../../assets/wenjian.png" alt="" />
            <img class="icon mr-10" src="../../assets/ljt.png" alt="" />
          </div>
        </div>
        <div class="Below">
          <h2>1、Java程序设计其中考试试题</h2>
        </div>
      </div>
      <div class="item">
        <div class="top flex-items">
          <div class="flex">
            <div class="time">创建时间：2017-08-11 18:30:33</div>
            <div class="but flex-items">
              <div class="mr-10 single">其中考试</div>
              <div class="mr-26 simple">考生同卷</div>
            </div>
            <div class="mr-26">满分：100</div>
            <div>使用次数：18次</div>
          </div>
          <div class="right">
            <img class="icon mr-10" src="../../assets/xinfeng.png" alt="" />
            <img class="icon mr-10" src="../../assets/wenjian.png" alt="" />
            <img class="icon mr-10" src="../../assets/ljt.png" alt="" />
          </div>
        </div>
        <div class="Below">
          <h2>1、Java程序设计其中考试试题</h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: "",
    };
  },
};
</script>

<style lang="scss" scoped>
.jsQuestion {
  padding: 25px;
  & .header {
    box-sizing: border-box;
    width: 100%;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 10px;
    & .nav {
      margin: 18px 0;
      & .title {
        font-weight: 800;
        font-family: 楷体;
      }
      & .but {
        border-radius: 15px;
        padding: 2px 23px;
        color: #c4c5c9;
        margin-left: 13px;
        border: 1px solid #c4c5c9;
      }
      & .but2 {
        border-radius: 15px;
        padding: 2px 20px;
        color: #c4c5c9;
        margin-left: 12px;
        border: 1px solid #c4c5c9;
      }
    }
  }
  & .subject {
    & .item {
      border-radius: 10px;
      box-sizing: border-box;
      margin: 20px 0;
      padding: 18px;
      width: 100%;
      background-color: #fff;
      border: 1px solid #c4c5c9;
      & .top {
        color: #b1b1b1;
        font-size: 18px;
        & .time {
          margin-right: 35px;
        }
        & .single {
          border-radius: 5px;
          padding: 4px 10px;
          color: #fff;
          background-color: #f76353;
        }
        & .simple {
          border-radius: 5px;
          color: #fff;
          padding: 4px 10px;
          background-color: #7dd798;
        }
      }
      & .Below {
        & h2 {
          font-size: 20px;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
