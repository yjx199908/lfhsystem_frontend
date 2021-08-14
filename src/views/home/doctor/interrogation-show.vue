<template>
  <div class="expert-interrogation">
      <self-breadcrumb
        :path-list="$store.state.pathList"
      ></self-breadcrumb>
      <el-container>
        <el-main v-if="curUserId != -1">
          <div class="chat-content" id="chat-content-box">
            <div id="chat-content">
              <chat-item v-for="item in chatItemList" :key="item.id" :time="item.time" :avator="item.avator" :msg="item.content" :model="item.model"></chat-item>
            </div>
          </div>
          <div class="btn-con">
            <el-button type="primary" @click="sendMsg">发送</el-button>
            <el-button type="warning" plain>清空</el-button>
            <div class="flex-placeholder"></div>
            <el-input v-model="curMsg" placeholder="请输入内容"></el-input>
          </div>
        </el-main>
        <el-aside>
          <div class="contact-list">
            <el-empty description="暂无消息" v-if="contactList.length == 0"></el-empty>
            <div class="contact-item" v-for="item in contactList" :key="item.id" @click="startChat(item.userId)">
              <el-badge :value="item.coun" class="item">
                <img :src="$store.state.baseUrl + '/' + item.userAvator" class="avator"/>
              </el-badge>
              <div class="info-con">
                <div class="info-name">{{item.userName}}</div>
              </div>
            </div>
          </div>
        </el-aside>
      </el-container>
  </div>
</template>

<script>

import {post,get,toFormData,regularDate} from '../../../service/request'

import ChatItem from 'cpnts/chat-item'

let msgCache = null
let readerTimer = null

export default {
  data(){
    return {
      contactList:[],
      curMsg:'',
      curUserId:-1,
      chatItemList:[]
    }
  },
  components:{
    ChatItem
  },
  beforeDestroy(){
    this.readerMonitor(false)
  },
  mounted(){
      //从缓存中读取保存的信息（localStorage）
      msgCache = JSON.customParse(localStorage.getItem('msgs'))
      console.log(msgCache)
      if(!msgCache){
        msgCache = {}
      }
      this.readerMonitor(true)
  },

  methods:{
    scrollTop(){
      setTimeout(()=>{
        let chatContent = document.getElementById('chat-content')
        let chatContentBox = document.getElementById('chat-content-box')
        if(!chatContent || !chatContentBox){
          return
        }
        let height = chatContent.clientHeight
        console.log(height)
        chatContentBox.scrollTop = height + 300
      },500)
      
    },
    toComment(){
      this.$router.push({
        path:'/home/interrogation-feedback',
        query:{
          doctorId:this.curUserId
        }
      })
    },
    startChat(userId){
      this.readerMonitor(false)
      this.curUserId = userId

      if(('user-' + this.curUserId) in msgCache){
        this.chatItemList = msgCache['user-' + this.curDoctorId]
      }
      else{
        msgCache['user-' + this.curUserId] = []
      }
      this.scrollTop()
      this.readerMonitor(true)
    },
    readerMonitor(start){
      if(start){
        readerTimer = setInterval(()=>{
          this.runtimeRunMessage()
          this.newsCountMonitor()
        },2000)
      }
      else{
        clearInterval(readerTimer)
      }
    },

    runtimeRunMessage(){
      get('/interrogationShow/readMsg',{
        params:{
          sourceId:this.curUserId,
          targetId:this.$store.state.user.id
        }
      }).then(({data})=>{
        if(data.success){
          console.log(data)
          data.entity.forEach(element => {
            msgCache['user-' + this.curUserId].push({...element,time:new Date(element.time)})
          });
          this.chatItemList = msgCache['user-' + this.curUserId]
          this.saveMsg()
          if(data.entity.length != 0){
            this.scrollTop()
          }
        }
        else{
          this.$message.error(data.err)
        }
      })
    },
    newsCountMonitor(){
      get('/interrogationShow/listenCount',{
        params:{
          targetId:this.$store.state.user.id
        }
      }).then(({data})=>{
        this.contactList = data.entity
      })
    },
    saveMsg(){
      localStorage.setItem('msgs',JSON.customStringify(msgCache))
      // localStorage.clear()  //后续删除
    },
    sendMsg(){
      let msgBody = {
        sourceId:this.$store.state.user.id,
        targetId:this.curUserId,
        content:this.curMsg,
        time:regularDate(new Date())
      }
      post('/interrogationShow/sendMsg',toFormData(msgBody)).then(({data})=>{
        if(data.success){
          this.curMsg = ''
          let {entity:{insertId}} = data
          msgBody.id = insertId
          msgCache['user-' + this.curUserId].push({...msgBody,time:new Date(msgBody.time),avator:this.$store.state.user.avator})
          this.chatItemList = msgCache['user-' + this.curUserId]
          this.saveMsg()
          this.scrollTop()
        }
        else{
          this.$message.error('系统异常,发送失败')
        }
      })
    }
  },
}
</script>

<style lang="less">
  .expert-interrogation{
    .el-container{
      .el-aside{
        overflow-y: auto;
        overflow-x: hidden;
        border-left: 1px solid rgba(237,237,237,0.5);

        .contact-list{
          width:100%;
          height:100%;
          overflow: auto;
          box-sizing: border-box;
          padding:15px 0;

          .contact-item{
            display: flex;
            flex-direction: row;
            align-items: center;
            padding-top: 15px;
            box-sizing: border-box;
            border-bottom: 1px solid rgba(200,200,200,0.5);
            cursor: pointer;

            &:hover{
              background-color: rgba(237,237,237);
            }

            .item{
              margin-right: 20px;
              .avator{
                width:35px;
                height: 35px;
                border-radius: 50%;
              }
            }

            .info-con{
              font-size: 13px;
              color:rgb(120,120,120);
            }
          }
        }
      }

      .el-main{
        display: flex;
        flex-direction: column;
        align-items: stretch;
        box-sizing: border-box;
        padding-bottom: 50px;
        .chat-content{
          flex:1;
          overflow: auto;
        }
        .btn-con{
          height: 50px;
          border: 1px solid rgba(200,200,200,0.5);
          border-left: none;
          border-right: none;
          display: flex;
          flex-direction: row;
          align-items: center;
          flex-direction: row-reverse;

          .flex-placeholder{
            flex:1;
          }
        }
      }
    }
  }
</style>