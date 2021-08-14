<template>
  <div id="pet-note" class="content-page">
    <self-breadcrumb
        :path-list="$store.state.pathList"
      ></self-breadcrumb>
      <div class="btn-con">
        <el-button type="primary" @click="dialogShow=true">添加</el-button>
      </div>
      <div class="note-body">
        <template>
          <el-table
            :data="noteList"
            style="width: 100%">
            <el-table-column
              prop="date"
              label="时间"
              width="280">
            </el-table-column>
            <el-table-column
              prop="petType"
              label="宠物种类"
              width="180">
              <template slot-scope="scope">
                <span>{{typeMap[scope.row.petType]}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="petName"
              label="宠物名称"
              width="180">
            </el-table-column>
            <el-table-column
              prop="content"
              label="内容">
            </el-table-column>
          </el-table>
        </template>
      </div>

      <el-dialog
        title="添加笔记"
        :visible.sync="dialogShow"
        width="30%"
        :modal-append-to-body="false"
        >
        <!-- <div class="above-part">
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :limit="1"
            >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="uploadDialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </div> -->
        <br />
        <el-select v-model="petKind" placeholder="请选择宠物种类">
          <el-option
            v-for="item in kindOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            >
          </el-option>
        </el-select>
        <br />
        <br />
        <el-input v-model="petName" placeholder="请输入宠物名称"></el-input>
        <br />
        <br />
        <el-input v-model="noteContent" placeholder="笔记内容" type="textarea"></el-input>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogShow = false">取 消</el-button>
          <el-button type="primary" @click="submitAdd">确 定</el-button>
        </span>
      </el-dialog>
  </div>
</template>

<script>
import { post, toFormData,regularDate } from '../../../service/request';

export default {
  data(){
    return {
      noteList:[],
      dialogShow:false,
      dialogImageUrl: '',
      uploadDialogVisible: false,
      petKind:0,
      petName:'',
      noteContent:'',
      typeMap: ['哺乳类','鸟类','爬行类','两栖类','鱼类'],
      kindOptions:[
          {
              label:'哺乳类',
              value:0
          },
          {
              label:'鸟类',
              value:1
          },
          {
              label:'爬行类',
              value:2
          },
          {
              label:'两栖类',
              value:3
          },
          {
              label:'鱼类',
              value:4
          }
      ]
    }
  },

  mounted(){
    post('/petNote/getAll',toFormData({userId:this.$store.state.user.id})).then(({data})=>{
      if(!data.success){
        this.$message.error('获取数据失败!')
      }
      else{
        this.noteList = data.entity
      }
    })
  },

   methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      submitAdd(){
        let {petName,noteContent:content,petKind:petType} = this
        post('/petNote/addNote',toFormData({petName,content,petType,date:regularDate(new Date()),userId:this.$store.state.user.id})).then(({data})=>{
          console.log(data.entity)
          if(!data.success){
            this.$message.error(data.err)
          }
          else{
            this.$message.success('添加成功!')
            this.noteList.push(
              data.entity
            )
            this.dialogShow = false
          }
        })
      }
    }
}
</script>

<style lang="less">
  #pet-note{
    .note-body{
      flex:1;
      overflow: auto;
    }

    .btn-con{
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
    }

    .el-dialog{
      z-index: 2002;
    }

  }
</style>