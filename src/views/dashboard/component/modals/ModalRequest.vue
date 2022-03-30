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
                  v-model="request.title"
                  label="Título solicitud"
                  required
                  solo
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="4">
                <v-text-field
                  v-model="request.type"
                  :counter="10"
                  label="Tipo"
                  required
                  solo
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="4">
                <v-text-field
                  v-model="request.project"
                  label="Proyecto"
                  required
                  solo
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="4">
                <v-text-field
                  v-model="request.priority"
                  :counter="10"
                  label="Prioridad"
                  required
                  solo
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="4">
                <v-text-field
                  v-model="request.status"
                  :counter="10"
                  label="Estatus"
                  required
                  solo
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="4">
                <v-text-field label="Urgencia" required solo></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6">
                <v-textarea
                  v-model="request.description"
                  color="teal"
                  label="Descripción"
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
            <v-row class="mt-5">
              <v-spacer></v-spacer>
              <v-btn color="secondary" text @click="close">Cerrar</v-btn>
              <v-btn color="primary" text @click="save">Guardar</v-btn>
            </v-row>
          </v-container>
        </v-form>
      </template></modal
    >
  </div>
</template>
    </modal>
  </div>
</template>

<script>
import Modal from "./Modal";
export default {
  props: ["show", "title", "req", "id"],
  components: { Modal },
  data: () => ({
    valid: false,
    firstname: "",
    request: {},
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
    this.request = Object.assign({}, this.req);
  },
  methods: {
    close: function () {
      this.$emit("close");
    },
    save() {
      if (this.id === 0) {
        this.$store.dispatch("SAVE_REQUESTS_USER", this.request);
      } else {
        this.$store.dispatch("UPDATE_REQUESTS_USER", this.request);
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
