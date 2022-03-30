<template>
  <v-card class="fill-height">
    <div v-if="this.$route.name === 'Solicitudes' ">
    <v-card-title class="d-flex justify-space-between">
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
                  @click.stop="toggleModal(true)"
                >
                  <v-icon dark>mdi-plus</v-icon>
                </v-btn>
                <modal-request
                  :id="0"
                  :req="request"
                  :show="showModal(true)"
                  title="Crear solicitud"
                  @close="toggleModal(true)"
                  @reqCreated="loadRequests"
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
    </v-card-title>
    
    <v-data-table
      :headers="headers"
      :items="requestsU"
      :items-per-page="20"
      :search="search"
      :loading="data"
    >
      <template v-slot:item="row">
        <tr>
          <td>{{ row.item.title }}
              
          </td>
          <td>{{ convertDate(row.item.date) }}</td>
          <td>{{ row.item.project }}</td>
          <td>{{ row.item.type }}</td>
          <td>{{ row.item.status }}</td>
          <td width="200">{{ row.item.description }}</td>

          <td v-show="true">
            <modal-request
              :id="row.item._id"
              :req="row.item"
              title="Editar solicitud"
              :show="showModal(row.item._id)"
              @close="toggleModal(row.item._id)"
              @reqCreated="loadRequests"
            />
            <v-tooltip bottom>
              <template v-slot:activator="{ on: tooltip }">
                <v-btn
                  v-on="{ ...tooltip }"
                  class="mx-2"
                  fab
                  dark
                  small
                  color="primary"
                  @click.stop="toggleModal(row.item._id)"
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
                  @click="openModal(1)"
                >
                  <v-icon dark>mdi-delete</v-icon>
                </v-btn>
              </template>
              <span>Eliminar</span>
            </v-tooltip>
          </td>
           <td v-show="true">
              
            <v-tooltip bottom>
              <template v-slot:activator="{ on: tooltip }">
               
                <v-btn
                  v-on="{ ...tooltip }"
                  class="mx-2"
                  fab
                  small
                  color="white"
                  @click="activeDetail()"
                >
                  <v-icon dark>mdi-chevron-right </v-icon>
                </v-btn>
              </template>
              <span>Detalle</span>
            </v-tooltip>
          </td>
        </tr>
      </template>
    </v-data-table>
    </div>
    <router-view></router-view>
  </v-card>
</template>

<script>
import ModalRequest from "../component/modals/ModalRequest.vue";
import { mapGetters } from "vuex";
import moment from "moment";
export default {
  name: 'TableReq',
  components: {
    ModalRequest
  },
  mounted() {
      this.data = true;
        const user = JSON.parse(localStorage.getItem("user"))._id;
     this.$store.dispatch("GET_REQUESTS_USER", user);
     this.data = false
  },
  data() {
    return {
      search: "",
      isModalVisible: false,
      activeModal: 0,
      expanded: [],
      data: false,
      singleExpand: false,
      dialog: false,
      props: {
        expanded: false,
      },
      request: {},
      headers: [
        { text: "Título", value: "title" },
        { text: "Proyecto", value: "project" },
        { text: "Fecha", value: "date", sortable: false },
        { text: "Tipo", value: "type", sortable: false },
        { text: "Estatus", value: "status", sortable: false },
        { text: "Descripción", value: "description", sortable: false },
        { text: "", sortable: false, value: "actions" },
        { text: "", sortable: false, value: "more" },
      ],
    };
  },
  computed: {
    ...mapGetters(["token"]),
    ...mapGetters(["requestsU"]),
  },
  methods: {
    formatNumberES(n, d = 0) {
      n = new Intl.NumberFormat("es-ES").format(parseFloat(n).toFixed(d));

      if (d > 0) {
        // Obtenemos la cantidad de decimales que tiene el numero

        const decimals =
          n.indexOf(",") > -1 ? n.length - 1 - n.indexOf(",") : 0;

        // añadimos los ceros necesios al numero

        n =
          decimals == 0
            ? n + "," + "0".repeat(d)
            : n + "0".repeat(d - decimals);
      }

      return n;
    },
    save() {},
    edit(id) {
      console.log("here", id.calories);
      let aux = "15740050";

      console.log("aqui", this.formatNumberES(aux, 2));

      console.log("hey");
    },

    deleteI(id) {
      console.log("en el eliminar");
    },
    showModal: function (id) {
    
      return this.activeModal == id;
    },
     showModalDetail: function (id) {
     
      return this.activeModal == id;
    },
    openModal: function (req) {
  
      this.request = Object.assign({}, req);
      this.dialog = true;
    },
       toggleModalDetail: async function (id) {
      if (this.activeModal !== 0) {
        console.log("aqui caaaayo");
        this.activeModal = 0;
        return false;
      }
 
      this.activeModal = id;

    },
    toggleModal: async function (id) {
      if (this.activeModal !== 0) {
        console.log("aqui caaaayo");
        this.activeModal = 0;
        return false;
      }
  
      this.activeModal = id;

    },
    closeModal() {
      this.isModalVisible = false;
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
    open() {
     
      this.$refs.createDialog.firstname = "";
      this.$refs.createDialog.open();
    },
    openEdit(item) {
      this.$refs.createDialog.firstname = item.calories;
      this.$refs.createDialog.open();
    },
    test() {
   
      this.$store.dispatch("GET_REQUESTS_USER", user);
    },
     loadRequests() {
    
   
    // 
        this.data = false;
    },
    clickColumn(slotData) {
     console.log("say hi")
    },
    activeDetail(){
        this.$router.push({
          name: "Detail",
          params: {
           
          }
        });
    }
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