<template>
  <div id="login" class="fix-page">
      <div class="login-block">
          <div class="block-title">
              用户登录
          </div>
          <el-form label-position="left" label-width="120px" :model="user">
            <el-form-item label="手机号：">
                <el-input v-model="user.phone"></el-input>
            </el-form-item>
            <el-form-item label="密码：">
                <el-input v-model="user.password"></el-input>
            </el-form-item>
            <el-form-item label="账户类型：">
                <el-select v-model="user.type">
                    <el-option value="u" label="普通用户"></el-option>
                    <el-option value="d" label="宠物医生"></el-option>
                    <el-option value="a" label="管理员"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label-width="0">
                <div class="btn-con">
                    <el-button type="primary" @click="startLogin">登录</el-button>
                    <el-button @click="toRegister">注册</el-button>
                </div>
            </el-form-item>
          </el-form>
      </div>
  </div>
</template>

<script>
import {get,post,toFormData} from '../service/request'
export default {
    data(){
        return {
            user:{
                phone:'',
                type:'u',
                password:''
            }
        }
    },
    methods:{
        startLogin(){
            let {phone,password,type} = this.user
            if(!phone || !password){
                this.$message.error('账号和密码必填')
                return
            }
            let formData = toFormData({phone,password})
            post(`/login/${type}`,formData,{
                headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                }
            })
            .then(({data})=>{
                if(!data.success){
                    this.$message.error(data.err)
                }
                else{
                    this.$message({
                        type:'success',
                        message:'欢迎您'
                    })
                    let typeMap = {
                        'u':2,
                        'd':3,
                        'a':5
                    }
                    console.log(data.entity[0])
                    this.$store.commit('setUser',{...data.entity[0],type:typeMap[type]})
                    let path = ''
                    switch(type){
                        case 'u':path = 'appointment-register';break;
                        case 'd':path = 'appointment-list';break;
                        case 'a':path = 'appointment-admin';break;
                    }
                    this.$router.push('/home/' + path)
                }
            })
        },

        toRegister(){
            this.$router.push('/register')
        }
    }
}
</script>

<style lang="less">
    #login{
        background-color: black;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        .login-block{
            border: 1px solid white;
            padding: 40px 40px 10px 40px;
            color:white;
            border-radius: 5px;

            .block-title{
                text-align: center;
                font-size: 20px;
                padding-bottom: 30px;
            }

            .el-form--label-left .el-form-item__label{
                color:white;
            }

            .btn-con{
                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: center;
                padding-top: 20px;
            }
        }
    }

</style>