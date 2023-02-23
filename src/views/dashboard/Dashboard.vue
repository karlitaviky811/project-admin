<template>
  <div>
    <div>
      <dashboard-admin v-if="role === 'ROLE_ADMIN'" />
      <dashboard-user v-else />
    </div>
    
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import DashboardAdmin from "./DashboardAdmin.vue";
import DashboardUser from "./DashboardUser.vue";
export default {
  name: "DashboardDashboard",
  components: {
    DashboardAdmin,
    DashboardUser,
  },
  async created() {
    const user = JSON.parse(localStorage.getItem("user"))._id;

    this.role = JSON.parse(localStorage.getItem("user")).role;
  },
  computed: {
  },
  data() {
    return {
      role: "",
    };
  },
  computed: {},
  watch: {
  },
  methods: {
   
  },
};
</script>
<style>
.body {
  background: rgba(120, 227, 236, 0.15) !important;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border-radius: 10px;
}
</style>
