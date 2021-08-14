<template>
  <div id="main" class="fix-page">
      <el-container>
        <el-header height="10vh">
          <span class="css28d1549c9522a94 title">宠物医院预约管理系统</span>
          <div class="avator-con">
            <div class="img-con">
              <img :src="`${$store.state.baseUrl}/${$store.state.user.avator}`" class="avator" v-if="$store.state.user.avator != '#'"/>
              <img src="~assets/images/user.png" v-if="$store.state.user.avator=='#'" class="avator"/>
            </div>
           <el-dropdown split-button type="primary" >
              {{$store.state.user.name}}
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item><span  @click="logout">退出登录</span></el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-header>
        <el-container>
            <el-aside ref="elAsideMenu" :width="menuWidth + 'px'">
              <el-menu
                default-active="-1"
                class="el-menu-vertical-demo"
                @select="routerGo"
                ref="menuObject"
                :collapse="menuWidth < 150"
                >
                <el-menu-item 
                  v-for="item in menuConfig" 
                  :index="''+item.index" 
                  :key="item.text"
                  :route="item.link"
                  >
                  <i :class="item.icon"></i>
                  <span slot="title">{{item.text}}</span>
                </el-menu-item>
              </el-menu>
            </el-aside>
            <el-main>
              <router-view />
            </el-main>
        </el-container>
      </el-container>

  </div>
</template>

<script>
import menuConfig from 'config/menu-config.json'
export default {
  mounted(){
    this.menuConfig = menuConfig.filter(element=>{
      return element.type % this.$store.state.user.type == 0
    });

    this.sizeChange({srcElement:window});
    window.onresize = (e)=>{
      this.sizeChange(e)
    }
  },
  data(){
    return {
      menuConfig:[],
      menuWidth:0
    }
  },
  methods:{
    routerGo(index){
      this.$router.push(menuConfig[index].link)
    },
    sizeChange(e){
      this.menuWidth = parseInt(e.srcElement.innerWidth * 0.13)
    },
    adjustMenuWidth(){
      console.log(this.$refs.elAsideMenu)
    },
    logout(){
      this.$store.state.user = {}
      this.$router.push('/login')
    }
  },
  filters:{
    
  }
}
</script>

<style lang="less">
  .flex-row(){
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .el-header{
    padding:0;
    box-sizing: border-box;
    padding: 0 1vw;
    .flex-row;
    justify-content: space-between;
    .title{
      font-size: xx-large;
    }

    .avator-con{
      .flex-row;
      justify-content: space-around;
      .img-con{
        width:45px;
        height:45px;
        border:1px solid rgb(64,158,255);
        border-radius: 50%;
        overflow: hidden;
        box-sizing: border-box;
        padding:5px;
        margin-right: 10px;

        .avator{
          width:100%;
          height: 100%;
          border-radius: 50%;
        }
      }
      .el-dropdown{
        .el-button--primary{
          background-color: transparent;
          border:none;
          color:black;
        }
      }
    }
  }
  .el-aside{
    height: 90vh;
  }

  .el-main{
    box-sizing: border-box;
    padding:0 20px;
    overflow: hidden;
    height: 90vh;
  }
</style>