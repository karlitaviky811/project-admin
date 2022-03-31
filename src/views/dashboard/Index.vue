<template>
<div>
 
    <dashboard-core-app-bar />

    <dashboard-core-drawer />

    <dashboard-core-view />
  
  <dashboard-core-settings />

</div>
</template>

<script>
import {mapState} from 'vuex';
  export default {
    name: 'DashboardIndex',

    components: {
      DashboardCoreAppBar: () => import('./components/core/AppBar'),
      DashboardCoreDrawer: () => import('./components/core/Drawer'),
      DashboardCoreSettings: () => import('./components/core/Settings'),
      DashboardCoreView: () => import('./components/core/View'),
   
    },

    data: () => ({
      expandOnHover: false,
    }),
    computed:{
      ...mapState(['logued'])
    }
  }
</script>
