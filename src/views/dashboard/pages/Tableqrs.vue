<template>
  <v-container   id="regular-tables"
    fluid
    tag="section">
    <div class="py-3" />
    <v-alert border="top" colored-border type="info" elevation="2">
     Por favor compartenos tus opiniones
    </v-alert>
    <base-material-card
      color="primary"
      icon="mdi-account-alert"
      title="Listado"
      class="px-5 py-3"
      style="width: 100%;"
    >
      <v-container class="d-flex flex-column align-end">
        <v-row>
          <v-col>
            <v-tooltip left>
              <template v-slot:activator="{ on: tooltip }">
                <v-btn
                  v-on="{ ...tooltip }"
                  fab
                  small
                  v-show="true"
                  color="success"
                  @click.stop="create(true)"
                >
                  <v-icon dark>mdi-plus</v-icon>
                </v-btn>
                <modal-qrs
                  :id="id"
                  :project="project"
                  :show="showModal(true)"
                  :type="type"
                  :title="title"
                  @close="toggleModalClose(true)"
                  @reqProject="loadProjects"
                />
              </template>
              <span>Nuevo</span>
            </v-tooltip>
          </v-col>
        </v-row>
      </v-container>

           <v-toolbar flat class="d-flex flex-column align-end">
            <v-spacer />
            <v-text-field
              v-model="search"
              v-bind:label="'Buscar solicitud'"
              append-icon="mdi-magnify"
              single-line
              hide-details
            ></v-text-field>
          </v-toolbar>
      <v-data-table
        :headers="headers"
        :items="QrsList"
        :items-per-page="20"
        :search="search"
        :loading="data"
        style="width: 100%;"
      >
        <template v-slot:item="{ item, index }">
          <tr>
            <td >{{ index + 1 }}</td>
            <td>{{ 'QRS'+ item._id.slice(-10) }}</td>
            <td >{{ item.title }}</td>
            <td>{{  item.type }}</td>
            <td>{{ convertDate(item.date) }}</td>
            <td  width="200">{{ item.description }}</td>
          <td>   <v-chip :color="getColor(item.status)">
        {{ item.status }}
      </v-chip></td>

            
            <td>{{ item.user.name }}</td>

            <td v-show="true"  width="200">
              <v-tooltip bottom>
                <template v-slot:activator="{ on: tooltip }">
                  <v-btn
                    v-on="{ ...tooltip }"
                    fab
                    small
                    v-show="true"
                    class="mx-2"
                    color="success"
                    @click.stop="edit(item)"
                  >
                    <v-icon dark>mdi-pencil</v-icon>
                  </v-btn>
                </template>
                <span>Editar</span>
              </v-tooltip>
              <v-tooltip bottom>
                <template v-slot:activator="{ on: tooltip }">
                  <v-btn
                    v-on="{ ...tooltip }"
                    class="mx-2"
                    fab
                    small
                    color="red"
                    @click="deleted(item)"
                  >
                    <v-icon dark>mdi-delete</v-icon>
                  </v-btn>
                </template>
                <span>Eliminar</span>
              </v-tooltip>
            </td>
          </tr>
        </template>
      </v-data-table>
    </base-material-card>
  </v-container>
</template>
<script>
import { mapGetters } from "vuex";
import moment from "moment";
import ModalQrs from "../component/modals/ModalQrs.vue";
export default {
  name: "Tableqrs",
  components: {
    ModalQrs,
  },
  created() {
    const user = JSON.parse(localStorage.getItem("user"))._id;
    this.data = true;
    this.$store.dispatch("GET_QRS_ALL");
    this.data = false;
  },

  data() {
    return {
      search: "",
      isModalVisible: false,
      activeModal: false,
      expanded: [],
      title: "Test",
      data: false,
      role: "",
      id: "",
      request: {},
      singleExpand: false,
      dialog: false,
      type: false,
      props: {
        expanded: false,
      },
      project: {},
      headers: [
        { text: "#", value: "" },
        { text: "ID", value: "_id" },
        { text: "Título", value: "title" },
        { text: "Tipo", value: "type", sortable: false },
        { text: "Fecha", value: "date", sortable: false },
        { text: "Descripción", value: "description" },
        { text: "Estatus", value: "status", sortable: false },
        { text: "Usuario", value: "user.name", sortable: false },
        { text: "", sortable: false, value: "actions" },
      ],
    };
  },
  computed: {
    ...mapGetters(["token"]),
    ...mapGetters(["QrsList"]),
    ...mapGetters(["modalQrs"]),
  },
  methods: {
    clickColumn(slotData) {
      console.log("say hi");
    },
    activeDetail() {
      this.$router.push({
        name: "Detail",
        params: {},
      });
    },
    convertDate(value) {
      let date = "";

      if (value !== null) {
        date = moment(value).format("YYYY-MM-DD");
      } else {
        date = "-";
      }
      return date;
    },
    create(id) {
      this.title = "Crear QRS";
      this.show = true;
      this.toggleModal(id);
      const qrs = {
        _id: "",
        date: "",
        type: "",
        title: "",
        project: "",
        description: "",
        status: "",
        feedBack: {
          comment: "Default",
        },
      };
      this.request = Object.assign({}, qrs);
      console.log("epaaa", this.modalQrs);

      this.$store.commit("setQrsModal", qrs);
      this.type = "Create";
    },
    edit(item) {
      this.id = item._id;
      this.title = "Editar QRS";
      this.show = true;
      this.toggleModal(item._id);
      this.type = "Edit";
      this.request = Object.assign({}, item);
      console.log("this ---->", this.request);
      this.$store.commit("setQrsModal", this.request);
      this.dialog = true;
    },
    detail(item) {
      this.type = "Detail";
      this.title = "Detalle";
      this.request = Object.assign({}, item);
      console.log("item", item);
      this.$store.commit("setRequestsUserModal", this.request);
      this.toggleModal(item._id);
    },
     deleted(item){
      this.id = item._id;
      this.title = "Editar";
      this.toggleModal(this.id);
      this.request = Object.assign({}, item);
      this.$store.commit("setQrsModal",this.request);
      this.type = 'Delete';
      this.show = true;
      this.dialog = true;

    },
    toggleModal: async function (id) {
      this.activeModal = !this.activeModal;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    showModal: function (id) {
      return this.activeModal == id;
    },
    openModal: function (req) {
      this.request = Object.assign({}, req);
      this.dialog = true;
    },
    toggleModalClose: async function (id) {
      if (this.activeModal !== 0) {

        this.activeModal = 0;
        return false;
      }

      this.activeModal = id;
    },
  async  loadProjects() {
      this.data = true;
      const user = JSON.parse(localStorage.getItem("user"))._id;
    await  this.$store.dispatch("GET_QRS_ALL");
    console.log("data type", this.data)
      this.data = false;
      this.role = JSON.parse(localStorage.getItem("user")).role;
    },
    loadRequests() {
      //const user = JSON.parse(localStorage.getItem("user"))._id;
     this.$store.dispatch("GET_QRS_ALL");
      this.role = JSON.parse(localStorage.getItem("user")).role;
      this.data = false;
    },
     getColor (item) {
 

         if(item == "Enviada al admin"){
        return "#e6e6fa"
      }else
        if(item == "Feedback del Administrador"){
          return "#20b2aa"
        }
            
    },
  
  },
};
</script>

<style scoped>
.buttonStyle {
  background-color: transparent !important;
  background-repeat: no-repeat !important;
  border: none !important;
}

.buttonS {
  background-color: white !important;
  background-repeat: no-repeat !important;
  border: none !important;
}
</style>