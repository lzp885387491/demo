<template>
  <div class="custom-tree-container">
    <div class="block">
      <h1>权限管理</h1>
      <div>
        <div class="mt-10">
          <el-button type="primary" @click="append">添加</el-button>
        </div>
        <!-- default-expand-all  默认展开 -->
        <el-tree
          :data="data"
          show-checkbox
          node-key="id"
          :expand-on-click-node="false"
        >
          <span class="custom-tree-node" slot-scope="{ data }">
            <span>{{ data.title + "---------" + data.id }}</span>
            <span>
              <el-button type="text" size="mini" @click="modify(data)">
                编辑
              </el-button>
              <el-button type="text" size="mini" @click="append(data)">
                添加
              </el-button>
              <el-button
                v-if="!data.children.length"
                type="text"
                size="mini"
                @click="openElasticLayer(data)"
              >
                删除
              </el-button>
            </span>
          </span>
        </el-tree>
      </div>
    </div>
    <!-- 弹层 -->
    <div>
      <el-dialog
        :title="label"
        :visible.sync="isok"
        width="30%"
        :before-close="handleClose"
      >
        <div v-if="label == '编辑权限' || label == '新建权限'">
          <div class="flex-center mtb-10">
            <div class="mr-5">权限名称：</div>
            <div>
              <el-input
                placeholder="请输入名称"
                v-model="elasticLayer.title"
                clearable
              ></el-input>
            </div>
          </div>
          <div class="flex-center mtb-10">
            <div class="mr-5">权限类型：</div>
            <div>
              <el-select
                v-model="elasticLayer.type"
                placeholder="请选择权限类型"
              >
                <el-option
                  v-for="item in typeOptions"
                  :key="item.id"
                  :label="item.key"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="flex-center mtb-10" v-if="label != '新建权限'">
            <div class="mr-5">所在目录：</div>
            <el-select v-model="elasticLayer.pid" placeholder="请选择所在目录">
              <el-option
                v-for="item in options"
                :key="item.id"
                :label="item.title"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </div>
        </div>
        <span v-else>你确定要删除这些数据吗？</span>
        <span slot="footer" class="dialog-footer flex-center">
          <el-button @click="isok = false">取 消</el-button>
          <el-button
            v-if="label == '编辑权限'"
            type="primary"
            @click="getPermissionUpdate()"
            >确 定</el-button
          >
          <el-button
            v-else-if="label == '新建权限'"
            type="primary"
            @click="appendData()"
            >确 定</el-button
          >
          <el-button
            type="primary"
            v-else-if="label == '删除权限'"
            @click="remove()"
            >确 定</el-button
          >
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {
  getPermissionListApi,
  getPermissionCreateApi,
  getPermissionUpdateApi,
  getPermissionDeleteApi,
} from "@/api/api";
export default {
  data() {
    return {
      data: [],
      datas: "",
      obj: [], // 修改权限获取的原本参数
      isok: false, // 是否打开弹层
      // elasticLayer 弹层的数据
      typeOptions: [
        {
          id: 1,
          value: 1,
          key: "左侧栏",
        },
        {
          id: 2,
          value: 2,
          key: "页面",
        },
        {
          id: 3,
          value: 3,
          key: "功能",
        },
      ], // 类型的选择数据
      options: [], // 所在目录选择器的数据
      label: "弹层的标题", // 弹层的标题
      elasticLayer: {
        title: "", // 标题
        type: "", // 类型 1代表左侧栏  2代表页面  3代表功能
        pid: "", // 父id pid如果等于某项id 就是这个的子项    如果是null 就代表没有子项
      },
      deleteId: "", // 删除的id
      rows: [], // 查询权限返回的rows
    };
  },
  created() {
    this.getPermissionList();
  },
  methods: {
    // 修改权限的方法
    modify(data) {
      this.isok = true;
      this.label = "编辑权限";
      this.elasticLayer.title = data.title;
      this.elasticLayer.type = data.type;
      this.obj = data;
      this.options = this.rows;
    },
    // 修改权限的接口
    async getPermissionUpdate() {
      let { title, type, pid } = this.elasticLayer;
      let { id } = this.obj;
      let res = await getPermissionUpdateApi({
        id,
        title,
        type,
        pid: pid ? pid : null,
      });
      if (res.data.status == 1) {
        this.$message({
          message: "修改成功",
          type: "success",
        });
        this.getPermissionList();
        this.elasticLayer = {
          title: "", // 标题
          type: "", // 类型 1代表左侧栏  2代表页面  3代表功能
          pid: "", // 父id pid如果等于某项id 就是这个的子项    如果是null 就代表没有子项
        };
        this.isok = false;
      }
    },
    // 获取权限列表接口的方法
    async getPermissionList() {
      let res = await getPermissionListApi();
      if (res.data.status == 1) {
        let list = res.data.data.rows;
        this.rows = list;
        // 第一种方法
        // list.forEach((item) => {
        //   let parent = list.find((parentItem) => parentItem.id == item.pid);
        //   if (!item.pid) return;
        //   parent.children = parent.children || [];
        //   parent.children.push(item);
        // });
        // this.data = list.filter((item) => !item.pid);

        // 第二种方法
        list.forEach((item) => {
          item.children = list.filter((childItem) => childItem.pid == item.id);
        });
        this.data = list.filter((item) => !item.pid);
      }
    },
    // append 打开弹层
    append(data) {
      this.elasticLayer = {
        title: "", // 标题
        type: "", // 类型 1代表左侧栏  2代表页面  3代表功能
        pid: "", // 父id pid如果等于某项id 就是这个的子项    如果是null 就代表没有子项
      };
      this.isok = true;
      this.label = "新建权限";
      this.elasticLayer.pid = data.id;
    },
    // 添加的方法
    async appendData() {
      let { title, type, pid } = this.elasticLayer;

      let res = await getPermissionCreateApi({ title, type, pid });
      if (res.data.status == 1) {
        this.$message({
          message: "新建成功！",
          type: "success",
        });
        this.isok = false;
        this.getPermissionList();
      }
    },
    // 删除
    openElasticLayer(datas) {
      this.isok = true; // 打开弹层
      this.label = "删除权限";
      this.deleteId = datas.id;
    },
    // remove 删除的方法
    async remove() {
      let res = await getPermissionDeleteApi({ id: this.deleteId });
      if (res.data.status == 1) {
        this.$message({
          message: "删除成功！",
          type: "success",
        });
        console.log("删除成功", res.data);
        this.isok = false;
        this.getPermissionList();
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
  },
};
</script>

<style>
.block {
  width: 500px;
  padding: 20px;
}
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 15px;
  padding-left: 10px;
}
</style>