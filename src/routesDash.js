import Vue from "vue";
import VueRouter from "vue-router";

//Components
import Login from "@/views/dashboard/pages/Login'";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Dashboard",
    component: DashboardLayout,
    redirect: "/home",
    beforeEnter: RequireAuthentication,
    children: [
      {
        path: "/home",
        component: SelectFarmType,
        name: "",
        meta: {
          title: ""
        }
      },
      {
        path: "/MFarmList",
        component: MFarmList,
        name: "Granjas de Madres",
        meta: {
          title: "Granjas de Madres"
        }
      },
      {
        path: "/EFarmList",
        component: EFarmList,
        name: "Granjas de Engorde"
      },
      {
        path: "/EFarmListConfig",
        component: EFarmListConfig,
        name: "Granjas de Engorde Configuración"
      },
      {
        path: "/ListTruck",
        component: ListTruck,
        name: "Lista de Trucks"
      },
      {
        path: "/AbattoirList",
        component: AbattoirList,
        name: "Lista de Mataderos",
        meta: {
          title: "Lista de Mataderos"
        }
      },
      {
        path: "/MFarm/:id",
        component: MFarm,
        name: "Granja de Madres",
        meta: {
          title: "Granja de Madres"
        }
      },
      {
        path: "/EFarm/:id",
        component: EFarm,
        name: "Granja de Engorde",
        meta: {
          title: "Granja de Engorde"
        }
      },
      {
        path: "/ConfigFarm",
        component: ConfigFarm,
        name: "Configuración Granjas de Engorde"
      },
      {
        path: "/ConfigFarmM",
        component: ConfigFarmM,
        name: "Configuración Granjas de Madres"
      },

      {
        path: "/EFarmCalendar",
        component: EFarmCalendar,
        name: "Calendario"
      },
      {
        path: "/AdminUsers",
        component: AdminUsers,
        name: "Administración"
      },
      {
        path: "/EFarmStock/:id",
        component: EFarmStock,
        name: "Lote de Engorde"
      }
    ]
  },
  {
    path: "/login",
    name: "",
    //name: "Auth",
    component: Login,
    beforeEnter: RequireGuest,
    children: [
      {
        path: "",
        component: Login
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
