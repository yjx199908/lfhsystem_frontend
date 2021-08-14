<template>
  <div id="disease-query" class="content-page">
      <self-breadcrumb
        :path-list="$store.state.pathList"
      ></self-breadcrumb>
      <div class="content-box">
          <div class="search-header">
              <el-input type="text" v-model="searchKey" placeholder="请输入查询关键字"></el-input>
              <el-button type="primary">查询</el-button>
          </div>
          <div class="search-result">
              <img src="~assets/images/empty.png" class="empty-placeholder" v-if="resultList.length == 0"/>
              <div class="result-item" v-for="item in resultList" :key="item.id">
                  <img class="disease-img" :src="item.imgSrc"/>
                  <div class="info-con">
                      <div class="disease-name">
                          学名：{{item.name}}
                      </div>
                      <div class="scene-con">
                          多发生于：{{item.scene|cutString}}
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>

export default {
    data(){
        return {
            searchKey:'',
            resultList:[
                {
                    id:0,
                    name:'感冒',
                    scene:'猫、狗、猫、狗、猫、狗、猫、狗、猫、狗、猫、狗、猫、狗、猫、狗、猫、狗、猫、狗、猫、狗、猫、狗、猫、狗、猫、狗、猫、狗、',
                    imgSrc:'https://img0.baidu.com/it/u=3992004513,3205368076&fm=26&fmt=auto&gp=0.jpg'
                },
                {
                    id:1,
                    name:'感冒',
                    scene:'猫、狗、猫、狗、猫、狗、猫、狗、猫、狗、猫、狗、猫、狗、猫、狗、猫、狗、猫、狗、猫、狗、猫、狗、猫、狗、猫、狗、猫、狗、',
                    imgSrc:'https://img0.baidu.com/it/u=3992004513,3205368076&fm=26&fmt=auto&gp=0.jpg'
                },
                {
                    id:2,
                    name:'感冒',
                    scene:'猫、狗、猫、狗、猫、狗、猫、狗、猫、狗、猫、狗、猫、狗、猫、狗、猫、狗、猫、狗、猫、狗、猫、狗、猫、狗、猫、狗、猫、狗、',
                    imgSrc:'https://img0.baidu.com/it/u=3992004513,3205368076&fm=26&fmt=auto&gp=0.jpg'
                },
                {
                    id:3,
                    name:'感冒',
                    scene:'猫、狗、猫、狗、猫、狗、猫、狗、猫、狗、猫、狗、猫、狗、猫、狗、猫、狗、猫、狗、猫、狗、猫、狗、猫、狗、猫、狗、猫、狗、',
                    imgSrc:'https://img0.baidu.com/it/u=3992004513,3205368076&fm=26&fmt=auto&gp=0.jpg'
                },{
                    id:4,
                    name:'感冒',
                    scene:'猫、狗、猫、狗、猫、狗、猫、狗、猫、狗、猫、狗、猫、狗、猫、狗、猫、狗、猫、狗、猫、狗、猫、狗、猫、狗、猫、狗、猫、狗、',
                    imgSrc:'https://img0.baidu.com/it/u=3992004513,3205368076&fm=26&fmt=auto&gp=0.jpg'
                }
                ,{
                    id:5,
                    name:'感冒',
                    scene:'猫、狗、猫、狗、猫、狗、猫、狗、猫、狗、猫、狗、猫、狗、猫、狗、猫、狗、猫、狗、猫、狗、猫、狗、猫、狗、猫、狗、猫、狗、',
                    imgSrc:'https://img0.baidu.com/it/u=3992004513,3205368076&fm=26&fmt=auto&gp=0.jpg'
                },
                {
                    id:6,
                    name:'感冒',
                    scene:'猫、狗、猫、狗、猫、狗、猫、狗、猫、狗、猫、狗、猫、狗、猫、狗、猫、狗、猫、狗、猫、狗、猫、狗、猫、狗、猫、狗、猫、狗、',
                    imgSrc:'https://img0.baidu.com/it/u=3992004513,3205368076&fm=26&fmt=auto&gp=0.jpg'
                },
                {
                    id:7,
                    name:'感冒',
                    scene:'猫、狗、猫、狗、猫、狗、猫、狗、猫、狗、猫、狗、猫、狗、猫、狗、猫、狗、猫、狗、猫、狗、猫、狗、猫、狗、猫、狗、猫、狗、',
                    imgSrc:'https://img0.baidu.com/it/u=3992004513,3205368076&fm=26&fmt=auto&gp=0.jpg'
                },{
                    id:8,
                    name:'感冒',
                    scene:'猫、狗、猫、狗、猫、狗、猫、狗、猫、狗、猫、狗、猫、狗、猫、狗、猫、狗、猫、狗、猫、狗、猫、狗、猫、狗、猫、狗、猫、狗、',
                    imgSrc:'https://img0.baidu.com/it/u=3992004513,3205368076&fm=26&fmt=auto&gp=0.jpg'
                }
                ,{
                    id:9,
                    name:'感冒',
                    scene:'猫、狗、猫、狗、猫、狗、猫、狗、猫、狗、猫、狗、猫、狗、猫、狗、猫、狗、猫、狗、猫、狗、猫、狗、猫、狗、猫、狗、猫、狗、',
                    imgSrc:'https://img0.baidu.com/it/u=3992004513,3205368076&fm=26&fmt=auto&gp=0.jpg'
                },
                {
                    id:10,
                    name:'感冒',
                    scene:'猫、狗、猫、狗、猫、狗、猫、狗、猫、狗、猫、狗、猫、狗、猫、狗、猫、狗、猫、狗、猫、狗、猫、狗、猫、狗、猫、狗、猫、狗、',
                    imgSrc:'https://img0.baidu.com/it/u=3992004513,3205368076&fm=26&fmt=auto&gp=0.jpg'
                },
                {
                    id:11,
                    name:'感冒',
                    scene:'猫、狗、猫、狗、猫、狗、猫、狗、猫、狗、猫、狗、猫、狗、猫、狗、猫、狗、猫、狗、猫、狗、猫、狗、猫、狗、猫、狗、猫、狗、',
                    imgSrc:'https://img0.baidu.com/it/u=3992004513,3205368076&fm=26&fmt=auto&gp=0.jpg'
                }
            ]
        }
    },
    filters:{
        cutString(value){
            return value.length > 40?value.substr(0,40) + '...':value
        }
    }

}
</script>

<style lang="less">
    #disease-query{
        .content-box{
            flex:1;
            display: flex;
            flex-direction: column;
            align-items: stretch;
            overflow: hidden;
            .search-header{
                height: 50px;
                border-bottom: 1px solid rgba(237,237,237,0.8);
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                align-items: center;
            }
            .search-result{
                flex:1;
                overflow: auto;

                .empty-placeholder{
                    width:200px;
                    height: 200px;
                    margin: 200px auto;
                    display: block;
                    opacity: 0.5;
                }

                .result-item{
                    width:99.5%;
                    box-sizing: border-box;
                    padding: 10px 15px;
                    margin:5px auto 15px auto;
                    box-shadow: 0 0 8px rgb(237,237,237);
                    display: flex;
                    flex-direction: row;
                    cursor: pointer;

                    &:hover{
                        background-color: rgba(237,237,237,0.8);
                    }

                    .disease-img{
                        width:80px;
                        height: 80px;
                        margin-right: 10px;
                    }

                    .info-con{
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                        color:rgba(80,80,80);
                    }
                }
            }
        }
    }
</style>