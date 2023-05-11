<script>
import sha1 from 'js-sha1'
import { GetValidateCode, LogIn } from "../api/loginApi.js"
export default {
	name: 'login',
	data() {
		return {
			user: {
				user: '',
        passwd: '',
				ValidateID: '',
				ValidateCode: ''
			},
      password:'',
			imageUrl: ''
		}
	},
	methods: {
    LoginActivity() {
      localStorage.setItem('userName', this.user.user)
      this.user.passwd = sha1((this.user.user+this.password+"CPCCR"))
      LogIn(this.user).then(res => {
        if(res !== undefined) {
          console.log(res)
          localStorage.setItem('token', res.token)
          this.$router.push("table")
        }
      })
    }
	},
  beforeMount() {
    let _this = this
    localStorage.removeItem("token")
    this.user.ValidateID = this.$uuid.v1()
    GetValidateCode({ValidateID:this.user.ValidateID}).then(res => _this.imageUrl = "data:image/ipeg;base64,"+res.body.image);
   }
}
</script>

<template>
	<div class="container">
    <el-card class="login_canvas">
      <div class="login_title">登&#12288录</div>

      <el-form label-width="120px" label-position="left">
        <el-form-item label="用户名">
          <el-input v-model="user.user" />
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="password" type="password" />
        </el-form-item>
        <el-form-item label="验证码">
          <el-input style="width: 200px;" v-model="user.ValidateCode" />
          <el-image style="width: 100px; height: 25px; margin-left: 25px" :src="imageUrl"/>
        </el-form-item>
        <el-form-item>
          <el-button @click="LoginActivity" class="login_button">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>

	</div>
</template>

<style scoped>
.container{
  width: 1200px;
}
.login_canvas {

  margin: auto;
  width: 600px;

}

.login_title {
  font-size: 25px;
  text-align: center;
  margin-bottom: 40px;
}

.login_button{
  margin-left: 25%;
}


</style>
