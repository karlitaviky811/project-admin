

import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
import Login from '../src/views/dashboard/pages/Login'
export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/home',
      component: () => import('@/views/dashboard/Index'),
      redirect: '/dashboard',
      children: [
        // Dashboard
        {
          name: 'Dashboard',
          path: '/dashboard',
          component: () => import('@/views/dashboard/Dashboard'),
        },
        // Pages
        {
          name: 'Solicitudes',
          path: 'requests/user',
          component: () => import('@/views/dashboard/pages/UserRequest'),
          children:[
            {
              name: 'Detail',
              path: 'detail',
              component: () => import('@/views/dashboard/component/Typography'),
            },
          ]
        },
        {
          name: 'Notifications',
          path: 'components/notifications',
          component: () => import('@/views/dashboard/component/Notifications'),
        },
        {
          name: 'Buzon Quejas, Reclamos y Sugerencias',
          path: 'components/qrs',
          component: () => import('@/views/dashboard/pages/Tableqrs'),
        },
        
        // Tables
        {
          name: 'Proyectos',
          path: '/home/projects',
          component: () => import('@/views/dashboard/pages/TableProjectReq'),
        },
        // Maps
        {
          name: 'Usuarios',
          path: '/home/components/userslist',
          component: () => import('@/views/dashboard/pages/TableUsers'),
        },
        // Upgrade
        {
          name: 'Upgrade',
          path: 'upgrade',
          component: () => import('@/views/dashboard/Upgrade'),
        },
      ],
    },
    ,

    {
      path: '/login',
      name: 'Login',
      component: () => import('../src/views/dashboard/pages/Login'),
    },
    ,
    {
      path: '',
      redirect: Login,
    }
  ],
})
