<template>
  <el-dialog
      :modelValue="dialogVisible"
      title="封禁用户"
      width="500px"
      :before-close="handleClose"
  >
    <el-form label-width="120px" label-position="left">
      <el-form-item label="用户名">
        {{user.username}}
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="handleClose">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
export default {
  name:"banUser",
  props:{
    dialogVisible: Boolean,
    closeDialog: Function
  },
  data() {
    return {
      user: {
        username: '',
        password: '',
        ValidateID: '',
        ValidateCode: ''
      },
      value:"",
    }
  },
  methods: {
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
