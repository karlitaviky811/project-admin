<template>
  <div>
    <modal :show="show" v-if="modalRequest && type !== 'Delete'">
      <div class="text-end">
        <v-icon @click="close">mdi-close</v-icon>
      </div>
      <template>
        <v-form
          @submit.prevent="checkForm"
        >
    <v-alert
      dense
      outlined
      type="error"
      v-show="noValid"
    >
     Por favor llene todos los campos solicitados type
    </v-alert>

     <v-progress-linear
        :active="loading"
        :indeterminate="loading"
        absolute
        bottom
        color="deep-purple-accent-4"
      ></v-progress-linear>


          <h4 class="font-weight-medium outline text-left">{{ title }}</h4>

          <v-chip dark class="font-weight-medium" style="marparamsProjectgin-top: 25px" v-show="type !== 'Create'">{{
            modalRequest.status
          }}</v-chip>
          <v-container>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field   v-model="modalRequest.title" label="Título solicitud" required
                  :disabled="type == 'Detail'"></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-select v-model="modalRequest.type" label="Seleccione tipo" persistent-hint :items="params" required
                :disabled="type == 'Detail'"
                  item-text="name" item-value="rol">
                </v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="6">
              <v-select v-if="paramsProject.length" v-model="modalRequest.project" label="Proyecto" requiredpersistent-hint :items="paramsProject"
                :disabled="type == 'Detail'"
                :required="title"
                item-text="title" item-value="title">
              </v-select>
              </v-col>
              <v-col cols="12" md="6">
                <v-select v-model="modalRequest.priority" label="Prioridad" requiredpersistent-hint :items="paramsPriority"
                :disabled="type == 'Detail'"
                required
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
                <v-text-field v-model="modalRequest.description" color="teal" label="Descripción"
                required
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
            <v-row>
              <v-col cols="12" sm="6" style="align-items: center; justify-content: center">
                <div>
                  <v-file-input 
                  show-size counter
                  chips multiple 
                  label="Archivos" 
                  v-model="chosenFile" 
                  v-on:change="upload"
                  v-show="type !== 'Detail'">
                  <v-chip small label color="primary">{{chosenFile }}</v-chip>
                </v-file-input>
                </div>
                <div style="display:flex;">
                 
                <v-img
                v-show="urlImgDam !== ''"
                :src="modalReq.image"
                @click="downloadImg(modalReq.image)"
              ></v-img>
                <v-btn fab small v-show="true" class="mx-2" color="green"
                @click="downloadImg(modalRequest)">
                <v-icon dark>mdi-arrow-down </v-icon>
              </v-btn>
                </div>
                <!--div style="display:flex;">
                  <v-file-input 
                  show-size counter
                  chips multiple 
                  label="Archivos" 
                  v-model="chosenFile" 
                  v-on:change="upload"
                  v-show="type !== 'Detail'">
                  <v-chip small label color="primary">{{chosenFile }}</v-chip>
                </v-file-input>
                <v-img
                v-show="urlImgDam !== ''"
                :src="modalReq.image"
                @click="downloadImg(modalReq.image)"
              ></v-img>
                <v-btn fab small v-show="true" class="mx-2" color="green"
                @click="downloadImg(modalRequest)">
                <v-icon dark>mdi-arrow-down </v-icon>
              </v-btn>
                </div-->
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6" v-if="type">
                <v-textarea v-model="modalRequest.description" color="teal" label="Descripcion" v-if="type == 'Detail'"
                :disabled="type == 'Detail'"
                >
                  <template v-slot:label>
                    <div>Descripcion</div>
                  </template>
                </v-textarea>

                <!--v-file-input show-size counter chips multiple label="Arquivo Geral"  v-model="files" ref="file" @change="upload"></v-file-input-->
              </v-col>
              <v-col cols="12" sm="6" v-if="type">
                <v-textarea v-model="modalRequest.feedBack.comment" color="teal" label="Feedback" v-show="type == 'Detail'"
                :disabled="role == 'ROLE_USER'"
                >
                  <template v-slot:label>
                    <div>Feedback</div>
                  </template>
                </v-textarea>
                <!--v-file-input show-size counter chips multiple label="Arquivo Geral"  v-model="files" ref="file" @change="upload"></v-file-input-->
              </v-col>
            </v-row>

            <v-row class="mt-5">
              <v-spacer></v-spacer>
              <v-btn color="secondary" text @click="close">Cerrar</v-btn>
              <v-btn color="primary" text @click="save" type="submit" >Guardar</v-btn>
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
            @click="show = false"
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
import ax from "axios";
import { saveAs } from "file-saver";

export default {
  props: ["show", "title", "id", "type"],
  
  components: { Modal },
  data: () => ({
    noValid : false,
    valid: false,
    firstname: "",
    request: {},
    tipo: false,
    role: "",
    lastname: "",
    urlImgDam: "",
    chosenFile: [],
    modalRequest: [],
    loading: false,
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
        id: 3,
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
    this.request = Object.assign({}, this.modalRequest);
    this.urlImgDam =this.modalReq.image
    this.$store.dispatch("GET_PROJECTS_ALL");
    console.log("heree type", this.type)
  },
  computed: {
    ...mapGetters(["modalReq"]),
    ...mapGetters(["user"]),
    ...mapGetters(["projectsList"]),
     rules() {
      const valid = (this.values[0] + '').length < (this.values[1] + '').length;
      return {
        first: [() => valid || "Must have less characters than second value"], 
        second: [() => valid || "Must have more characters than first value"]
      };
    }
  },
  watch: {
    modalReq(){
      this.modalRequest = this.modalReq
    },
    projectsList(){
      this.paramsProject = this.projectsList
    },
    modalRequest(){
      
      if(this.modalRequest.title !== ""){
        return true
      }

      return false
    }
  },
  methods: {
    close: function () {
      this.$emit("close");
    },
    validForm(){
     
      if(this.modalRequest.title !== ""){
        return false
      }

      return true
    },
   async save() {
      this.role = JSON.parse(localStorage.getItem("user")).role;
      this.checkForm()
       this.loading = true;
        if (this.role === "ROLE_USER") {
        if (this.type == "Create") {
          if(!this.noValid){
       
         await  this.$store.dispatch("SAVE_REQUESTS_USER", this.modalRequest);
          this.close();
          this.loading = false;
          this.$emit("reqCreated");

          }
        } else if (this.type == "Edit") {
          if(!this.noValid){
          await this.$store.dispatch("UPDATE_REQUESTS_USER", this.modalRequest);
          this.close();
           this.$emit("reqCreated");
        
          }
        }
      } else if (this.role == "ROLE_ADMIN") {
        if (this.type === "Detail") {
         await  this.$store.dispatch("UPDATE_REQUESTS_USER_FEEDBACKS", this.modalRequest);
          this.$emit("reqCreated");
          this.close();
        }
      }
    
    },
     async deleted() {
      this.role = JSON.parse(localStorage.getItem("user")).role;
      this.checkForm()
       this.loading = true;
     
       
         await  this.$store.dispatch("DELETE_REQUEST", this.modalRequest._id);
          this.close();
          this.show = false;
         await this.$emit("reqCreated");

    },
    downloadImg(item) {
      let responseUrl = item;
      let url =  this.modalRequest.image;
      console.log("img",  this.modalRequest.image)
      fetch(url)
        .then((response) => response.blob())
        .then((blob) => {
          saveAs(blob, "image_name.jpg");
        });
      console.log("downloading", url);
    },
   async upload(e) {
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
      
        this.modalRequest.image = this.photoInfo.secure_url;
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
    },
    checkForm(e) {
  
      if (this.modalRequest.title && this.modalRequest.description) {
        this.noValid = false;
      }
    
      this.errors = [];

      if (!this.modalRequest.title) {
        this.errors.push('Titulo required.');
        this.noValid = true
      }
      if (!this.modalRequest.description) {
        this.errors.push('Descripcion required.');
        this.noValid = true
      }
    
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
