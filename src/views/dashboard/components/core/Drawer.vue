<template>
  <v-navigation-drawer
    id="core-navigation-drawer"
    v-model="drawer"
    class="primary accent-4"
    dark
    permanent
    :right="$vuetify.rtl"
    :src="barImage"
    mobile-break-point="960"
    app
    v-bind="$attrs"
  >
    <template v-slot:img="props">
      <v-img :gradient="`to bottom, ${barColor}`" v-bind="props" />
    </template>

    <v-divider class="mb-1" />

    <v-list dense nav>
      <v-list-item>
        <v-list-item-avatar class="align-self-center" color="white" contain>
          <v-img
            src="https://icones.pro/wp-content/uploads/2022/07/icones-d-administration-orange.png"
            max-height=""
          />
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title class="text-h4" v-text="'SGC'" />
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-divider class="mb-2" />

    <v-list expand nav>
      <!-- Style cascading bug  -->
      <!-- https://github.com/vuetifyjs/vuetify/pull/8574 -->
      <div />

      <template v-for="(item, i) in computedItems">
        <base-item-group v-if="item.children" :key="`group-${i}`" :item="item">
          <!--  -->
        </base-item-group>

        <base-item v-else :key="`item-${i}`" :item="item" />
      </template>

      <!-- Style cascading bug  -->
      <!-- https://github.com/vuetifyjs/vuetify/pull/8574 -->
      <div />
    </v-list>


  </v-navigation-drawer>
</template>

<script>
// Utilities
import { mapState } from "vuex";

export default {
  name: "DashboardCoreDrawer",

  props: {
    expandOnHover: {
      type: Boolean,
      default: false,
    },
  },

  data: () => ({
    items: [
      {
        icon: "mdi-view-dashboard",
        title: "dashboard",
        to: "/dashboard",
      },
      {
        icon: "mdi-account",
        title: "Solicitudes",
        to: "/home/requests/user",
      },
      {
        title: "Proyectos",
        icon: "mdi-clipboard-outline",
        to: "/home/projects",
      },
      {
        title: "Buzón opiniones",
        icon: "mdi-format-font",
        to: "/home/components/qrs",
      },
      {
        title: "Usuarios",
        icon: "mdi-chart-bubble",
        to: "/home/components/userslist",
      },
     /* {
        title: "google",
        icon: "mdi-map-marker",
        to: "/home/maps/google-maps",
      },
      {
        title: "notifications",
        icon: "mdi-bell",
        to: "/home/components/notifications",
      },
    */
    ],
    items2:[
      {
        icon: "mdi-view-dashboard",
        title: "dashboard",
        to: "/dashboard",
      },
      {
        icon: "mdi-account",
        title: "Solicitudes",
        to: "/home/requests/user",
      },
      {
        title: "Proyectos",
        icon: "mdi-clipboard-outline",
        to: "/home/projects",
      },
      {
        title: "Buzón opiniones",
        icon: "mdi-format-font",
        to: "/home/components/qrs",
      },
      
     /* {
        title: "google",
        icon: "mdi-map-marker",
        to: "/home/maps/google-maps",
      },
      {
        title: "notifications",
        icon: "mdi-bell",
        to: "/home/components/notifications",
      },
    */
    ],
    role : '',
  }),

  computed: {
    ...mapState(["barColor", "barImage"]),
    drawer: {
      get() {
        return this.$store.state.drawer;
      },
      set(val) {
        this.$store.commit("SET_DRAWER", val);
      },
    },
    computedItems() {


      return this.role !== "ROLE_USER"? this.items.map(this.mapItem) : this.items2.map(this.mapItem);
    },
    profile() {
      return {
        avatar: true,
        title: this.$t("avatar"),
      };
    },
  },
created(){
   const user = JSON.parse(localStorage.getItem("user"))._id;
    this.$store.dispatch("GET_REQUESTS_ALL");

      this.role = JSON.parse(localStorage.getItem("user")).role;
    console.log("role", this.role);
    
},
  methods: {
    mapItem(item) {
      return {
        ...item,
        children: item.children ? item.children.map(this.mapItem) : undefined,
        title: this.$t(item.title),
      };
    },
  },
};
</script>

<style lang="sass">
@import '~vuetify/src/styles/tools/_rtl.sass'


#core-navigation-drawer
  .v-list-group__header.v-list-item--active:before
    opacity: .24

    .v-list-item
      &__icon--text,
      &__icon:first-child
        justify-content: center
        text-align: center
        width: 20px

        +ltr()
          margin-right: 24px
          margin-left: 12px !important

        +rtl()
          margin-left: 24px
          margin-right: 12px !important

    .v-list--dense
      .v-list-item
        &__icon--text,
        &__icon:first-child
          margin-top: 10px

    .v-list-group--sub-group
      .v-list-item
        +ltr()
          padding-left: 8px

        +rtl()
          padding-right: 8px

      .v-list-group__header
        +ltr()
          padding-right: 0

        +rtl()
          padding-right: 0

        .v-list-item__icon--text
          margin-top: 19px
          order: 0

        .v-list-group__header__prepend-icon
          order: 2

          +ltr()
            margin-right: 8px

          +rtl()
            margin-left: 8px



            
</style>

<style lang="css">
 .v-application .primary{

  background-color: #0088cc !important;
 }

 .deep-purple{
  background-color: #5e5e5e !important;
 }
</style>
