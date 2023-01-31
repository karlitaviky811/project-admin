<template>
  <v-container
    id="regular-tables"
    fluid
    tag="section"
  >
    <div class="py-3" />
     
    <base-material-card
      color="success"
      icon="mdi-clipboard-plus"
      title="Table on Dark Background"
      class="px-5 py-3"
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
                
                </template>
                <span>Nuevo</span>
              </v-tooltip>
            </v-col>
          </v-row>
     </v-container>
      <v-simple-table>
        <thead>
          <tr>
            <th class="primary--text">
              ID
            </th>
            <th class="primary--text">
              Nombre
            </th>
            <th class="primary--text">
              Tecnologias
            </th>
            <th class="primary--text">
              Departamento
            </th>
            <th class="primary--text">
              Responsable
            </th>
            <th class="text-right primary--text">
              Solicitudes
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Dakota Rice</td>
            <td>Niger</td>
            <td>Oud-Turnhout</td>
            <td>Oud-Turnhout</td>
            <td class="text-right">
              $36,738
            </td>
          </tr>

          <tr>
            <td>2</td>
            <td>Minverva Hooper</td>
            <td>Curaçao</td>
            <td>Sinaas-Waas</td>
            <td>Sinaas-Waas</td>
            <td class="text-right">
              $23,789
            </td>
          </tr>

          <tr>
            <td>3</td>
            <td>Sage Rodriguez</td>
            <td>Netherlands</td>
            <td>Baileux</td>
              <td>Baileux</td>
            <td class="text-right">
              $56,142
            </td>
          </tr>

          <tr>
            <td>4</td>
            <td>Philip Chaney</td>
            <td>Korea, South</td>
            <td>Overland Park</td>
            <td>Overland Park</td>
            <td class="text-right">
              $38,735
            </td>
          </tr>

          <tr>
            <td>5</td>
            <td>Doris Greene</td>
            <td>Malawi</td>
            <td>Feldkirchen in Kärnten</td>
            <td>Feldkirchen in Kärnten</td>
            <td class="text-right">
              $63,542
            </td>
          </tr>

          <tr>
            <td>6</td>
            <td>Mason Porter</td>
            <td>Chile</td>
            <td>Gloucester</td>
            <td>Gloucester</td>
            <td class="text-right">
              $78,615
            </td>
          </tr>
        </tbody>
      </v-simple-table>
    </base-material-card>
  </v-container>
</template>
<script>
import ModalRequest from "../component/modals/ModalRequest.vue";
import { mapGetters } from "vuex";
import moment from "moment";
export default {
  name: "RegularTables",
  components: {
    ModalRequest,
  },
  created() {
    this.data = true;
    const user = JSON.parse(localStorage.getItem("user"))._id;
    this.$store.dispatch("GET_PROJECTS", user);
    this.data = false;
    this.role = JSON.parse(localStorage.getItem("user")).role;
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