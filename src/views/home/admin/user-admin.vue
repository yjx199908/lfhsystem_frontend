<template>
  <div id="user-admin" class="content-page">
      <self-breadcrumb
        :path-list="$store.state.pathList"
      ></self-breadcrumb>
      <div class="page-body">
          <el-table
            :data="userList"
            stripe
            style="width: 100%">
            <el-table-column
            prop="id"
            label="用户编号"
            >
            </el-table-column>
            <el-table-column
            prop="name"
            label="用户名"
            >
            </el-table-column>
            <el-table-column
            label="头像地址"
            >
                <template slot-scope="scope">
                    <a :href="scope.row.avator">{{scope.row.avator}}</a>
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
            userList:[]
        }
    },
    methods:{
        edit(row){

        },
        remove(row){
            post('/userAdmin/delete',toFormData(row)).then(({data})=>{
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
            get('/userAdmin/query').then(({data})=>{
                let {success,entity} = data
                if(success){
                    console.log(entity)
                    this.userList = entity
                }   
                else{
                    this.$message.error('获取数据失败')
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