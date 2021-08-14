<template>
  <div id="doctor-admin" class="content-page">
      <self-breadcrumb
        :path-list="$store.state.pathList"
      ></self-breadcrumb>
      <div class="page-body">
          <el-table
            :data="appointmentList"
            stripe
            style="width: 100%">
            <el-table-column
            prop="id"
            label="挂号编号"
            >
            </el-table-column>
            <el-table-column
            prop="userId"
            label="挂号者编号"
            >
            </el-table-column>
            <el-table-column
            prop="doctorId"
            label="被挂号医生编号"
            >
            </el-table-column>
            <el-table-column
            prop="time"
            label="预约时间"
            >
            </el-table-column>
            <el-table-column
            label="操作">
                <template slot-scope="scope">
                    <!-- <el-button type="info" @click="edit(scope.row)">编辑</el-button> -->
                    <el-button type="danger" @click="remove(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
      </div>
  </div>
</template>

<script>
import {post,get,toFormData,regularDate} from '../../../service/request'
export default {
    mounted(){
        this.getAll()
    },
    data(){
        return {
            appointmentList:[]
        }
    },
    methods:{
        getAll(){
            get('/appointmentAdmin/query').then(({data})=>{
                if(!data.success){
                    this.$message.error(data.err)
                }
                else{
                    this.appointmentList = data.entity.map(e=>{
                        return {
                            ...e,
                            time:regularDate(new Date(parseInt(e.time)))
                        }
                    })
                }
            })
        },
        // edit(row){

        // },
        remove(row){
            console.log(row)
            post('/appointmentAdmin/delete',toFormData(row)).then(res=>{
                let {data} = res
                let {success} = data
                if(!success){
                    this.$message.error('删除失败')
                }
                else{
                    this.$message.success('删除成功')
                    // this.appointmentList.slice()
                    this.getAll()
                }
            })
        }
    },
    filters:{
        splitStr(str){
            return str.length > 30?str.substr(0,30) + '...' : str
        }
    }
}
</script>

<style>

</style>