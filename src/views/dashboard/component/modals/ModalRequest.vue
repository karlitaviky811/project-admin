<template>
  <div>
    <modal :show="show">
      <div class="text-end">
        <v-icon @click="close">mdi-close</v-icon>
      </div>
      <template>
        <v-form v-model="valid">
          <h3 class="font-weight-medium outline text-left">{{ title }}</h3>
          <v-container>
            <v-row>
              <v-col cols="12" md="4">
                <v-text-field
                  v-model="modalReq.title"
                  label="Título solicitud"
                  required
                  solo
                  :disabled="type=='Detail'"
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="4">
                <v-text-field
                  v-model="modalReq.type"
                  :counter="10"
                  label="Tipo"
                  required
                  solo
                  :disabled="type=='Detail'"
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="4">
                <v-text-field
                  v-model="modalReq.project"
                  label="Proyecto"
                  required
                  solo
                  :disabled="type=='Detail'"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="4">
                <v-text-field
                  v-model="modalReq.priority"
                  :counter="10"
                  label="Prioridad"
                  required
                  solo
                  :disabled="type=='Detail'"
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="4">
                <v-text-field
                  v-model="modalReq.status"
                  :counter="10"
                  label="Estatus"
                  required
                  solo
                  :disabled="!role === 'ROLE_USER'"
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="4">
                <v-text-field
                  label="Urgencia"
                  required
                  :disabled="type=='Detail'"
                  solo
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6">
                <v-textarea
                  v-model="modalReq.description"
                  color="teal"
                  label="Descripción"
                  height="100"
                  :disabled="role === 'ROLE_USER'"
                >
                  <template v-slot:label>
                    <div>Descripción <small>(optional)</small></div>
                  </template>
                </v-textarea>
              </v-col>
              <v-col cols="12" sm="6">
                <v-file-input
                  chips
                  multiple
                  solo
                  label="Ficheros de liquidación y fechas de envíos"
                ></v-file-input>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6" v-if="type">
                <v-textarea
                  v-model="modalReq.feedBack.comment"
                  color="teal"
                  label="Feedback"
                  :disabled="role === 'ROLE_USER'"
                >
                  <template v-slot:label>
                    <div>Feedback</div>
                  </template>
                </v-textarea>
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
  </div>
</template>

<script>
import Modal from "./Modal";
import { mapGetters } from "vuex";
export default {
  props: ["show", "title", "req", "id", "type"],
  components: { Modal },
  data: () => ({
    valid: false,
    firstname: "",
    request: {},
    tipo: false,
    role: "",
    lastname: "",
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
  mounted() {
    console.log("hey", this.type, this.modalReq);
    this.role = JSON.parse(localStorage.getItem("user")).role;
    console.log("role", this.role);
    this.request = Object.assign({}, this.modalReq);
  },
  computed: {
    ...mapGetters(["modalReq"]),
    ...mapGetters(["user"]),
  },
  methods: {
    close: function () {
      this.$emit("close");
    },
    save() {

      if(this.role === 'ROLE_USER'){
         if (this.id === 0) {
        this.$store.dispatch("SAVE_REQUESTS_USER", this.request);
      } else {
        this.$store.dispatch("UPDATE_REQUESTS_USER", this.request);
      }

      }else{
        console.log("debo actualizar el estatus!!!", this.modalReq)

        this.$store.dispatch("UPDATE_REQUESTS_USER_FEEDBACK", this.modalReq)
      }
     
      this.close();
      this.$emit("reqCreated");
    },
    createReq() {},
  },
};
</script>

<style scoped>
.col-custom {
  padding-left: 10px;
  padding-right: 10px;
}
</style>
