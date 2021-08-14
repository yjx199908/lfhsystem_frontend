import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import selfBreadcrumb from 'cpnts/index.js'
import 'element-ui/lib/theme-chalk/index.css'

JSON.customClone = (obj) =>{
  let deepClone = (obj,cloneObj) => {
    for(let item in obj){
      if(obj[item] instanceof Date){
        cloneObj[item] = new Date(obj[item])
      }
      else if(obj[item] instanceof Array){
        let temp = []
        deepClone(obj[item],temp)
        cloneObj[item] = temp
      }
      else if(typeof obj[item] == 'object'){
        let temp = {}
        deepClone(obj[item],temp)
        cloneObj[item] = temp
      } 
      else if(typeof obj[item] == 'number' || typeof obj[item] == 'string'){
        cloneObj[item] = obj[item]
      } 
    }
  }
  let target = {}
  deepClone(obj,target)
  console.log('target:',target)
  return target
}

JSON.customStringify = (obj)=>{

  let deep = (obj)=>{
    for(let item in obj){
      if(obj[item] instanceof Date){
        obj[item] = {
          isDate:true,
          value:obj[item].toString()
        }
        continue
      }
      if(typeof obj[item] == 'object'){
        deep(obj[item])
      }
    }
  }

  let cloneObj = JSON.customClone(obj)
  deep(cloneObj)
  return JSON.stringify(cloneObj)
}

JSON.customParse = (str)=>{
  let obj = JSON.parse(str)
  let deep = (obj)=>{
    for(let item in obj){
      if(!obj[item]){
        continue
      }
      if((typeof obj[item] == 'object') && obj[item].isDate){
        let temp = new Date(obj[item].value)
        obj[item] = temp
      }
      else if(typeof obj[item] == 'object'){
        deep(obj[item])
      }
    }
  }

  deep(obj)
  return obj
}

Vue.use(ElementUI);
Vue.use(selfBreadcrumb)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
