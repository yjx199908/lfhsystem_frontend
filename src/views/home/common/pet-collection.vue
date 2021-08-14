<template>
  <div id="pet-collection" class="content-page">
      <self-breadcrumb
        :path-list="$store.state.pathList"
      ></self-breadcrumb>
      <div class="collection-body">
          <div class="index-con">
              <el-select v-model="curKind">
                  <el-option
                    v-for="item in kindOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    >
                  </el-option>
              </el-select>
              <el-input 
                placeholder="请输入搜索关键字" 
                v-model="searchKey"
                prefix-icon="el-icon-search"
                >
                <el-button slot="suffix" type="primary">当前种类搜索</el-button>
              </el-input>
              
          </div>
          <div class="search-result">
              <div class="pet-card" v-for="item in curPetList" :key="item.id">
                  <img :src="item.imgSrc" class="pet-img"/>
                  <div class="name-con">{{item.name}}</div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    data(){
        return {
            curKind:0,
            searchKey:'',
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
            ],
            curPetList:[
                {
                    id:0,
                    name:'小猫',
                    imgSrc:'https://img2.baidu.com/it/u=3763056192,3618098445&fm=26&fmt=auto&gp=0.jpg'
                },
                {
                    id:1,
                    name:'小狗',
                    imgSrc:'https://img1.baidu.com/it/u=276000410,2379902822&fm=26&fmt=auto&gp=0.jpg'
                },
                {
                    id:2,
                    name:'兔子',
                    imgSrc:'https://img1.baidu.com/it/u=2388412260,1762755646&fm=26&fmt=auto&gp=0.jpg'
                },
                {
                    id:3,
                    name:'仓鼠',
                    imgSrc:'https://img2.baidu.com/it/u=3164404052,1444961488&fm=26&fmt=auto&gp=0.jpg'
                },
                {
                    id:4,
                    name:'小猫',
                    imgSrc:'https://img2.baidu.com/it/u=3763056192,3618098445&fm=26&fmt=auto&gp=0.jpg'
                },
                {
                    id:5,
                    name:'小狗',
                    imgSrc:'https://img1.baidu.com/it/u=276000410,2379902822&fm=26&fmt=auto&gp=0.jpg'
                },
                {
                    id:6,
                    name:'兔子',
                    imgSrc:'https://img1.baidu.com/it/u=2388412260,1762755646&fm=26&fmt=auto&gp=0.jpg'
                },
                {
                    id:7,
                    name:'仓鼠',
                    imgSrc:'https://img2.baidu.com/it/u=3164404052,1444961488&fm=26&fmt=auto&gp=0.jpg'
                }
            ]
        }
    }
}
</script>

<style lang="less">
    #pet-collection{
        .collection-body{
            flex:1;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            align-items: stretch;
            .index-con{
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                align-items: center;
                padding: 10px 0;
                border-bottom: 1px solid rgba(237,237,237,0.9);
            }
            
            .search-result{
                flex:1;
                overflow: auto;
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                flex-wrap: wrap;
                align-items: flex-start;

                .pet-card{
                    width:300px;
                    padding: 15px;
                    margin: 10px;
                    box-shadow: 0 0 5px rgb(200, 200, 200);
                    cursor: pointer;
                    transition: 0.2s transform;

                    &:hover{
                        transform: scale(1.1);
                        background-color: rgba(237,237,237,0.9);
                    }

                    .pet-img{
                        width:200px;
                        height:200px;
                        margin: auto;
                        display: block;
                    }

                    .name-con{
                        text-align: center;
                        padding-top: 15px;
                    }
                }
            }
        }
    }
</style>