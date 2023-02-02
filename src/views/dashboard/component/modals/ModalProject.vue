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
                  v-model="modalProject.title"
                  label="Título"
                  required
                  :disabled="type == 'Detail'"
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="4">

              <v-select v-model="modalProject.department"  required label="Departamento" requiredpersistent-hint :items="params"
                :disabled="type == 'Detail'"
                item-text="name" item-value="type">
              </v-select>
               
              </v-col>
               <v-col cols="12" md="4">
                <v-text-field
                  v-model="modalProject.tecnology"
                  label="Tecnologia"
                  required
                  :disabled="type == 'Detail'"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="6">
                <v-textarea
                  name="input-7-1"
                  label="Descripción"
                  v-model="modalProject.description"
                ></v-textarea>
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
  props: ["show", "title", "id", "type", "project"],
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
         params: [
      {
        id: 1,
        type: "Computación",
        name: "Computación",
      },
      {
        id: 2,
        type: "Quimica",
        name: "Quimica",
      },
      {
        id: 3,
        type: "Matematica",
        name: "Matematica",
      },
      {
        id: 4,
        type: "Biología",
        name: "Biología",
      },
       {
        id: 5,
        type: "Física",
        name: "Física",
      },
    ],
  }),
  created() {
    this.role = JSON.parse(localStorage.getItem("user")).role;
    this.request = Object.assign({}, this.modalProject);
  },
  computed: {
    ...mapGetters(["modalProject"]),
    ...mapGetters(["user"]),
  },
  methods: {
    close: function () {
      this.$emit("close");
    },
    save() {
      this.role = JSON.parse(localStorage.getItem("user")).role;
      console.log("this", this.role, this.type);
      if (this.role === "ROLE_ADMIN") {
        if (this.type == "Create") {
          this.$store.dispatch("SAVE_PROJECT_REQ", this.modalProject);
          this.close();
          this.$emit("reqProject");
        } else if (this.type == "Edit") {
          this.$store.dispatch("UPDATE_PROJECT_REQ", this.modalProject);
          this.close();
          this.$emit("reqProject");
        }
      } else if (this.role == "ROLE_ADMIN") {
        if (this.type === "Detail") {
          console.log("debo actualizar el estatus!!!", this.modalReq);

          this.$store.dispatch("UPDATE_REQUESTS_USER_FEEDBACK", this.modalReq);
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
