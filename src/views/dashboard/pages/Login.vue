<template>
  <v-app id="inspire">
    <v-content class="body">
      <v-container fluid fill-height class="block">
        <v-layout
          align-center
          justify-center
          style="flex-direction: column; width: 100%"
        >
          <v-flex xs12 sm8 md4>
            <div style="display: flex; flex-direction: column">
              <v-flex xs12 sm8 md4>
                <img
                  :src="'http://www.facyt.uc.edu.ve/sites/default/files/logo-completo_0_0_0_0_0.png'"
                />
              </v-flex>
            </div>
            <v-card class="elevation-12" style="width: 480px">
              <v-toolbar dark color="#0088cc">
                <v-toolbar-title>Login</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    v-model="user"
                    name="login"
                    label="Login"
                    type="text"
                  ></v-text-field>
                  <v-text-field
                    v-model="password"
                    id="password"
                    name="password"
                    label="Password"
                    type="password"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="#0088cc" @click="test">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "Login",
  props: {
    source: String,
  },
  data: () => ({
    user: "",
    password: "",
  }),
  methods: {
    test() {
      var user = {
        user: this.user,
        password: this.password,
      };
      /* this.$router.push({name:'Test',params:{}});
         console.log("helo");*/
      this.$store.dispatch("LOGIN_USER", user);
    },
  },
};
</script>

<style>
.body {
  background: rgba(255, 255, 255, 0.2) !important;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37) !important;
  backdrop-filter: blur(10px) !important;
  -webkit-backdrop-filter: blur(4px) !important;
  border-radius: 10px !important;
  border: 1px solid rgba(255, 255, 255, 0.18) !important;
}

.block {
  background-image: url("https://i.pinimg.com/564x/ed/82/f4/ed82f4f6c52e37284a0c5fa2bcaf6911.jpg");
  background-repeat: no-repeat;
  background-size: 100%;
  background-attachment: fixed;
}

</style>
