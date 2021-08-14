<template>
  <div id="appointment-register" class="content-page">
      <self-breadcrumb
        :path-list="$store.state.pathList"
      ></self-breadcrumb>
      <div class="query-con">
          <el-row :gutter="20">
            <el-col :span="8">
                <el-select
                    placeholder="请选择医院"
                    v-model="doctor.hospitalId"
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
            <el-col :span="8">
                <el-input 
                    v-model="doctor.name" 
                    placeholder="请输入医生名字"
                    >
                </el-input>
            </el-col>
            <el-col :span="8">
                <div class="btn-con">
                    <el-button type="primary" @click="queryDoctor">查询</el-button>
                    <el-button @click="allDoctor">全部</el-button>
                </div>
            </el-col>
          </el-row>
      </div>
      <div class="query-result-con">
          <doctor-item v-for="item in doctorList"
            :doctor="item"
            :key="item.name"
            @item-click="itemClick"
            >
          </doctor-item>
      </div>
      <div class="dialog-con" v-show="cpntsControl.dialogVisible">
          <div class="modal" @click="()=>{cpntsControl.dialogVisible=false;cpntsControl.commentLoading=false}"></div>
          <div class="dialog-box">
              <div class="info-side">
                  <img :src="choseDoctor.photoSrc?choseDoctor.photoSrc:`https://img1.baidu.com/it/u=1210670642,2106177593&fm=26&fmt=auto&gp=0.jpg`" class="dialog-avator"/>
                  <div class="dialog-info-item">
                      <el-row>
                          <el-col :span="8">姓名：</el-col>
                          <el-col :span="16">{{choseDoctor.name}}</el-col>
                      </el-row>
                  </div>
                  <div class="dialog-info-item">
                      <el-row>
                          <el-col :span="8">医院：</el-col>
                          <el-col :span="16">{{choseDoctor.hospital}}</el-col>
                      </el-row>
                  </div>
                  <div class="dialog-info-item">
                      <el-row>
                          <el-col :span="8">联系：</el-col>
                          <el-col :span="16">{{choseDoctor.phone}}</el-col>
                      </el-row>
                  </div>
                  <el-button v-if="choseDoctor.status == 'pending'" disabled>正在查询状态...</el-button>
                  <el-button v-if="choseDoctor.status == 'ready'" type="primary" @click="chooseTime">申请挂号</el-button>
                  <el-button v-if="choseDoctor.status == 'checking'" disabled>正在审核</el-button>
                  <el-button v-if="choseDoctor.status == 'rejected'"  @click="chooseTime">申请失败,再次申请</el-button>
                  <el-button v-if="choseDoctor.status == 'success'" disabled>已申请成功</el-button>
                  <el-link @click="toInterrogation">问诊</el-link>
              </div>
              <div 
                class="comment-side" 
                v-loading="cpntsControl.commentLoading"
                element-loading-text="正在加载评论..."
                >
                   <ul class="infinite-list" v-infinite-scroll="load">
                        <li v-for="item,index in choseDoctorCommentList" class="infinite-list-item" :key="index">
                            <img :src="item.avatorSrc" class="avator" />
                            <div class="right-of-avator">
                                <div class="name-con">{{item.name}}</div>
                                <div class="comment-con">
                                    {{item.content}}
                                </div>
                            </div>
                        </li>
                    </ul>
              </div>
          </div>
      </div>
      <el-dialog
        title="选择预约时间"
        :visible.sync="cpntsControl.chooseTimeDialogVisible"
        width="30%"
        :modal-append-to-body="false"
        >
        <el-date-picker
            v-model="appointmentTime"
            type="datetime"
            placeholder="选择日期时间">
        </el-date-picker>

        <span slot="footer" class="dialog-footer">
            <el-button @click="cpntsControl.chooseTimeDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="appointmentApply">确 定</el-button>
        </span>
      </el-dialog>
  </div>
</template>

<script>
import DoctorItem from 'cpnts/doctor-item'
import {post,get,toFormData} from '../../../service/request'

let statusArr = ['ready','pending','checking','rejected','success']

let hospitalMap = {}

export default {
    mounted(){
        get('/share/hospital-list').then(({data})=>{
            if(!data.success){
                this.$message.error('获取医院列表失败')
                return
            }
            console.log(data.entity)
            this.hospitalList = data.entity.map(v=>{
                return {...v,value:v.id}
            })
            for(let i = 0;i < data.entity.length;i++){
                hospitalMap[data.entity[i].id] = data.entity[i].name
            }
        })        
        get('/share/doctor-hospital').then(({data})=>{
            if(!data.success){
                this.$message.error('获取医生列表失败')
                return
            }
            this.doctorList = data.entity
            this.doctorListStore = data.entity
        })
        get('/appointmentRegister/getOwnAppointment',{
            userId:this.$store.state.user.id
        }).then(({data})=>{
            if(!data.success){
                this.$message.error('获取预约信息失败')
            }
            else{
                this.appointmentList = data.entity
            }
        })
    },
    data(){
        return {
            appointmentList:[],
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
            doctor:{
                hospitalId:'',
                name:''
            },
            doctorList:[],
            doctorListStore:[],
            cpntsControl:{
                dialogVisible:false,
                commentLoading:true,
                chooseTimeDialogVisible:false
            },
            choseDoctor:{
                photoSrc:'',
                name:'',
                hospital:'',
                status:'pending'
            },
            choseDoctorCommentList:[],
            appointmentTime:'',
            doctorIdChosen:-1
        }
    },
    components:{
        DoctorItem
    },
    methods:{
        itemClick(doctor){
            //点击
            console.log(doctor)
            this.choseDoctor=doctor
            this.choseDoctor.status = 'ready'
            this.doctorIdChosen = doctor.id
            this.cpntsControl.dialogVisible = true
            this.cpntsControl.commentLoading = true
            this.appointmentList.forEach(e=>{
                if(e.doctorId == doctor.id){
                    console.log(e)
                    this.choseDoctor.status = statusArr[e.status]
                    return
                }
            })
            get('/appointmentRegister/getComment',{params:{doctorId:doctor.id}}).then(({data})=>{
                this.cpntsControl.commentLoading = false
                console.log(data)
                if(!data.success){
                    this.$message.error('评论获取失败')
                    this.choseDoctorCommentList = []
                }
                else{
                    this.choseDoctorCommentList = data.entity
                }
            })
            
        },
        load(){
            console.log('开始加载')
            this.choseDoctorCommentList.push()
        },
        toInterrogation(){
            let doctorId = this.doctorIdChosen
            this.$router.push({
                path:'/home/expert-interrogation',
                query:{
                    doctorId:doctorId
                }
            })
        },
        chooseTime(){
            this.cpntsControl.chooseTimeDialogVisible = true
        },
        appointmentApply(){
            let time = new Date(this.appointmentTime).getTime();
            let formData = toFormData({
                userId:this.$store.state.user.id,
                doctorId:this.doctorIdChosen,
                time:time
            })
            post('/appointmentRegister/postAppointment',formData,{
                headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                }
            }).then(({data})=>{
                if(!data.success){
                    this.$message.error(data.err)
                }
                else{
                    this.$message({
                        type:'success',
                        message:'预约已提交'
                    })
                    let aObj = {
                        id:data.entity.id,
                        userId:this.$store.state.user.id,
                        doctorId:this.choseDoctor.id,
                        time:this.appointmentTime,
                        status:2
                    }
                    this.appointmentList.push(aObj)
                    this.cpntsControl.chooseTimeDialogVisible = false
                    this.cpntsControl.dialogVisible = false
                }
            })
        },
        queryDoctor(){
            this.doctorList = this.doctorListStore.filter(doctor=>{
                return ((this.doctor.hospitalId != -1)?(doctor.hospital == hospitalMap[this.doctor.hospitalId]):true) && (doctor.name.indexOf(this.doctor.name) != -1 || this.doctor.name == '')
            })       
        },
        allDoctor(){
            this.doctorList = this.doctorListStore.filter(doctor=>{
                return true
            })
        }
    }
}
</script>

<style lang="less">
    #appointment-register{
        .btn-con{
            display: flex;
            flex-direction: row;
            justify-content: flex-end;
            align-items: center;
        }

        .query-result-con{
            flex:1;
            box-sizing: border-box;
            padding:15px 2px;
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            flex-wrap: wrap;
            overflow-y: scroll;
        }

        .dialog-con{
            position: absolute;
            top:0;
            left:0;
            right: 0;
            bottom: 0;
            z-index:2000;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;

            .modal{
                position: absolute;
                top:0;
                left:0;
                right: 0;
                bottom: 0;
                z-index: 2001;
                background-color: rgba(0,0,0,0.5);
            }

            .dialog-box{
                width:800px;
                height: 500px;
                background-color: white;
                position: relative;
                z-index: 2002;
                border-radius: 3px;
                display: flex;
                flex-direction: row;
                align-items: stretch;
                animation: dialogShow 0.3s;

                .dialog-avator{
                    width:180px;
                    margin:0 auto;
                    border-radius: 2px;
                }

                .info-side{
                    width:30%;
                    border-right: 1px solid rgba(137,137,137,0.2);
                    display: flex;
                    flex-direction: column;
                    justify-content: space-evenly;
                    box-sizing: border-box;
                    padding:0 15px;
                }

                .comment-side{
                    width:69%;

                    .infinite-list{
                        height: 90%;
                        overflow: auto;
                        list-style: none;

                        .infinite-list-item{
                            display: flex;
                            flex-direction: row;
                            margin:15px 0;

                            .avator{
                                width:30px;
                                height: 30px;
                                border-radius: 50%;
                                margin-right: 10px;
                            }

                            .right-of-avator{
                                flex:1;
                                box-sizing: border-box;
                                padding-right: 15px;

                                .name-con{
                                    font-size: 11px;
                                    color:cornflowerblue
                                }

                                .comment-con{
                                    font-size: 13px;
                                    box-sizing: border-box;
                                    padding:5px 0;
                                    border-bottom: 1px solid rgba(180,180,180,0.2);
                                }
                            }
                        }

                    }
                }
            }
        }
    }
</style>