<template>
  <el-dialog
      :modelValue="dialogVisible"
      title="新增用户"
      width="500px"
      :before-close="handleClose"
  >
    <el-form label-width="120px" label-position="left">
      <el-form-item label="用户名">
        <el-input v-model="user.name" />
      </el-form-item>
      <el-form-item label="支部名称">
        <el-input v-model="user.displayname" />
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="user.passwd" type="password" />
      </el-form-item>
      <el-form-item label="确认密码">
        <el-input v-model="confirmPasswd" type="password" />
      </el-form-item>
      <el-form-item label="授权期限">
        <el-select v-model="value" class="m-2" placeholder="Select" size="large">
          <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.name"
              :value="item.value"
          />
        </el-select>
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
import { CreateUser } from "../api/tableApi.js"

export default {
  name:"newUser",
  props:{
    dialogVisible: Boolean,
    closeDialog: Function
  },
  data() {
    return {
      user: {
        name: '',
        passwd: '',
        displayname: '',
        validity_period: ''
      },
      options:[{
        name:"一个月",
        value: 30
      },{
        name:"两个月",
        value: 60
      },{
        name:"一季度",
        value: 90
      },{
        name:"半年",
        value: 180
      },{
        name:"一年",
        value: 365
      }],
      value:30,
      confirmPasswd:"",
    }
  },
  methods: {
    handleSend(){
      if(this.user.name === ""){
        ElMessage({
          showClose: true,
          message: '请填入用户名',
          type: 'error'
        })
        return;
      }
      if(this.user.displayname === "") {
        ElMessage({
          showClose: true,
          message: '请填入支部名称',
          type: 'error'
        })
        return;
      }
      if(this.user.passwd === ""){
        ElMessage({
          showClose: true,
          message: '请填入密码',
          type: 'error'
        })
        return;
      }
      if(this.user.passwd !== this.confirmPasswd){
        ElMessage({
          showClose: true,
          message: '两次输入密码不相同',
          type: 'error'
        })
        return;
      }
      this.user.validity_period = this.value
      CreateUser(this.user).then(() => this.handleClose())
    },
    handleClose() {
      Object.assign(this.$data,this.$options.data())
      this.closeDialog()
    },
  }
}

</script>


<style scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
