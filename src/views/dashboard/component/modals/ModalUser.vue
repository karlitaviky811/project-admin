<template>
  <div>
    <modal :show="show && type !== 'Delete'">
      <div class="text-end">
        <v-icon @click="close">mdi-close</v-icon>
      </div>
      <template style="width: 200px !important">
        <v-form v-model="valid">
          <h3 class="font-weight-medium outline text-left">{{ title }}</h3>

          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="modalUser.name"
                  label="Nombre"
                  required
                  :disabled="type == 'Detail'"
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-text-field
                  v-model="modalUser.surname"
                  :counter="10"
                  label="User"
                  required
                  :disabled="type == 'Detail'"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-row>
                  <v-col cols="12">
                    <v-select
                      v-model="modalUser.role"
                      label="Seleccione rol"
                      persistent-hint
                      :items="params"
                       item-text="name"
                      item-value="rol"
                    >
                    </v-select>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  name="input-7-1"
                  label="Email"
                  v-model="modalUser.email"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  name="input-7-1"
                  label="Password"
                  type="password"
                  v-model="modalUser.password"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row class="mt-5">
              <v-spacer></v-spacer>
              <v-btn color="secondary" text @click="close">Cerrar</v-btn>
              <v-btn color="primary" text @click="save">Guardar</v-btn>
            </v-row>
          </v-container>
        </v-form>
      </template>
    </modal>

  <modal :show="show" v-if=" type == 'Delete'"    max-width="180">
    
        <v-card-title class="headline">Eliminar</v-card-title>

        <v-card-text>
          ¿Esta seguro(a) de eliminar el elemento seleccionado ?
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="green darken-1"
            text
            @click="desagree()"
          >
            Cancelar
          </v-btn>

          <v-btn
            color="green darken-1"
            text
            @click="deleted()"
          >
            Aceptar
          </v-btn>
        </v-card-actions>
    </modal>
  </div>
</template>

<script>
import Modal from "./Modal";
import { mapGetters } from "vuex";
export default {
  props: ["show", "title", "id", "type", "project"],
  components: { Modal },
  data: () => ({
    valid: false,
    firstname: "",
    request: {},
    tipo: false,
    role: "",
    lastname: "",
    params: [
      {
        id: 1,
        rol: "ROLE_USER",
        name: "Usuario",
      },
      {
        id: 2,
        rol: "ROLE_ADMIN",
        name: "Administrador",
      },
    ],
    nameRules: [
      (v) => !!v || "Name is required",
      (v) => v.length <= 10 || "Name must be less than 10 characters",
    ],
    email: "",
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+/.test(v) || "E-mail must be valid",
    ],
  }),
  created() {
    this.role = JSON.parse(localStorage.getItem("user")).role;
    if (this.modalUser.type !== "Detail") {
      this.role = "Usuario";
    }
    this.request = Object.assign({}, this.modalUser);
  },
  computed: {
    ...mapGetters(["modalUser"]),
    ...mapGetters(["user"]),
  },
  methods: {
    close: function () {
      this.$emit("close");
    },
     async deleted() {
                const user = JSON.parse(localStorage.getItem("user"))._id;
                console.log("hiii", this.modalUser)
       await  this.$store.dispatch("DELETE_USER", this.modalUser._id);
       
      this.close();

    },
     desagree(){
      this.close();
this.show = false
    },
  async  save() {
      this.role = JSON.parse(localStorage.getItem("user")).role;
      console.log("this", this.role, this.type, this.modalUser);
      if (this.role === "ROLE_ADMIN") {
        if (this.type == "Create") {
        await  this.$store.dispatch("SAVE_NEW_USER", this.modalUser);
          this.close();
          this.$emit("reqProject");
        } else if (this.type == "Edit") {
       await  this.$store.dispatch("UPDATE_USER", this.modalUser);
          this.close();
          this.$emit("reqProject");
        }
      } else if (this.role == "ROLE_ADMIN") {
        if (this.type === "Detail") {
        await  this.$store.dispatch("UPDATE_REQUESTS_USER_FEEDBACK", this.modalReq);
          this.$emit("reqCreated");
          this.close();
        }
      }
    },
  },
  
};
</script>

<style scoped>
.col-custom {
  padding-left: 10px;
  padding-right: 10px;
}
</style>
