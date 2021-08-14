<template>
  <div id="message-admin">
      <self-breadcrumb
        :path-list="$store.state.pathList"
      ></self-breadcrumb>
      <div class="page-body">
          <el-table
            :data="leaveMessageList"
            stripe
            style="width: 100%">
            <el-table-column
            prop="userId"
            label="用户Id"
            width="180">
            </el-table-column>
            <el-table-column
            prop="time"
            label="时间"
            width="180">
            </el-table-column>
            <el-table-column
            prop="doctorId"
            label="医生Id">
            </el-table-column>
            <el-table-column
            label="内容">
                <template slot-scope="scope">
                    <el-tooltip class="item" effect="dark" :content="scope.row.content" placement="bottom">
                        <span :title="scope.row.content">{{scope.row.content|splitStr}}</span>
                    </el-tooltip>
                </template>
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
import {post,get,toFormData} from '../../../service/request'
export default {
    mounted(){
        this.getAll()
    },
    data(){
        return {
            leaveMessageList:[]
        }
    },
    methods:{
        remove(row){
            post('/messageAdmin/delete',toFormData(row)).then(({data})=>{
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
            get('/messageAdmin/query').then(({data})=>{
                let {success,entity} = data
                if(!success){
                    this.$message.error('获取数据失败')
                }
                else{
                    this.leaveMessageList = entity
                }
            })
        }
    },
    filters:{
        splitStr(str){
            return str.length > 30?str.substr(0,30) + '...':str
        }
    }
}
</script>

<style>

</style>