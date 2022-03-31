<template>
  <v-card class="fill-height">
    <div v-if="this.$route.name === 'Solicitudes'">
      <v-card-title class="d-flex justify-space-between">
        <v-container class="d-flex flex-column align-end">
          <v-row>
            <v-col v-show="true">
              <v-tooltip left>
                <template v-slot:activator="{ on: tooltip }">
                  <v-btn
                    v-on="{ ...tooltip }"
                    fab
                    small
                    v-show="false"
                    color="success"
                    @click.stop="detail(true)"
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
        :items="requestList"
        :items-per-page="20"
        :search="search"
        :loading="data"
      >
        <template v-slot:item="row">
          <tr>
            <td>{{ row.item.title }}</td>
            <td>{{ convertDate(row.item.date) }}</td>
            <td>{{ row.item.project }}</td>
            <td>{{ row.item.type }}</td>
            <td>{{ row.item.status }}</td>
            <td width="200">{{ row.item.description }}</td>
            <td width="200">{{ row.item.user.name }}</td>
           
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
  </v-card>
</template>

<script>
import ModalRequest from "../component/modals/ModalRequest.vue";
import { mapGetters } from "vuex";
import moment from "moment";
export default {
  name: "TableReqAdmin",
  components: {
    ModalRequest,
  },
  created() {
 
    const user = JSON.parse(localStorage.getItem("user"))._id;
    this.$store.dispatch("GET_REQUESTS_ALL");

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
        { text: "Usuario", value: "user", sortable: false },
        { text: "", sortable: false, value: "more" },
      ],
    };
  },
  computed: {
    ...mapGetters(["token"]),
    ...mapGetters(["requestsU"]),
    ...mapGetters(["requestList"])
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
      this.title = "Prueba Crear Karlita";
      this.toggleModal(id);
      this.request = Object.assign({}, {});
       this.$store.commit("setRequestsUserModal", {});
      this.type = false;
    },
    edit(item) {
      this.id = item._id;
      this.title = "Prueba Editar Karlita";
      this.show = true;
      console.log("this.request", item.item);
      this.toggleModal(item._id);
      this.type = false;
      this.request = Object.assign({}, item.item);
      this.$store.commit("setRequestsUserModal", this.request);
      this.dialog = true;
    },
    detail(item) {
       this.type = true;
      this.title = "Prueba Detalle Karlita";
      this.request = Object.assign({}, item.item);
      console.log("item", item)
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
      //
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