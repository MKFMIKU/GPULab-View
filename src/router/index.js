import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  },

  {
    path: '/experiment',
    component: Layout,
    redirect: '/experiment',
    name: 'Experiment',
    children: [{
      path: 'experiment',
      name: '实验',
      meta: { title: '实验', icon: 'example' },
      component: () => import('@/views/experiment/index')
    }]
  },

  {
    path: '/model',
    component: Layout,
    redirect: '/model/index',
    name: 'Model',
    meta: { title: '模型', icon: 'example' },
    children: [
      {
        path: 'index',
        name: 'List',
        component: () => import('@/views/model/index'),
        meta: { title: '模型列表', icon: 'form' }
      },
      {
        path: 'edit',
        query: { id: 0 },
        name: 'Edit',
        component: () => import('@/views/model/edit'),
        meta: { title: '编辑器', icon: 'form' }
      },
      {
        path: 'show',
        name: 'Show',
        hidden: true,
        query: { id: 0 },
        component: () => import('@/views/model/show'),
        meta: { title: '查看', icon: 'form' }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

