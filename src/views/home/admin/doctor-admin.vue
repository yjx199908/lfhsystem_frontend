<template>
  <div id="doctor-admin" class="content-page">
      <self-breadcrumb
        :path-list="$store.state.pathList"
      ></self-breadcrumb>
      <div class="page-body">
          <el-table
            :data="doctorList"
            stripe
            style="width: 100%">
            <el-table-column
            prop="id"
            label="医生编号"
            >
            </el-table-column>
            <el-table-column
            prop="name"
            label="医生名"
            >
            </el-table-column>
            <el-table-column
            label="头像地址"
            >
                <template slot-scope="scope">
                    <a :href="scope.row.avator">{{scope.row.avator|splitStr}}</a>
                </template>
            </el-table-column>
            <el-table-column
            label="图片地址"
            >
                <template slot-scope="scope">
                    <a :href="scope.row.photo">{{scope.row.photo|splitStr}}</a>
                </template>
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
import {post,get,toFormData} from '../../../service/request'
export default {
    mounted(){
        this.getAll()
    },  
    data(){
        return {
            doctorList:[]
        }
    },
    methods:{
        edit(row){

        },
        remove(row){
            post('/doctorAdmin/delete',toFormData(row)).then(({data})=>{
                let {success,entity} = data
                if(success){
                    this.$message.success('操作成功')
                    this.getAll()
                }
                else{
                    this.$message.error('操作失败')
                }
            })
        },
        getAll(){
            get('/doctorAdmin/query').then(({data})=>{
                console.log(data)
                let {success,entity} = data
                if(success){
                    this.doctorList = entity
                }
                else{
                    this.$message.error('获取数据失败')
                }
            })
        }
    },
    filters:{
        splitStr(str){
            if(!str){
                str = ''
            }
            return str.length > 30?str.substr(0,30) + '...' : str
        }
    }
}
</script>

<style>

</style>