<template>
  <el-dialog
      :modelValue="dialogVisible"
      title="续费"
      width="500px"
      :before-close="handleClose"
  >
    <el-form label-width="120px" label-position="left">
      <el-form-item label="用户名">
        {{user.name}}
      </el-form-item>
      <el-form-item label="续费时长">
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
        <el-button type="primary" @click="handleSent">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import {ExtendValidity} from "../api/tableApi.js"
import {ElMessage} from "element-plus";
export default {
  name:"extendValidity",
  props:{
    dialogVisible: Boolean,
    closeDialog: Function,
    user:{type:Object, default: {name:""}}
  },
  data() {
    return {
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
      value: 30,
    }
  },
  methods: {
    handleSent(){
      const params = {
        name: this.user.name,
        day: this.value
      }
      ExtendValidity(params).then(() => {
        ElMessage({
          showClose: true,
          message: '续费成功',
          type: 'success'
        })
        this.handleClose()
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
