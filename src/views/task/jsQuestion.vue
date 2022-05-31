<template>
  <div class="jsQuestion">
    <!-- 头部菜单 -->
    <div class="header">
      <div class="nav flex">
        <div class="title">所属题型：</div>
        <div class="flex">
          <div class="but active">全部(344)</div>
          <div class="but">单选题(144)</div>
          <div class="but">多选题(144)</div>
          <div class="but">判断题(75)</div>
          <div class="but">排序题(14)</div>
          <div class="but">填空题(36)</div>
          <div class="but">简答题(45)</div>
        </div>
      </div>
      <div class="nav flex">
        <div class="title">难易程度：</div>
        <div class="flex">
          <div class="but2 active">全部</div>
          <div class="but2">简单</div>
          <div class="but2">中等</div>
          <div class="but2">困难</div>
        </div>
      </div>
      <div class="nav flex-items">
        <!-- 添加试题   -->
        <div>
          <el-button type="primary" @click="openDialogVisible"
            >添加试题</el-button
          >
          <el-button type="primary">批量导入</el-button>
          <el-button type="primary">加入公共习题库</el-button>
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
    <!-- 主体部分 -->
    <div class="subject mt-10">
      <div class="item mt-10" v-for="item in data" :key="item.id">
        <div class="top flex-items">
          <div class="flex">
            <div class="time">
              创建时间：<span>{{ item.createdAt }}</span>
            </div>
            <div class="but flex-items">
              <div class="mr-10 single">{{ formatType(item.type) }}</div>
              <div class="mr-26 simple">{{ formatLevel(item.level) }}</div>
            </div>
            <div>使用次数：18次</div>
          </div>
          <div class="right">
            <img
              class="icon smallHand mr-10"
              @click="modifyquestion(item)"
              src="../../assets/wenjian.png"
              alt=""
            />
            <img
              class="icon smallHand mr-10"
              src="../../assets/ljt.png"
              @click="open(item.id)"
              alt=""
            />
          </div>
        </div>
        <div class="Below">
          <div class="title ptb-15">{{ item.title }}</div>
          <div class="mt-10">
            <el-radio class="radio" disabled v-model="item.answer" label="A"
              >A.<span>{{ item.questionA }}</span></el-radio
            >
            <el-radio class="radio" disabled v-model="item.answer" label="B"
              >B.<span>{{ item.questionB }}</span></el-radio
            >
            <el-radio
              v-if="item.questionC"
              class="radio"
              disabled
              v-model="item.answer"
              label="C"
              >C.<span>{{ item.questionC }}</span></el-radio
            >
            <el-radio
              v-if="item.questionD"
              class="radio"
              disabled
              v-model="item.answer"
              label="D"
              >D.<span>{{ item.questionD }}</span></el-radio
            >
          </div>
          <div class="answer mt-10">
            答案：<span>{{ item.answer }}</span>
          </div>
        </div>
      </div>
      <!-- 分也 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[2, 5, 10, 20]"
        :page-size="pageSize"
        :page-count="pageCount"
        layout="total, sizes, prev, pager, next, jumper"
        :total="count"
      >
      </el-pagination>
    </div>
    <!-- 弹层 -->
    <div class="elasticLayer">
      <el-dialog
        :title="title"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose"
      >
        <div class="form">
          <div class="initem">
            <div class="lable">
              <span class="c-ff4400"> * </span>
              题目标题：
            </div>
            <div>
              <el-input
                v-model="elasticLayer.title"
                placeholder="请输入标题"
              ></el-input>
            </div>
          </div>
          <div
            class="initem"
            v-for="(option, index) in questionOptions"
            :key="option.id"
          >
            <div class="lable">
              <span v-if="index <= 1" class="c-ff4400"> * </span>
              <span> {{ option.label }}： </span>
            </div>
            <div>
              <el-input
                v-model="option.value"
                :placeholder="option.placeholder"
              ></el-input>
            </div>
            <div>
              <div
                @click="addQuestionOption"
                v-if="index == questionOptions.length - 1 && index < 3"
                class="operator smallHand el-icon-plus"
              ></div>
              <div
                @click="removeQuestionOption"
                v-if="index > 1 && index == questionOptions.length - 1"
                class="operator smallHand el-icon-minus"
              ></div>
            </div>
          </div>
          <div class="initem">
            <div class="lable"><span class="c-ff4400"> * </span>答案：</div>
            <div>
              <el-select
                class="choice"
                v-model="elasticLayer.answer"
                placeholder="请选择答案"
              >
                <el-option
                  v-for="item in questionOptions"
                  :key="item.key"
                  :label="item.label"
                  :value="item.key"
                >
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="initem">
            <div class="lable"><span class="c-ff4400"> * </span>难易程度：</div>
            <div>
              <el-select
                class="choice"
                v-model="elasticLayer.level"
                placeholder="请选择难度"
              >
                <el-option
                  v-for="item in answers"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
          </div>
        </div>
        <div slot="footer" class="flex-grid dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button v-if="isok" type="primary" @click="addToQuestion()"
            >确 定</el-button
          >
          <el-button v-else type="primary" @click="revisionQuestion()"
            >确 定</el-button
          >
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {
  getListInfoApi,
  getDeleteApi,
  getUpdateApi,
  getCreateApi,
} from "@/api/api";
export default {
  data() {
    return {
      search: "", // 搜索框的绑定值
      radio: "A", // 单选框默认选谁
      data: [], //需要渲染的数据
      currentPage: 1, // 当前第几页
      count: 0, //数据库共多少条
      pageCount: 0, //共多少页
      pageSize: 2, //每页渲染几条数据
      pageNum: 1, // 获取第几页
      // addQuestion 是弹层的数据
      elasticLayer: {},
      // 答案的选项的便利
      options: [
        {
          value: "A",
          label: "选项A",
        },
        {
          value: "B",
          label: "选项B",
        },
        {
          value: "C",
          label: "选项C",
        },
        {
          value: "D",
          label: "选项D",
        },
      ],
      // 难易程度便利的数据
      answers: [
        {
          value: 1,
          label: "简单",
        },
        {
          value: 2,
          label: "一般",
        },
        {
          value: 3,
          label: "困难",
        },
      ],
      // abcd选项渲染的数据
      questionOptions: [],
      dialogVisible: false, // 弹层是否打开
      questionOptionsTemp: [
        {
          id: 1,
          key: "A",
          label: "选项A",
          value: "",
          placeholder: "请输入选项A的值",
        },
        {
          id: 2,
          key: "B",
          label: "选项B",
          value: "",
          placeholder: "请输入选项B的值",
        },
        {
          id: 3,
          key: "C",
          label: "选项C",
          value: "",
          placeholder: "请输入选项C的值,非必填",
        },
        {
          id: 4,
          key: "D",
          label: "选项D",
          value: "",
          placeholder: "请输入选项D的值,非必填",
        },
      ],
      title: "",
      isok: null,
      answer: "",
    };
  },
  // 监听 选择答案的选项
  watch: {
    questionOptions(newValue) {
      let res = newValue.find((item) => item.key == this.elasticLayer.answer);
      this.elasticLayer.answer = !res ? "" : res.key;
    },
  },
  async created() {
    this.initFormPrams();
    localStorage.setItem("Num", 2);
    this.getListInfo();
  },
  methods: {
    // 添加题的的按钮事件
    openDialogVisible() {
      this.title = "添加试题";
      this.isok = true;
      this.initFormPrams();
      this.dialogVisible = true;
    },
    // 查询题库接口
    async getListInfo() {
      // console.log("走了查询接口");
      // console.log("每页渲染几条" + this.pageSize);
      // console.log("获取第几页" + this.pageNum);
      let res = await getListInfoApi({
        type: 1, // 1 单选
        pageSize: this.pageSize, // 每页渲染几条
        pageNum: Number(this.pageNum), // 获取第几页
      });
      if (res.data.status == 1) {
        this.data = res.data.data.rows; //  这个是需要渲染的 rows
        this.count = res.data.data.count; //数据库共多少条
        this.pageCount = res.data.data.pageCount; // 共多少页
        // console.log(this.data);
        // console.log("数据库共有" + res.data.data.count + "条数据");
        // console.log("共分为" + res.data.data.pageCount + "页");
      }
    },
    // 每页多少条
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      localStorage.setItem("Num", val);
      this.pageSize = Number(localStorage.getItem("Num"));
      this.getListInfo();
    },
    // 当前第几页
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.pageNum = val;
      this.getListInfo();
    },
    // 难易程度方法
    formatLevel(val) {
      switch (val) {
        case 1:
          return "简单";
        case 2:
          return "普通";
        case 3:
          return "困难";
      }
    },
    // 判断题目类型方法
    formatType(val) {
      switch (val) {
        case 1:
          return "单";
        case 2:
          return "多";
        case 3:
          return "填";
        case 4:
          return "问";
      }
    },
    // 是否确认删除的方法
    open(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.deletequestion(id);
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 删除接口
    async deletequestion(id) {
      let res = await getDeleteApi({
        id,
        type: 1,
      });
      if (res.data.status == 1) {
        // console.log(res);
        this.getListInfo();
      }
    },
    // 弹层的方法
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(() => {
          done();
        })
        .catch(() => {});
    },
    // 格式化创建时的入参
    formatFormPrams() {
      this.questionOptions.forEach((item) => {
        this.elasticLayer["question" + item.key] = item.value;
      });
    },
    // 减号的方法
    removeQuestionOption() {
      this.questionOptions.pop();
    },
    // 加号的方法
    addQuestionOption() {
      this.questionOptions.push(
        this.questionOptionsTemp[this.questionOptions.length]
      );
    },
    // 格式化弹层  清空
    initFormPrams() {
      this.elasticLayer = {
        type: 1,
        title: "",
        questionA: "",
        questionB: "",
        questionC: "",
        questionD: "",
        answer: "",
        level: "",
      };
      this.questionOptions = this.questionOptionsTemp.slice(0, 2);
    },
    // 校验方法
    getCheckResult() {
      let res = true;
      let rule = {
        title: "题目标题",
        questionA: "选项A",
        questionB: "选项B",
        questionC: "选项C",
        questionD: "选项D",
        answer: "答案",
        level: "难易程度",
      };
      this.formatFormPrams();
      for (let key in this.elasticLayer) {
        if (key == "questionC" || key == "questionD") continue;
        if (!this.elasticLayer[key]) {
          this.$message({
            type: "warning",
            message: rule[key] + "不能为空",
          });
          res = false;
          break;
        }
      }
      return res;
    },
    // 添加题接口   elasticLayer
    async addToQuestion() {
      // 添加题之前先校验 getCheckResult
      let validate = this.getCheckResult();
      if (!validate) return;
      this.formatFormPrams();
      let res = await getCreateApi(this.elasticLayer);
      if (res.data.status == 1) {
        this.$message({
          type: "success",
          message: "添加成功",
        });
        // console.log(res);
        this.getListInfo();
        this.initFormPrams();
        this.dialogVisible = false;
      }
    },
    // 修改题
    modifyquestion(item) {
      this.title = "修改试题";
      this.isok = false; // 这个是控制确定按钮的
      this.initFormPrams();
      let isCreateEvent = item instanceof PointerEvent;
      if (isCreateEvent) {
        console.log("这个是创建");
      } else {
        this.elasticLayer.title = item.title;
        let questionOptions = JSON.parse(
          JSON.stringify(this.questionOptionsTemp)
        );
        questionOptions[0].value = item.questionA;
        questionOptions[1].value = item.questionB;
        questionOptions[2].value = item.questionC;
        questionOptions[3].value = item.questionD;
        this.questionOptions = questionOptions.filter((item) => item.value);
        this.elasticLayer.answer = item.answer;
        this.elasticLayer.level = item.level;
        this.elasticLayer.id = item.id;
      }
      this.dialogVisible = true;
      // console.log("点击了修改题按钮，这是传回来的这道题的item:", item);
    },
    // 修改题接口
    async revisionQuestion() {
      console.log("点击了修改题接口的确定按钮");
      this.getCheckResult();
      let {
        id,
        type,
        title,
        questionA,
        questionB,
        questionC,
        questionD,
        answer,
        level,
      } = this.elasticLayer;
      let res = await getUpdateApi({
        id, // 必填 题目id
        type, // 必填 题目类型
        title: title, // 非必填 题目标题
        questionA: questionA, // 选项a,
        questionB: questionB, // 选项b,
        questionC: questionC, // 非必填 选项c,
        questionD: questionD, // 非必填 选项d,
        answer: answer, // 答案  如果是单选题则传 A 或者  B 或  C 或 D (大写)
        level: level, // 难度系数  1：简单  2：普通 3：困难
      });
      if (res.data.status == 1) {
        this.$message({
          type: "success",
          message: "修改成功",
        });
        this.getListInfo();
        this.dialogVisible = false;
        this.initFormPrams();
      } else {
        this.$message({
          type: "warning",
          message: "修改失败",
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.jsQuestion {
  padding: 25px;
  min-width: 900px;
  height: calc(100vh - 60px);
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
        padding: 2px 5px;
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
      box-sizing: border-box;
      padding: 18px;
      border: 1px solid #e2e5ea;
      border-radius: 10px;
      width: 100%;
      background-color: #fff;
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
        & .radio {
          width: 190px;
          padding: 20px 0;
          text-align: center;
        }
        & .answer {
          padding-left: 45px;
        }
      }
    }
  }
  & .elasticLayer {
    ::v-deep .el-dialog {
      padding: 40px 10px;
      width: 450px !important;
    }
    & .form {
      display: flex;
      flex-direction: column;
      gap: 20px 0;
      & .initem {
        display: grid;
        align-items: center;
        grid-template-columns: 80px auto 62px;
      }
      & .operator {
        display: inline-block;
        padding: 5px;
        margin: 3px;
        background-color: #e9e2e250 !important;
        font-size: 15px;
      }
      & .lable {
        text-align: right;
      }
      & .choice {
        width: 100%;
      }
    }
  }
}
</style>
