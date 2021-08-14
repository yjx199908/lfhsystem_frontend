import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Root',
    redirect:'/home'
  },
  {
    path: '/login',
    name:'Login',
    component:()=>import('views/login')
  },
  {
    path: '/register',
    name:'Register',
    component:()=>import('views/register')
  },
  {
    path:'/home',
    name:'Home',
    component:()=>import('views/Home'),
    children:[
      {
        path:'/home/appointment-register',
        component:()=>import('views/home/common/appointment-register')
      },
      {
        path:'/home/expert-interrogation',
        component:()=>import('views/home/common/expert-interrogation')
      },
      {
        path:'/home/interrogation-feedback',
        component:()=>import('views/home/common/interrogation-feedback')
      },
      {
        path:'/home/disease-query',
        component:()=>import('views/home/common/disease-query')
      },
      {
        path:'/home/pet-collection',
        component:()=>import('views/home/common/pet-collection')
      },
      {
        path:'/home/pet-note',
        component:()=>import('views/home/common/pet-note')
      },
      {
        path:'/home/leave-message',
        component:()=>import('views/home/common/leave-message')
      },
      {
        path:'/home/personal-profile',
        component:()=>import('views/home/common/personal-profile')
      },
      {
        path:'/home/appointment-list',
        component:()=>import('views/home/doctor/appointment-list')
      },
      {
        path:'/home/interrogation-show',
        component:()=>import('views/home/doctor/interrogation-show')
      },
      {
        path:'/home/message-admin',
        component:()=>import('views/home/admin/message-admin')
      },
      {
        path:'/home/user-admin',
        component:()=>import('views/home/admin/user-admin')
      },
      {
        path:'/home/doctor-admin',
        component:()=>import('views/home/admin/doctor-admin')
      },
      {
        path:'/home/hospital-admin',
        component:()=>import('views/home/admin/hospital-admin')
      },
      {
        path:'/home/appointment-admin',
        component:()=>import('views/home/admin/appointment-admin')
      },
      {
        path:'/home/comment-admin',
        component:()=>import('views/home/admin/comment-admin')
      },
      {
        path:'/home/disease-admin',
        component:()=>import('views/home/admin/disease-admin')
      },
      {
        path:'/home/collection-admin',
        component:()=>import('views/home/admin/collection-admin')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
