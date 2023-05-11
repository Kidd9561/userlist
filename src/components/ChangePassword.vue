<template>
  <el-dialog
      :modelValue="dialogVisible"
      title="修改密码"
      width="500px"
      :before-close="handleClose"
  >
    <el-form label-width="120px" label-position="left">
      <el-form-item label="用户名">
        {{user.name}}
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="newPasswd" type="password" />
      </el-form-item>
      <el-form-item label="确认密码">
        <el-input v-model="confirmPasswd" type="password" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="handleSend">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>

import { ElMessage } from "element-plus"
import { ModifyPasswd } from "../api/tableApi.js"
import sha1 from "js-sha1";

export default {
  name:"changePassword",
  props:{
    dialogVisible: Boolean,
    closeDialog: Function,
    user: {type:Object, default:{name:""}}
  },

  data() {
    return {
      newPasswd:"",
      confirmPasswd:"",
    }
  },
  methods: {
    handleSend(){
      if(this.passwd === ""){
        ElMessage({
          showClose: true,
          message: '请填入密码',
          type: 'error'
        })
        return;
      }
      if(this.newPasswd !== this.confirmPasswd){
        console.log(this.newPasswd)
        console.log(this.confirmPasswd)
        ElMessage({
          showClose: true,
          message: '两次输入密码不相同',
          type: 'error'
        })
        return;
      }
      const passwdSha1 = sha1((this.user.name+this.newPasswd+"CPCCR"))
      const sendParam = {
        name: this.user.name,
        passwd: passwdSha1
      }
      ModifyPasswd(sendParam).then(() => this.handleClose())
    },
    handleClose() {
      Object.assign(this.$data,this.$options.data())
      this.closeDialog();
    },
  },
}

</script>


<style scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
