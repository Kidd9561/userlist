<template>
  <el-dialog
      :modelValue="dialogVisible"
      title="重置绑定"
      width="500px"
      :before-close="handleClose"
  >
    <el-form label-width="120px" label-position="right">
      <el-form-item label="用户名">
        <div style="text-align: center; width: 200px">{{user.name}}</div>
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

import {ElMessageBox} from "element-plus"
import {ResetBound} from "../api/tableApi.js"

export default {
  name:"resetBound",
  props:{
    dialogVisible: Boolean,
    closeDialog: Function,
    user:{type: Object, default:{name:""}}
  },
  data() {
    return {
    }
  },
  methods: {
    handleSend(){
      ElMessageBox.confirm('确定重置绑定?',{
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      }).then(() => {
            ResetBound({name: this.user.name}).then(() => this.handleClose())
          })
    },
    handleClose() {
      this.closeDialog();
    },
  }
}

</script>


<style scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
