<template>
  <div class="adminlogin">
    <el-row>
      <el-col :span="24">
        <img src="../assets/logo.png">
        <div>
          <el-form :model="ruleForm" :rules="rules" ref="loginInfo" label-width="0px">
            <el-form-item prop="userName">
              <el-input v-model="ruleForm.userName" placeholder="用户名" class="custominput"></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input type="password" v-model="ruleForm.password" placeholder="密码"  class="custominput"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="login('loginInfo')">登录</el-button>
              <el-button @click="resetLogin('loginInfo')">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios'
import store from "../utils/storeUtils";
// import { loginRequest } from "../../utils/api";
export default {
  name: "adminlogin",
  data() {
    return {
      ruleForm: {
        userName: "",
        password: ""
      },
      rules: {
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  store,
  methods: {
    login: function(ruleForm) {
      this.$refs.loginInfo.validate(valid => {
        if (valid) {
          // var password = this.$MD5(this.ruleForm.password);
          this.loginRequest("/api/login", {
            username: this.ruleForm.userName,
            password: this.ruleForm.password
          })
            .then(response => {
              debugger
              if (response.status == 200) {
                var data = response.data;
                if (data.result) {
                  localStorage.setItem("userName", data.userName);
                  this.$store.commit("setUserName", data.userName);
                  this.$router.push({ path: "/content" });
                } else {
                  this.$message({ message: data.Message, type: "error" });
                }
              }
            })
            .catch(e => {
              console.log(e);
            });
        } else {
          return false;
        }
      });
    },
    resetLogin: function(param) {
      this.$refs[param].resetFields();
    }
  }
};
</script>
<style scoped>
.el-col {
  margin: 10px auto;
  text-align: center;
}
.el-input {
  width: 300px!important;
}
</style>
