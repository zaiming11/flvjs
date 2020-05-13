import Vue from 'vue'
import Router from 'vue-router'
import httpflv from '@/components/httpflv'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'httpflv',
      component: httpflv
    }
  ]
})
