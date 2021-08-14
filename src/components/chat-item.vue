<template>
  <div class="chat-item">
      <div class="time-con">
          {{timeStr}}
      </div>
      <div class="msg-con" :style="{'flex-direction':model == 'target'?'row':'row-reverse'}">
          <img class="avator" :src="$store.state.baseUrl + '/' + avator" />
          <div class="msg" :style="{'background-color': model=='target'?'rgb(140, 220, 223)':'rgb(237,237,237)'}">{{msg}}</div>
      </div>
  </div>
</template>

<script>
export default {
    props:{
        time:{
            type:Date
        },
        avator:{
            type:String
        },
        msg:{
            type:String
        },
        model:{
            type:String
        }
    },
    computed:{
        timeStr(){
            let a = this.time.toString().split(' ')
            return a.filter((e,i)=>{
                if(i >= a.length-2){
                    return false
                }
                else{
                    return true
                }
            }).join(' ')
        }
    }
}
</script>

<style lang="less">
    .chat-item{
        padding-bottom: 20px;
        .time-con{
            color:rgba(137,137,137,0.9);
            text-align: center;
            padding:10px 0 5px;
        }

        .msg-con{
            display: flex;
            .avator{
                width:30px;
                height: 30px;
                border-radius: 50%;
                margin:0 10px;
            }

            .msg{
                color:rgb(50,50,50);
                max-width: 80%;
                box-sizing: border-box;
                border-radius: 3px;
                padding: 10px;
                word-wrap: break-word;
                line-height: 1.5em;
            }
        }
    }
</style>