<template>
  <div id="comment-admin" class="content-page">
      <self-breadcrumb
        :path-list="$store.state.pathList"
      ></self-breadcrumb>
      <div class="page-body">
          <el-table
            :data="commentList"
            stripe
            style="width: 100%">
            <el-table-column
            prop="id"
            label="评价编号"
            >
            </el-table-column>
            <el-table-column
            prop="userId"
            label="评价者编号"
            >
            </el-table-column>
            <el-table-column
            prop="doctorId"
            label="被评价医生编号"
            >
            </el-table-column>
            <el-table-column
            prop="time"
            label="评价时间"
            >
            </el-table-column>
            <el-table-column
            label="操作">
                <template slot-scope="scope">
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
            commentList:[]
        }
    },
    methods:{
        remove(row){
            post('/commentAdmin/delete',toFormData(row)).then(res=>{
                let {data} = res
                let {success} = data
                if(success){
                    this.$message.success('操作成功')
                }
                else{
                    this.$message.error('操作失败')
                    this.getAll()
                }
            })
        },
        getAll(){
            get('/commentAdmin/query',{
                params:{}
            }).then(({data})=>{
                if(!data.success){
                    this.$message.error('数据获取失败')
                }
                else{
                    this.commentList = data.entity
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