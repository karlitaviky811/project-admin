

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
          component: () => import('@/views/dashboard/pages/UserProfile'),
          children: [
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
          name: 'Icons',
          path: 'components/icons',
          component: () => import('@/views/dashboard/component/Icons'),
        },

        // Tables
        {
          name: 'Regular Tables',
          path: 'tables/regular-tables',
          component: () => import('@/views/dashboard/tables/RegularTables'),
        },
        // Maps
        {
          name: 'Google Maps',
          path: 'maps/google-maps',
          component: () => import('@/views/dashboard/maps/GoogleMaps'),
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
    
  ],
})
