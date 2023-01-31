<template>
  <div>
    <modal :show="show">
      <div class="text-end">
        <v-icon @click="close">mdi-close</v-icon>
      </div>
      <template>
        <v-form v-model="valid">
          <h4 class="font-weight-medium outline text-left">{{ title }}</h4>

          <v-chip
            dark
            class="font-weight-medium"
            style="margin-top: 25px"
            v-show="type !== 'Create'"
            >{{ modalReq.status }}</v-chip
          >
          <v-container>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="modalReq.title"
                  label="Título solicitud"
                  required
                  :disabled="type == 'Detail'"
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="6">
                <v-text-field
                  v-model="modalReq.type"
                  label="Tipo"
                  required
                  :disabled="type == 'Detail'"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="modalReq.project"
                  label="Proyecto"
                  required
                  :disabled="type == 'Detail'"
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="6">
                <v-text-field
                  v-model="modalReq.priority"
                  label="Prioridad"
                  required
                  :disabled="type == 'Detail'"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row> </v-row>
            <v-row v-if="type !== 'Detail' && role == 'ROLE_USER'">
              <v-col cols="12" md="6">
                <v-text-field
                  label="Urgencia"
                  required
                  v-model="modalReq.urgency"
                  :disabled="type == 'Detail'"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="modalReq.description"
                  color="teal"
                  label="Descripción"
                  :disabled="type === 'Detail'"
                >
                </v-text-field>
              </v-col>
            </v-row>
            <v-row v-if="type == 'Detail' && role == 'ROLE_ADMIN'">
              <v-col cols="12" md="4">
                <v-text-field
                  v-model="modalReq.priority"
                  :counter="10"
                  label="Prioridad"
                  required
                  :disabled="type == 'Detail'"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field
                  label="Estatus"
                  required
                  v-model="modalReq.status"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field
                  label="Urgencia"
                  required
                  v-model="modalReq.urgency"
                  :disabled="type == 'Detail'"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row v-show="type == 'Detail'">
              <v-col cols="12" sm="4">
                <v-text-field
                  v-model="modalReq.description"
                  color="teal"
                  label="Descripción"
                  :disabled="type === 'Detail'"
                >
                </v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col
                cols="12"
                sm="6"
                style="align-items: center; justify-content: center"
              >
                <v-file-input
                  chips
                  multiple
                  label="Archivos"
                  v-model="chosenFile"
                  v-on:change="upload"
                  v-show="type !== 'Detail'"
                >
                  <v-chip
                    small
                    label
                    color="primary"
                    v-show="type !== 'Detail'"
                    >{{ chosenFile }}</v-chip
                  >
                </v-file-input>
                <v-img
                  v-show="urlImgDam !== ''"
                  :src="modalReq.image"
                  @click="downloadImg(modalReq.image)"
                ></v-img>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6" v-if="type">
                <v-textarea
                  v-model="modalReq.feedBack.comment"
                  color="teal"
                  label="Feedback"
                  v-show="type == 'Detail'"
                >
                  <template v-slot:label>
                    <div>Feedback</div>
                  </template>
                </v-textarea>

                 <input type="file" @change="uploadFile" ref="file">
        <button @click="submitFile">Upload!</button>
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
import ax from "axios";
import { saveAs } from "file-saver";
export default {
  props: ["show", "title", "id", "type"],
  components: { Modal },
  data: () => ({
    valid: false,
    firstname: "",
    request: {},
    tipo: false,
    role: "",
    lastname: "",
    uploadPreset: `your upload preset`,
    cloudName: "your cloud name",
    urlImgDam: "",
    chosenFile: [],

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
    this.request = Object.assign({}, this.modalReq);
    this.chosenFile = this.modalReq.image;
    this.urlImgDam =
      this.modalReq.image !== ""
        ? this.modalReq.image
        : "https://metrika.com/images/empty-photo.jpg";
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
      this.role = JSON.parse(localStorage.getItem("user")).role;
      console.log("this", this.role, this.type);
      if (this.role === "ROLE_USER") {
        if (this.type == "Create") {
          this.modalReq.image = this.urlImgDam !== "" ? this.urlImgDam : "";
          this.urlImgDam = "";
          this.$store.dispatch("SAVE_REQUESTS_USER", this.modalReq);
          this.close();
          this.$emit("reqCreated");
        } else if (this.type == "Edit") {
          this.modalReq.image = this.urlImgDam !== "" ? this.urlImgDam : "";
          this.urlImgDam = "";
          this.$store.dispatch("UPDATE_REQUESTS_USER", this.modalReq);
          this.close();
          this.$emit("reqCreated");
        }
      } else if (this.role == "ROLE_ADMIN") {
        if (this.type === "Detail") {
          console.log("debo actualizar el estatus!!!", this.modalReq);
          this.modalReq.image = this.chosenFile;
          this.$store.dispatch("UPDATE_REQUESTS_USER_FEEDBACK", this.modalReq);
          this.$emit("reqCreated");
          this.close();
        }
      }
    },
    downloadImg(item) {
      let responseUrl = item;
      let url = item;
      fetch(url)
        .then((response) => response.blob())
        .then((blob) => {
          saveAs(blob, "image_name.jpg");
        });
      console.log("downloading", url);
    },
    async upload(e) {
      console.log("e", e);
      const file = e[0];
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "eoguktd6");

      try {
        const res = await ax.post(
          "https://api.cloudinary.com/v1_1/db4ne9cce/image/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        this.photoInfo = res.data;
        console.log("this.photo", this.photoInfo);
        this.urlImgDam = this.photoInfo.secure_url;

        this.modalReq.image = this.photoInfo.secure_url;
      } catch (e) {
        console.log(e);
      }
    },
       submitFile() {
        const formData = new FormData();
        formData.append('file', this.Images);
        const headers = { 'Content-Type': 'multipart/form-data' };
        axios.post('https://httpbin.org/post', formData, { headers }).then((res) => {
          res.data.files; // binary representation of the file
          res.status; // HTTP status
        });
      }
  },
};
</script>

<style scoped>
.col-custom {
  padding-left: 10px;
  padding-right: 10px;
}

.modal-container {
  width: 60% !important;
}
</style>
