<template>
  <div id="hospital-admin" class="content-page">
      <self-breadcrumb
        :path-list="$store.state.pathList"
      ></self-breadcrumb>
      <div class="page-body">
          <el-table
            :data="hospitalList"
            stripe
            style="width: 100%">
            <el-table-column
            prop="id"
            label="医院编号"
            >
            </el-table-column>
            <el-table-column
            prop="name"
            label="医院名"
            >
            </el-table-column>
            <el-table-column
            label="操作">
                <template slot-scope="scope">
                    <el-button type="info" @click="edit(scope.row)">编辑</el-button>
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
            hospitalList:[]
        }
    },
    methods:{
        edit(row){

        },
        remove(row){
            post('/hospitalAdmin/delete',toFormData(row)).then(({data})=>{
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
            get('/hospitalAdmin/query').then(({data})=>{
                let {success,entity} = data
                if(success){
                    this.hospitalList = entity
                }
                else{
                    this.$message.error('获取数据失败')
                }
            })
        }
    },
    filters:{
    }
}
</script>

<style>

</style>