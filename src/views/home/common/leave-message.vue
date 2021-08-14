<template>
  <div id="leave-message" class="content-page">
      <self-breadcrumb
        :path-list="$store.state.pathList"
      ></self-breadcrumb>
      <div class="query-con">
          <el-row :gutter="20">
            <el-col :span="12">
                <el-select
                    v-model="targetDoctor.hospitalId" 
                    placeholder="请选择医院"
                    @change="adjustDoctorList"
                    >
                    <el-option 
                        v-for="item in hospitalList"
                        :key="item.value"
                        :value="item.value"
                        :label="item.name"
                        >
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="12">
                <el-select v-model="targetDoctor.doctorId" placeholder="请选择医生">
                    <el-option
                        v-for="item in targetDocList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                        >
                    </el-option>
                </el-select>
            </el-col>
          </el-row>
      </div>
      <br />
      <br />
      <div class="leave-message-con">
          <el-input :rows="30" v-model="leaveMessage" type="textarea" placeholder="请输入留言"></el-input>
      </div>
      <el-button type="primary" plain style="margin-top:10px" @click="submitLeaveMessage">提交</el-button>
  </div>
</template>

<script>
import {post,get,toFormData,regularDate} from '../../../service/request'

export default {
    data(){
        return {
            hospitalList:[
                {
                    name:'上海市第一人民医院',
                    value:0
                },
                {
                    name:'复旦大学附属儿科医院',
                    value:1
                },
                {
                    name:'上海市第十医院',
                    value:2
                }
            ],
            targetDoctor:{
                hospitalId:'',
                doctorId:''
            },
            targetDocList:[],
            leaveMessage:''
        }
    },
    mounted(){
        get('/share/hospital-list').then(({data})=>{
            if(!data.success){
                this.$message.error('请检查网络!')
            }
            else{
                this.hospitalList = data.entity.map(element=>{
                    return {
                        name:element.name,
                        value:element.id
                    }
                })
            }
        })
    },
    methods:{
        adjustDoctorList(e){
            get('/share/doctor-by-hospital',{
                params:{
                    hospitalId:e
                }
            }).then(({data})=>{
                if(!data.success){
                    this.$message.error(data.err)
                }
                else{
                    this.targetDocList = data.entity.map(element=>{
                        return {
                            name:element.name,
                            id:element.id
                        }
                    })
                }
            })
        },
        submitLeaveMessage(){
            let data = {...this.targetDoctor,userId:this.$store.state.user.id,content:this.leaveMessage,time:regularDate(new Date())}
            post('/leaveMessage',toFormData(data)).then(({data})=>{
                if(!data.success){
                    this.$message.error('提交失败')
                }
                else{
                    this.$message.success('提交成功')
                }
            })
        }
    }
}
</script>

<style lang="less">
    #leave-message{
        .btn-con{
            display: flex;
            flex-direction: row;
            justify-content: flex-end;
            align-items: center;
        }

    }
</style>