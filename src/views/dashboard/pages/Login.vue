<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center style="flex-direction:column;width:100%;">
         <div  style="display:flex;flex-direction:column;">
                <v-flex xs12 sm8 md4>
              <img
                :src="'http://www.facyt.uc.edu.ve/sites/default/files/logo-completo_0_0_0_0_0.png'"
              />

          </v-flex>
         </div>
      
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12" style="width:480px;">
              <v-toolbar dark color="#0088cc">
                <v-toolbar-title>Login</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    name="login"
                    label="Login"
                    type="text"
                  ></v-text-field>
                  <v-text-field
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
  methods: {
    test() {
      /* this.$router.push({name:'Test',params:{}});
         console.log("helo");*/
      this.$store.dispatch("LOGIN_USER");
    },
  },
};
</script>

<style></style>
