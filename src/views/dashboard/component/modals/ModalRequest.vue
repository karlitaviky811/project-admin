<template>
  <div>
    <modal :show="show" v-if="modalRequest">
      <div class="text-end">
        <v-icon @click="close">mdi-close</v-icon>
      </div>
      <template>
        <v-form v-model="valid">
          <h4 class="font-weight-medium outline text-left">{{ title }}</h4>

          <v-chip dark class="font-weight-medium" style="marparamsProjectgin-top: 25px" v-show="type !== 'Create'">{{
            modalRequest.status
          }}</v-chip>
          <v-container>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field v-model="modalRequest.title" label="Título solicitud" required
                  :disabled="type == 'Detail'"></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-select v-model="modalRequest.type" label="Seleccione tipo" persistent-hint :items="params"
                  item-text="name" item-value="rol">
                </v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field v-model="modalRequest.project" label="Proyecto" required
                  :disabled="type == 'Detail'"></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-select v-model="modalRequest.priority" label="Prioridad" requiredpersistent-hint :items="paramsPriority"
                :disabled="type == 'Detail'"
                item-text="name" item-value="rol">
              </v-select>
              </v-col>
             
            </v-row>
            <v-row> </v-row>
            <v-row v-if="type !== 'Detail' && role == 'ROLE_USER'">
              <v-col cols="12" md="6">
                <v-select v-model="modalRequest.urgency" label="Seleccione tipo" persistent-hint :items="paramsUrgency"
                  item-text="name" item-value="type" :disabled="type == 'Detail'">
                </v-select>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field v-model="modalReq.description" color="teal" label="Descripción"
                  :disabled="type === 'Detail'">
                </v-text-field>
              </v-col>
            </v-row>
            <v-row v-if="type == 'Detail' && role == 'ROLE_ADMIN'">
              <v-col cols="12" md="6">
                <v-text-field label="Estatus" required v-model="modalRequest.status"></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field label="Urgencia" required v-model="modalReq.urgency"
                  :disabled="type == 'Detail'"></v-text-field>
              </v-col>
            </v-row>
            <v-row v-show="type == 'Detail'">
              <v-col cols="12" sm="4">
                <v-text-field v-model="modalRequest.description" color="teal" label="Descripción"
                  :disabled="type === 'Detail'">
                </v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6" style="align-items: center; justify-content: center">
                <div style="display:flex;">
                  <v-file-input 
                  chips multiple 
                  label="Archivos" 
                  v-model="chosenFile" 
                  v-on:change="upload"
                  v-show="type !== 'Detail'">
                  <v-chip small label color="primary">{{ chosenFile }}</v-chip>

                    
                </v-file-input>
                <v-btn fab small v-show="true" class="mx-2" color="green"
                @click="downloadImg(chosenFile)">
                <v-icon dark>mdi-arrow-down </v-icon>
              </v-btn>
                </div>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6" v-if="type">
                <v-textarea v-model="modalRequest.feedBack.comment" color="teal" label="Feedback" v-show="type == 'Detail'">
                  <template v-slot:label>
                    <div>Feedback</div>
                  </template>
                </v-textarea>
                <!--v-file-input show-size counter chips multiple label="Arquivo Geral"  v-model="files" ref="file" @change="upload"></v-file-input>
                 <button @click="submitFile">Upload!</button-->
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
    urlImgDam: "",
    chosenFile: [],
    modalRequest: [],
    params: [
      {
        id: 1,
        type: "Cambio",
        name: "Cambio",
      },
      {
        id: 2,
        type: "Incidencia",
        name: "Incidencia",
      },
      {
        id: 2,
        type: "Problema",
        name: "Problema",
      },
    ],
    paramsUrgency: [
      {
        id: 1,
        type: "urgente",
        name: "Cambio urgente",
      },
      {
        id: 2,
        type: "natural",
        name: "Cambio natural",
      },
    ],
    paramsPriority: [
      {
        id: 1,
        type: "alta",
        name: "Alta",
      },
      {
        id: 2,
        type: "media",
        name: "Media",
      },
      {
        id: 2,
        type: "baja",
        name: "Baja",
      }
    ],
    paramsProject:[],
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
    this.urlImgDam = ""
    this.$store.dispatch("GET_PROJECTS_ALL");
  },
  computed: {
    ...mapGetters(["modalReq"]),
    ...mapGetters(["user"]),
    ...mapGetters(["projectsList"]),
  },
  watch: {
    modalReq(){
      this.modalRequest = this.modalReq
    }
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
          this.$store.dispatch("SAVE_REQUESTS_USER", this.modalReq);
          this.close();
          this.$emit("reqCreated");
        } else if (this.type == "Edit") {
          this.$store.dispatch("UPDATE_REQUESTS_USER", this.modalReq);
          this.close();
          this.$emit("reqCreated");
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
    downloadImg(item) {
      let responseUrl = item;
      let url = item;
      console.log("img", img)
      fetch(url)
        .then((response) => response.blob())
        .then((blob) => {
          saveAs(blob, "image_name.jpg");
        });
      console.log("downloading", url);
    },
    upload(e) {
      /* console.log("this.refs", this.$refs)
       console.log("e", e);
 
 
       const reader = new FileReader();
         reader.readAsDataURL(e[0]);
         reader.onload = (res) => {
           console.log("res", res.target.result)
         };
         reader.onerror = (error) => reject(error);
       */
      const file = e[0];
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "eoguktd6");


      try {
        const res = ax.post(
          "https://api.cloudinary.com/v1_1/db4ne9cce/image/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        this.photoInfo = res.data;
        this.urlImgDam = this.photoInfo.secure_url;

        this.modalReq.image = this.photoInfo.secure_url;
      } catch (e) {
        console.log(e);
      }


    },
    submitFile() {

      return new Promise((resolve, reject) => {
        console.log("file", file)
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
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
