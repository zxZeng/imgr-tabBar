import Vue from 'vue'
import Router from 'vue-router'
import tabBar from '@/components/tabBar'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'tabBar',
      component: tabBar
    }
  ]
})
