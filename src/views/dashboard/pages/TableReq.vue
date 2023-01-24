<template>
<v-container 
    fluid
    tag="section">
      <v-alert
      border="top"
      colored-border
      type="info"
      elevation="2"
    >
     Envia tus solicitudes de cambio a nuestros administradores
    </v-alert>
    <div class="py-3" />
  <base-material-card
    icon="mdi-file-check"
    title="Listado"
    class="px-5 py-3"
    color="primary"
  >
  
    <div v-if="this.$route.name === 'Solicitudes'">
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
                    @click.stop="create(true)"
                  >
                    <v-icon dark>mdi-plus</v-icon>
                  </v-btn>
                  <modal-request
                    :id="id"
                    :req="request"
                    :show="showModal(true)"
                    :type="type"
                    :title="title"
                    @close="toggleModalClose(true)"
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
            <td>{{ row.item.title }}</td>
            <td>{{ row.item.project }}</td>
            <td>{{ convertDate(row.item.date) }}</td>
            
            <td>{{ row.item.type }}</td>
            <td>{{ row.item.status }}</td>
            <td width="200">{{ row.item.description }}</td>

            <td v-show="true">
              <v-tooltip bottom>
                <template v-slot:activator="{ on: tooltip }">
                  <v-btn
                    v-on="{ ...tooltip }"
                    fab
                    small
                    v-show="true"
                    class="mx-2"
                    color="success"
                    @click.stop="edit(row)"
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
                    fab
                    small
                    v-show="true"
                    class="mx-2"
                    color="white"
                    @click.stop="detail(row)"
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
  </base-material-card>
</v-container>

</template>

<script>
import ModalRequest from "../component/modals/ModalRequest.vue";
import { mapGetters } from "vuex";
import moment from "moment";
export default {
  name: "TableReq",
  components: {
    ModalRequest,
  },
  created() {
    this.data = true;
    const user = JSON.parse(localStorage.getItem("user"))._id;
    this.$store.dispatch("GET_REQUESTS_USER", user);
    this.data = false;
    this.role = JSON.parse(localStorage.getItem("user")).role;
    console.log("role", this.role);
  },
  beforeRouteEnter(to, from, next) {
    this.$store.dispatch("GET_REQUESTS_USER", user);
  },
  data() {
    return {
      search: "",
      isModalVisible: false,
      activeModal: 0,
      expanded: [],
      title: "Test",
      data: false,
      role: "",
      id: "",
      singleExpand: false,
      dialog: false,
      type: false,
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
    showModal: function (id) {
      return this.activeModal == id;
    },
    openModal: function (req) {
      this.request = Object.assign({}, req);
      this.dialog = true;
    },
    toggleModalClose: async function (id) {
      if (this.activeModal !== 0) {
        console.log("aqui caaaayo");
        this.activeModal = 0;
        return false;
      }

      this.activeModal = id;
    },
    create(id) {
      this.title = "Crear Solicitud";
      this.toggleModal(id);
      this.request = Object.assign({}, {});
      this.$store.commit("setRequestsUserModal", {});
      this.type = 'Create';
    },
    edit(item) {
      this.id = item._id;
      this.title = "Editar ";
      this.show = true;
      console.log("this.request", item.item);
      this.toggleModal(item._id);
      this.type = 'Edit';
      this.request = Object.assign({}, item.item);
      console.log("this", this.request);
      this.$store.commit("setRequestsUserModal", this.request);
      this.dialog = true;
    },
    detail(item) {
      this.type = 'Detail';
      this.title = "Detalle";
      this.request = Object.assign({}, item.item);
      console.log("item", item);
      this.$store.commit("setRequestsUserModal", this.request);
      this.toggleModal(item._id);
    },
    toggleModal: async function (id) {
      this.activeModal = !this.activeModal;
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
      this.data = true;
      const user = JSON.parse(localStorage.getItem("user"))._id;
      this.$store.dispatch("GET_REQUESTS_USER", user);
      this.data = false;
      this.role = JSON.parse(localStorage.getItem("user")).role;
      console.log("role", this.role);
      this.data = false;
    },
    clickColumn(slotData) {
      console.log("say hi");
    },
    activeDetail() {
      this.$router.push({
        name: "Detail",
        params: {},
      });
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