<template>
  <div id="interrogation-feedback" class="content-page">
      <self-breadcrumb
        :path-list="$store.state.pathList"
      ></self-breadcrumb>
      <div class="page-body">
        <div v-if="!canOper">没有反馈目标,请从问诊页跳转</div>
        <div class="title" v-if="canOper">
            请对此次在线问诊做出评价
        </div>
        <div class="rate-con" v-if="canOper">
            <el-rate
                v-model="rate"
                show-text>
            </el-rate>
        </div>
        <div class="input-con" v-if="canOper">
            <el-input
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 4}"
                placeholder="请输入评论内容"
                v-model="content">
            </el-input>
        </div>
        <div class="btn-con" v-if="canOper">
            <el-button type="primary" @click="submit">提交</el-button>
            <el-button type="primary" plain>返回</el-button>
        </div>
        
      </div>
  </div>
</template>

<script>
import {post,get,toFormData,regularDate} from '../../../service/request'
export default {
    data(){
        return {
            rate:0,
            content:'',
            canOper:true,
            targetDoctorId:-1
        }
    },
    methods:{
        submit(){
            let {rate,content} = this
            let postData = {
                userId:this.$store.state.user.id,
                doctorId:this.targetDoctorId,
                rate,
                content,
                time:regularDate(new Date())
            }
            post('/interrogationFeedBack',toFormData(postData)).then(({data})=>{
                if(!data.success){
                    this.$message.error(data.err)
                }
                else{
                    this.$message.success('评论成功')
                    this.$router.back()
                }
            })
        }
    },
    mounted(){
        let query = this.$route.query
        if('doctorId' in query){
            this.targetDoctorId = query.doctorId
        }
        else{
            this.$message.error('请问诊后从评价医生按钮进入反馈界面')
            this.$router.push('/home/appointment-register')
        }
    }
}
</script>

<style lang="less">
    #interrogation-feedback{

        .page-body{
            flex:1;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;

            .rate-con{
                padding: 15px 0;
            }

            .input-con{
                width: 20%;
                padding:20px 0;
            }
        }
    }
</style>