<template>
  <div id="personal-profile" class="content-page">
      <self-breadcrumb
        :path-list="$store.state.pathList"
      ></self-breadcrumb>
      <div class="form-con">
          <el-form :model="user" label-width="80px" label-position="left">
            <el-form-item label="头像">
                <img :src="$store.state.baseUrl + '/' + user.avator" class="avator" @click="changeAvatar"/>
            </el-form-item>
            <el-form-item label="名字">
                <el-input v-model="user.name"></el-input>
            </el-form-item>
            <el-form-item label="手机号码">
                <el-input v-model="user.phone"></el-input>
            </el-form-item>
            <el-form-item label="医院" v-if="$store.state.user.type == 3">
                <el-select v-model="user.hospitalId">
                    <el-option
                        v-for="item in hospitalList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                        >
                        </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submit">提交修改</el-button>
            </el-form-item>
          </el-form>

      </div>
      <el-dialog
        title="头像修改"
        :visible.sync="ModifyAvatorDialogVisible"
        width="30%"
        :modal-append-to-body="false"
        >
        <el-upload
            class="avator-uploader"
            :show-file-list="false"
            :action="`${$store.state.baseUrl}/personalProfile/${$store.state.user.type == 2?'u':'d'}/uploadAvatar`"
            :on-success="handleAvatorSuccess"
            :before-upload="beforeAvatorUpload">
            <img v-if="uploadAvatorTempUrl" :src="uploadAvatorTempUrl" class="avator">
            <i v-else class="el-icon-plus avator-uploader-icon"></i>
        </el-upload>
        <span slot="footer" class="dialog-footer">
            <el-button @click="ModifyAvatorDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="ModifyAvatorDialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>

  </div>
</template>

<script>
import {post,toFormData,get} from '../../../service/request'
export default {
    mounted(){
        get(`/personalProfile/${this.$store.state.user.type == 2?'u':'d'}/self`,{
            params:{
                id:this.$store.state.user.id
            }
        }).then(({data})=>{
            let {success,entity,err} = data
            if(!success){
                this.$message.error('获取本人信息失败,请稍后刷新页面重试')
            }
            else{
                console.log(entity[0])
                this.user = entity[0]
            }
        })
        if(this.$store.state.user.type == 3){
            get('/share/hospital-list').then(({data})=>{
                let {success,entity} = data
                if(!success){
                    this.$message.error('获取医院列表失败')
                }
                else{
                    this.hospitalList = entity
                }
            })
        }
    },
    data(){
        return {
            ModifyAvatorDialogVisible:true,
            user:{
                avator:'',
                name:'',
                hospitalId:''
            },
            hospitalList:[],
            uploadAvatorTempUrl:''
        }
    },
    methods:{
        changeAvatar(){
            this.ModifyAvatorDialogVisible = true
        },
        handleAvatorSuccess(res, file) {
            console.log(res)
            let {success,avator} = res
            if(success){
                this.$message.success('文件已经暂存在服务器,请及时提交其他信息,否则头像不予更换')
                this.user.avator = avator.replace('\\','/')
            }
            else{
                this.$message.error('文件保存未成功,请稍后重试')
            }
        },
        beforeAvatorUpload(file) {
            console.log(file.type)
            const typeCorrect = file.type === 'image/jpeg'||file.type === 'image/png';
            const isLt2M = file.size / 1024 / 1024 < 3;

            if (!typeCorrect) {
                this.$message.error('上传头像图片只能是 JPG或PNG 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 3MB!');
            }
            if(file){
                this.uploadAvatorTempUrl = URL.createObjectURL(file);
            }
            
            console.log(this.uploadAvatorTempUrl)
            return typeCorrect && isLt2M;
            // return true
        },
        submit(){
            let postData = {...this.user,id:this.$store.state.user.id}
            this.$store.state.user.type == 2?delete postData.hospitalId:''
            post(`/personalProfile/${this.$store.state.user.type == 2?'u':'d'}/updateInfo`,toFormData(postData)).then(({data})=>{
                let {success,entity} = data
                if(!success){
                    this.$message.error(data.err)
                }
                else{
                    this.$message.success('修改成功')
                }
            })
        }
    }
}
</script>

<style lang="less">
    #personal-profile{
         .avator-uploader .el-upload {
            border: 1px dashed #d9d9d9;
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
        }
        .avator-uploader .el-upload:hover {
            border-color: #409EFF;
        }
        .avator-uploader-icon {
            font-size: 28px;
            color: #8c939d;
            width: 178px;
            height: 178px;
            line-height: 178px;
            text-align: center;
        }
        .avator {
            width: 178px;
            height: 178px;
            display: block;
        }
    }
</style>