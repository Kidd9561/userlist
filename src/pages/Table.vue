<script>
import newUser from "../components/NewUser.vue";
import changePassword from "../components/ChangePassword.vue";
import extendValidity from "../components/ExtendValidity.vue";
import resetBound from "../components/ResetBound.vue";
// import banUser from "../components/BanUser.vue";
import {SearchUser} from "../api/tableApi";
export default {
  name: 'user_list_table',
  components:{
    newUser,
    changePassword,
    extendValidity,
    resetBound
    // banUser
  },
  data() {
    return {
      newUserDia: false,
      changePasswordDia:false,
      extendValidityDia:false,
      resetBoundDia:false,
      searchOptions:{
        fuzzyname:"",
        page: 1,
        pagesize:15,
      },
      searchValue: "",
      total: 0,
      userList:[],
      selectedUser:{}
    }
  },
  methods: {
    searchUser() {
      this.searchOptions.fuzzyname = this.searchValue
      this.GetUsersTable()
    },
    closeNewUser(){
      this.newUserDia = false
      this.GetUsersTable()
    },
    openChangePassword(user){
      this.selectedUser = user
      this.changePasswordDia = true
    },
    closeChangePassword(){
      this.changePasswordDia = false
      this.GetUsersTable()
    },
    openExtendValidityDia(user){
      this.selectedUser = user
      this.extendValidityDia = true
    },
    closeExtendValidityDia(){
      this.extendValidityDia = false
      this.GetUsersTable()
    },
    openResetBoundDia(user){
      this.selectedUser = user
      this.resetBoundDia = true
    },
    closeResetBoundDia(){
      this.resetBoundDia = false
      this.GetUsersTable()
    },
    GetUsersTable(){
      const _this = this
      SearchUser(_this.searchOptions).then(res => {
        _this.userList = res.users
        _this.total = parseInt(res.total)
      })
    },
    handlePageChange(val){
      this.searchOptions.page = val
      this.GetUsersTable()
    }
    // closeBanUserDia(){
    //   this.banUserDia = false
    // },

  },
  beforeMount() {
    const token = localStorage.getItem("token")
    if(token){
      this.GetUsersTable();
    } else {
      this.$router.go(-1)
    }

  }
}
</script>

<template>
  <div>
    <div class="header_container"><h1 class="table_header">党员精品课&#12288授权系统</h1></div>
    <div class="table_search">
      <el-input placeholder="输入用户名/支部名称进行搜索" v-model="searchValue" style="width: 200px"/>
      <el-button @click="searchUser" style="margin-left: 20px">搜索</el-button>
      <el-button @click="newUserDia = true">新增用户</el-button>
    </div>
    <div class="table_container">
      <el-table :data="userList" border empty>
        <el-table-column prop="name" label="用户名" width="180px" fixed="left"/>
        <el-table-column prop="displayname"  label="支部名称" width="500px"/>
        <el-table-column prop="isbound" label="绑定" width="70px">
          <template #default="scope">
                <div> {{ scope.row.isbound > 0 ? "是" : "否" }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="expire" label="到期" width="100px"/>
        <el-table-column prop="validity_period" label="待激活授权时间" width="140px"/>
        <el-table-column prop="last_validity" label="上次授权时长" width="140px"/>
        <el-table-column prop="createtime" label="创建时间" width="100px"/>
        <el-table-column prop="activetime" label="上次激活时间"  width="120px"/>
        <el-table-column prop="operation" label="操作" width="180px" fixed="right">
          <template #default="scope">
            <div style="justify-content: center; display: flex ">
              <el-button link type="primary" size="small" @click="openChangePassword(scope.row)">密码修改</el-button>
              <el-button link type="primary" size="small" @click="openResetBoundDia(scope.row)">重置绑定</el-button>
<!--              <el-button link type="primary" size="small" @click="banUserDia = true">封禁</el-button>-->
              <el-button link type="primary" size="small" @click="openExtendValidityDia(scope.row)">续费</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="table_page">
      <el-pagination
          background
          layout="prev, pager, next"
          :total="total"
          :page-size="searchOptions.pagesize"
          @current-change="handlePageChange"
      />
    </div>
    <new-user :dialogVisible="newUserDia" :closeDialog="closeNewUser"/>
    <change-password :dialogVisible="changePasswordDia" :closeDialog="closeChangePassword" :user="selectedUser"/>
    <extend-validity :dialogVisible="extendValidityDia" :closeDialog="closeExtendValidityDia" :user="selectedUser"/>
    <reset-bound :dialogVisible="resetBoundDia" :closeDialog="closeResetBoundDia" :user="selectedUser"/>
<!--    <ban-user :dialogVisible="banUserDia" :closeDialog="closeBanUserDia"/>-->
  </div>
</template>

<style scoped>
.header_container{
  width: 100%;
}
.table_header{
  text-align: center;
  font-size: 50px;
  padding: 20px;
}
.table_search{
  padding: 20px;
}
.table_container{
  padding: 20px;
}
.table_page{
 padding: 0 20%;
}

</style>
