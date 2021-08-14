<template>
  <div id="appointment-list" class="content-page">
      <self-breadcrumb
        :path-list="$store.state.pathList"
      ></self-breadcrumb>
      <div class="page-body">
        <div class="left">
          <div class="title">
            待处理预约
          </div>
          <div class="table-con">
            <el-table
              :data="unhandleList"
              style="width: 100%">
              <el-table-column
                prop="time"
                label="时间"
                width="180">
              </el-table-column>
              <el-table-column
                prop="name"
                label="姓名"
                width="180">
              </el-table-column>
              <el-table-column
                label="操作"
                >
                 <template slot-scope="scope">
                  <el-button
                    size="mini"
                    @click="receive(scope.$index, scope.row)">
                    接收
                  </el-button>
                  <el-button
                    size="mini"
                    type="danger"
                    @click="ignore(scope.$index, scope.row)">
                    忽略
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <div class="right">
          <div class="title">
            已同意预约
          </div>
          <div class="table-con">
            <el-table
              :data="handledList"
              style="width: 100%">
              <el-table-column
                prop="time"
                label="时间"
                width="180">
              </el-table-column>
              <el-table-column
                prop="name"
                label="姓名"
                width="180">
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import {post,get,toFormData,regularDate} from '../../../service/request'
export default {
  mounted(){
    this.getList()
  },
  data(){
    return{
      unhandleList:[],
      handledList:[]
    }
  },
  methods:{
    receive(index,row){
      console.log('row',row)
      let postData = {
        id:row.aId,
        userId:row.userId,
        doctorId:row.doctorId,
        time:new Date(row.time).getTime(),
        status:4
      }
      post('/appointmentList/responseAppointment',toFormData(postData)).then(({data})=>{
        if(data.success){
          this.$message.success('操作成功')
          this.getList()
        }
        else{
          this.$message.console.error('操作失败');
        }
      })
    },
    ignore(index,row){
      console.log('row',row)
      let postData = {
        id:row.aId,
        userId:row.userId,
        doctorId:row.doctorId,
        time:new Date(row.time).getTime(),
        status:3
      }
      post('/appointmentList/responseAppointment',toFormData(postData)).then(({data})=>{
        if(data.success){
          this.$message.success('操作成功')
          this.getList()
        }
        else{
          this.$message.console.error('操作失败');
        }
      })
    },
    getList(){
      get('/appointmentList/getAll',{
        params:{
          doctorId:this.$store.state.user.id
        }
      }).then(({data})=>{
        let allList = data.entity.map(appointment=>{
          return {
            ...appointment,
            time:new Date(parseInt(appointment.time)).toDateString()
          }
        })
        this.unhandleList = allList.filter(appointment=>{
          return appointment.status == 2
        })
        this.handledList = allList.filter(appointment=>{
          return appointment.status == 3 || appointment.status == 4
        })
      })
    }
  }
}
</script>

<style lang="less">
  #appointment-list{
    .page-body{
      flex:1;
      overflow: auto;
      display: flex;
      flex-direction: row;
      align-items: stretch;

      .left,.right{
        width:49.9%;

        .title{
          color:#333;
          box-sizing: border-box;
          padding:10px 15px;
          border-bottom: 1px solid rgba(237,237,237,1);
        }
      }

      .left{
        border-right: 1px solid rgba(237,237,237,1);
      }
    }
  }
</style>