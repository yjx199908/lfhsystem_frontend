<template>
  <div id="register" class="fix-page">
      <div class="register-block">
          <div class="block-title">
              用户注册
          </div>
          <el-form label-position="left" label-width="120px" :model="user">
            <el-form-item label="手机号：">
                <el-input v-model="user.phone"></el-input>
            </el-form-item>
            <el-form-item label="账户类型：">
                <el-select v-model="user.type">
                    <el-option value="u" label="普通用户"></el-option>
                    <el-option value="d" label="宠物医生"></el-option>
                    <el-option value="a" label="管理员：请由DBA直接添加" disabled></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="密码：">
                <el-input v-model="user.password"></el-input>
            </el-form-item>
            <el-form-item label="确认密码：">
                <el-input v-model="user.verifyPassword"></el-input>
            </el-form-item>
            <el-form-item label-width="0">
                <div class="btn-con">
                    <el-button type="primary" @click="startRegister">注册</el-button>
                    <el-button>取消</el-button>
                </div>
            </el-form-item>
          </el-form>
      </div>
  </div>
</template>

<script>
import {get,post,toFormData} from '@/service/request'

export default {
    data(){
        return {
            user:{
                phone:'',
                type:'u',
                password:'',
                verifyPassword:''
            }
        }
    },
    methods:{
        startRegister(){
            let {phone,password,verifyPassword,type} = this.user; 
            if(!password || password != verifyPassword){
                this.$message.error('请正确填写密码')
                return
            }
            let formData = toFormData({phone,password});
            post(`/register/${type}`,formData,{
                headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                }
            }).then(({data})=>{
                if(data.success){
                    this.$message({
                        type:'success',
                        message:'注册成功'
                    })
                    this.$router.push('/login')
                }
            })
        }
    }
}
</script>

<style lang="less">
    #register{
        background-color: black;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        .register-block{
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