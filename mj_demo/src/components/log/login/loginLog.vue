<template>

  <div class='user'>
    <el-container class='container'>
      <el-header class='header' :height="height">
        <el-button type="success" icon="el-icon-plus" size="small" round @click="add">添加</el-button>
        <el-button type="primary" icon="el-icon-edit" size="small" round @click="edit">编辑</el-button>
        <el-button type="danger" icon="el-icon-delete" size="small" round @click="del">删除</el-button>
        <div class='search'>
          <el-button type="warning" size="small" round @click="search">
            <i :class="icon"></i>{{searchTest}}</el-button>
        </div>
        <div class='doSearch'>
          <div>
            用户名：
            <el-input placeholder="请输入用户名" size="small" prefix-icon="el-icon-search" v-model="userName" class='input'>
            </el-input>
            添加时间：
            <el-date-picker v-model="date" type="datetimerange" size="small" :picker-options="pickerOptions2" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" align="right">
            </el-date-picker>
            <el-button class="doSearchButton" type="success" icon="el-icon-search" size="small" round @click="doSearch">搜索</el-button>
          </div>
        </div>
      </el-header>
      <el-main class='main'>
        <template>
          <el-table v-loading="loading" :data="users" style="width: 100%" stripe @selection-change="changeFun">
            <el-table-column type="selection" width="55" class="selection" prop='id'></el-table-column>
            <el-table-column prop="userName" label="用户名">
            </el-table-column>
            <el-table-column prop="email" label="邮箱">
            </el-table-column>
            <el-table-column prop="phone" label="电话">
            </el-table-column>
            <el-table-column prop="addTime" label="添加时间" width="230">
            </el-table-column>
          </el-table>
        </template>
      </el-main>
      <el-footer height="20px" v-if="pageInfo.page">
        <div class='pageInfo'>
          <el-button-group>
            <el-button type="primary" icon="el-icon-arrow-left" size="mini" :disabled="pageInfo.isFirstPage ? true : false" @click="firstPage">上一页</el-button>
            <el-button type="primary" size="mini" :disabled="pageInfo.isLastPage ? true : false" @click="nextPage">下一页
              <i class="el-icon-arrow-right el-icon--right"></i>
            </el-button>
          </el-button-group>
        </div>
      </el-footer>
    </el-container>
    <mj_user_dialog :title="title" :dialogStatus="dialogStatus" :userId="userId" @changeDialogStatus="changeDialogStatus" @userList="userList"></mj_user_dialog>
  </div>

</template>

<script>
import mj_user_dialog from "./loginLogDialog";
import store from "../../../utils/storeUtils";
import jquery from "jquery";
export default {
  name: "mj-user",
  data() {
    return {
      userName: "",
      addTime: "",
      multipleSelection: [],
      users: [],
      dialogStatus: false,
      userId: "",
      title: "",
      loading: true,
      height: "40px",
      searchTest: "展开搜索",
      icon: "el-icon-arrow-down",
      showSearch: false,
      date: "",
      pickerOptions2: "",
      pageInfo: { page: true }
    };
  },
  components: {
    mj_user_dialog: mj_user_dialog
  },
  methods: {
    add: function() {
      this.userId = "";
      this.dialogStatus = true;
      this.title = "添加用户";
    },
    edit: function() {
      if (this.multipleSelection.length != 1) {
        this.$message({
          message: "请先勾选一条数据!",
          type: "error"
        });
        return;
      }
      this.userId = this.multipleSelection[0].id;
      this.dialogStatus = true;
      this.title = "编辑用户信息";
    },
    del: function() {
      if (this.multipleSelection.length != 1) {
        this.$message({
          message: "请先勾选一条数据!",
          type: "error"
        });
        return;
      } else {
        this.userId = this.multipleSelection[0].id;
      }
      this.$confirm("此操作将删除该用户, 是否继续?", "确认删除", {
        type: "warning"
      }).then(() => {
        this.loading = true;
        this.deleteRequest("/admin/yhgl/delete/" + this.userId)
          .then(response => {
            this.loading = false;
            if (response.status == 200) {
              var data = response.data;
              if (data.Result) {
                this.userList();
                this.$message({ message: data.Message, type: "success" });
              } else {
                this.$message({ message: data.Message, type: "error" });
              }
            }
          })
          .catch(e => {
            this.loading = false;
            console.log(e);
          });
      });
    },
    search: function() {
      if (this.showSearch) {
        this.height = "40px";
        this.searchTest = "展开搜索";
        this.icon = "el-icon-arrow-down";
        this.showSearch = false;
      } else {
        this.height = "110px";
        this.searchTest = "收起搜索";
        this.icon = "el-icon-arrow-up";
        this.showSearch = true;
      }
    },
    doSearch: function() {
      console.log(this.userName);
      console.log(this.date);
      var param = "?userName=" + this.userName;
      if (this.date) {
        param =
          param + "&startTime=" + this.date[0] + "&endTime=" + this.date[1];
      }
      this.loading = true;
      this.getRequest("/admin/yhgl/list" + param)
        .then(response => {
          this.loading = false;
          if (response.status == 200) {
            var data = response.data;
            if (data.Result) {
              this.users = data.Message;
            } else {
              this.$message({ message: data.Message, type: "error" });
            }
          }
        })
        .catch(err => {
          this.loading = false;
          console.log(e);
        });
    },
    changeFun: function(val) {
      this.multipleSelection = val;
    },
    changeDialogStatus: function() {
      this.dialogStatus = false;
    },
    userList: function(pageNum,pageSize) {
      var url="/api/user/list";
      if(!pageNum){
        pageNum = 0;
      }
      if(!pageSize){
        pageSize = 10;
      }
      // url = url + "?pageNum="+pageNum+"&pageSize="+pageSize;
      this.loading = true;
      this.$http
        .get(url)
        .then(response => {
          this.loading = false;
          if (response.status == 200) {
            var data = response.data;
            if (data.Result) {
              this.users = data.Message;
              this.pageInfo.pages = data.Message.pages;
              this.pageInfo.pageNum = data.Message.pageNum;
              this.pageInfo.pageSize = data.Message.pageSize;
              this.pageInfo.isFirstPage = data.Message.isFirstPage;
              this.pageInfo.isLastPage = data.Message.isLastPage;
              console.log(this.pageInfo);
            } else {
              this.$message({ message: data.Message, type: "error" });
            }
          }
        })
        .catch(e => {
          this.loading = false;
          console.log(e);
        });
    },
    firstPage: function() {
      var pageNum = this.pageInfo.pageNum;
      pageNum = pageNum - 1 -1;
      this.userList(pageNum,this.pageInfo.pageSize);
    },
    nextPage: function() {
      var pageNum = this.pageInfo.pageNum;
      pageNum = pageNum -1 + 1;
      this.userList(pageNum,this.pageInfo.pageSize);
    }
  },
  mounted: function() {
    this.userList();
  }
};
</script>

<style scoped>
.user {
  height: 100%;
  width: 100%;
}
.container {
  height: 100%;
  width: 100%;
}
.main {
  height: 100%;
  width: 100%;
}
.el-main {
  padding: 10px;
}
.search {
  float: right;
}
.doSearch {
  background-color: rgb(236, 243, 227);
  margin-top: 20px;
  padding: 10px;
}
.doSearchButton {
  float: right;
}
.input {
  width: 300px;
}
.pageInfo {
  text-align: right;
}
</style>

