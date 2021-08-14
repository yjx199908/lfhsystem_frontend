<template>
  <div id="collection-admin" class="content-page">
      <self-breadcrumb
        :path-list="$store.state.pathList"
      ></self-breadcrumb>
      <div class="page-body">
          <el-table
            :data="petList"
            stripe
            style="width: 100%">
            <el-table-column
            prop="id"
            label="宠物编号"
            >
            </el-table-column>
            <el-table-column
            prop="name"
            label="宠物名"
            >
            </el-table-column>
            <el-table-column
            prop="photo"
            label="宠物图片地址"
            >
                <template slot-scope="scope">
                    <el-tooltip class="item" effect="dark" :content="scope.row.petImgSrc" placement="bottom">
                        <a :href="scope.row.petImgSrc">{{scope.row.petImgSrc|splitStr}}</a>
                    </el-tooltip>
                </template>
            </el-table-column>
            <el-table-column
            label="操作">
                <template slot-scope="scope">
                    <el-button type="info" @click="edit(scope.row)">编辑</el-button>
                    <el-button type="danger" @click="remove(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-button>添加宠物</el-button>
      </div>
  </div>
</template>

<script>
import {get,post,toFormData,regularDate} from '../../../service/request'
export default {
    data(){
        return {
            petList:[],
            pet:{
                id:-1,
                name:'',
                photo:''
            }
        }
    },
    methods:{
        getAll(){
            get('/collectionAdmin/query').then(({data})=>{
                if(!data.success){
                    this.$message.error('获取宠物列表失败')
                }
                else{
                    this.petList = data.entity
                }
            })
        },
        edit(row){
            post('/collectionAdmin/update',toFormData(row)).then(({data})=>{
                if(!data.success){
                    this.$message.error('更新失败')
                }
                else{
                    this.$message.success('更新成功')
                    this.getAll()
                }
            })
        },
        remove(row){
            post('/collectionAdmin/delete',toFormData(row)).then(({data})=>{
                if(!data.success){
                    this.$message.error('删除失败')
                }
                else{
                    this.$message.success('删除成功')
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