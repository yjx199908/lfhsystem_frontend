<template>
  <div class="doctor-item" @click="itemClick">
      <div class="avator-con">
          <img src="~assets/images/doctor-default.jpg" v-if="!(doctor.photoSrc)" class="avator"/>
          <img :src="doctor.photoSrc" v-if="doctor.photoSrc" class="avator"/>
      </div>
      <div class="info-item">
          <el-row>
              <el-col :span="8">姓名：</el-col>
              <el-col :span="16">
                <div class="name-con">
                    {{doctor.name}}
                </div>
              </el-col>
          </el-row>
          
      </div>
      <div class="info-item">
          <el-row>
              <el-col :span="8">医院：</el-col>
              <el-col :span="16">
                <div class="hospital-con">
                    {{doctor.hospital}}
                </div>
              </el-col>
          </el-row>
      </div>
      <div class="info-item">
          <el-row>
              <el-col :span="8">联系：</el-col>
              <el-col :span="16">
                <div class="hospital-con">
                    {{doctor.phone}}
                </div>
              </el-col>
          </el-row>
      </div>
  </div>
</template>

<script>
export default {
    props:{
        doctor:Object
    },
    methods:{
        itemClick(){
            this.$emit('item-click',this.doctor)
        }
    }
}
</script>

<style lang="less">
    .doctor-item{
        width: 240px;
        height: 320px;
        margin: 0 20px 10px 0;
        background-color: white;
        box-shadow: 0 0 3px 2px rgba(200,200,200,0.3);
        margin-bottom:15px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-evenly;
        font-size: 12px;
        border-radius: 3px;
        cursor: pointer;
        transition: 0.2s all;

        &:hover{
            transform: scale(1.05);
        }

        .avator-con{
            background-color: black;
            width:200px;
            height: 120px;
            border-radius: 3px;
            .avator{
                display: block;
                height: 120px;
                margin: auto;
            }
        }

        .info-item{
            width:100%;
            box-sizing: border-box;
            padding:0 15px;
        }

        .name-con,.hospital-con{
            text-align: center;
            width:100%;
            color: rgb(137,137,137);
        }
    }
</style>