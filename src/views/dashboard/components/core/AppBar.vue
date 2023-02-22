<template>
  <v-app-bar
    id="app-bar"
    absolute
    app
    color="transparent"
    flat
    height="75"
  >

    <v-toolbar-title
      class="hidden-sm-and-down font-weight-light"
      v-text="$route.name"
    />

    <v-spacer />
    <div class="mx-3" />
  <span color="primary">Sistema de Gestion de Cambios</span>
    <v-menu
      bottom
      left
      offset-y
      origin="top right"
      transition="scale-transition"
    >
      <template v-slot:activator="{ attrs, on }">
        <v-btn
          class="ml-2"
          min-width="0"
          text
          v-bind="attrs"
          v-on="on"
      
        >
         <v-icon>mdi-account</v-icon>
        </v-btn>
      </template>

      <v-list
        :tile="false"
        nav
      >
        <div>
          <app-bar-item
            v-for="(n, i) in notifications"
            :key="`item-${i}`"
            
          >
          
            <v-list-item-title v-text="n" @click="menuActionClick()" />
          </app-bar-item>
        </div>
      </v-list>
    </v-menu>

    <!--v-btn
      class="ml-2"
      min-width="0"
      text
      to="home/"
    >
      <v-icon>mdi-off</v-icon>
    </v-btn-->
  </v-app-bar>
</template>

<script>
  // Components
  import { VHover, VListItem } from 'vuetify/lib'

  // Utilities
  import { mapState, mapMutations } from 'vuex'
  import router from "@/router";
  export default {
    name: 'DashboardCoreAppBar',

    components: {
      AppBarItem: {
        render (h) {
          return h(VHover, {
            scopedSlots: {
              default: ({ hover }) => {
                return h(VListItem, {
                  attrs: this.$attrs,
                  class: {
                    'black--text': !hover,
                    'white--text secondary elevation-12': hover,
                  },
                  props: {
                    activeClass: '',
                    dark: hover,
                    link: true,
                    ...this.$attrs,
                  },
                }, this.$slots.default)
              },
            },
          })
        },
      },
    },

    props: {
      value: {
        type: Boolean,
        default: false,
      },
    },

    data: () => ({
      notifications: [
        'Salir del sistema',
      ],
    }),

    computed: {
      ...mapState(['drawer']),
    },

    methods: {
      ...mapMutations({
        setDrawer: 'SET_DRAWER',
      }),
      menuActionClick(){
        console.log("log out")

                router.push("/login")
      }
    },
  }
</script>
<style>
.body{
background: rgba( 255, 255, 255, 0.2 ) !important;
box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 ) !important;
backdrop-filter: blur( 10px ) !important;
-webkit-backdrop-filter: blur( 4px ) !important;
border-radius: 10px !important;
border: 1px solid rgba( 255, 255, 255, 0.18 ) !important;
}
</style>