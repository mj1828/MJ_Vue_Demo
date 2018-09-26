<!-- Form -->
<template>
    <div class='mj-user-dialog'>
        <el-dialog :title="title" :visible.sync="showDialog" @close="close">
            <el-form :model="userInfo">
                <el-form-item label="用户名" :label-width="formLabelWidth">
                    <el-input v-model="userInfo.userName" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" :label-width="formLabelWidth">
                    <el-input type="password" v-model="userInfo.password" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="角色" :label-width="formLabelWidth">
                    <el-input v-model="userInfo.roleId" auto-complete="off"></el-input>
                </el-form-item>
                <!-- <el-form-item label="活动区域" :label-width="formLabelWidth">
                    <el-select v-model="userInfo.roleId" placeholder="请选择活动区域">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item> -->
                <el-form-item label="头像" :label-width="formLabelWidth">
                    <el-input v-model="userInfo.head" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" :label-width="formLabelWidth">
                    <el-input type="email" v-model="userInfo.email" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="电话" :label-width="formLabelWidth">
                    <el-input type="mobile" v-model="userInfo.phone" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="ensure">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
export default {
  props: ["dialogStatus", "userId", "title"],
  name: "mj_user_dialog",
  data() {
    return {
      showDialog: false,
      userInfo: {},
      formLabelWidth: "120px",
      id: ""
    };
  },
  methods: {
    cancel: function() {
      this.showDialog = false;
      this.$emit("changeDialogStatus", false);
    },
    ensure: function() {
      this.postRequest("/admin/yhgl/save", this.userInfo)
        .then(response => {
          if (response.status == 200) {
            var data = response.data;
            if (data.Result) {
              this.$emit("userList");
              this.$message({ message: data.Message, type: "success" });
            } else {
              this.$message({ message: data.Message, type: "error" });
            }
          }
        })
        .catch(e => {
          console.log(e);
        });
      this.showDialog = false;
      this.$emit("changeDialogStatus", false);
    },
    close: function() {
      this.showDialog = false;
      this.$emit("changeDialogStatus", false);
    }
  },
  watch: {
    userId(newValue, oldValue) {
      if (newValue) {
        this.$http
          .get("/admin/yhgl/user/" + newValue)
          .then(response => {
            if (response.status == 200) {
              var data = response.data;
              if (data.Result) {
                if (data.Message.length > 0) {
                  this.userInfo = data.Message[0];
                }
              } else {
                this.$message({ message: data.Message, type: "error" });
              }
            }
          })
          .catch(e => {
            console.log(e);
          });
      } else {
        this.userInfo = {};
      }
    },
    dialogStatus(newValue, oldValue) {
      this.showDialog = newValue;
    }
  }
};
</script>
