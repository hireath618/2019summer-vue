import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import login from '@/components/login'
import admin from '@/components/admin'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/admin',
      name: 'admin',
      component: admin
    },

  ]
})
