<template>
  <v-container  id="regular-tables"
    fluid
    tag="section">
    <div class="py-3" />
 <v-alert
      border="top"
      colored-border
      type="info"
      elevation="2"
    >
     Proyectos activos actualmente
    </v-alert>
    <base-material-card
      color="primary"
      icon="mdi-bulletin-board"
      title="Proyectos"
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
                  <modal-project
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
      <v-data-table
        :headers="headers"
        :items="projectsList"
        :items-per-page="20"
        :search="search"
        :loading="data"
      >
        <template v-slot:item="row">
          <tr>
            <td>{{ row.item.title }}</td>
            <td>{{ row.item.description }}</td>
            <td>{{ convertDate(row.item.date) }}</td>
            <td>{{ row.item.department }}</td>
            <td>{{ row.item.tecnology }}</td>

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
          </tr>
        </template>
      </v-data-table>
    </base-material-card>
  </v-container>
</template>
<script>
import { mapGetters } from "vuex";
import moment from "moment";
import ModalProject from "../component/modals/ModalProject.vue";
export default {
  name: "RegularTables",
  components: {

    ModalProject,
  },
  created() {
    this.data = true;
    const user = JSON.parse(localStorage.getItem("user"))._id;
    this.$store.dispatch("GET_PROJECTS_ALL");
    this.data = false;
    this.role = JSON.parse(localStorage.getItem("user")).role;
    console.log("role", this.role);
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
        { text: "Título", value: "title" },
        { text: "Descripción", value: "description" },
        { text: "Fecha", value: "date", sortable: false },
        { text: "Departamento", value: "department", sortable: false },
        { text: "Tecnologia", value: "tecnology", sortable: false },
        { text: "", sortable: false, value: "actions" },
      ],
    };
  },
  computed: {
    ...mapGetters(["token"]),
    ...mapGetters(["projectsList"]),
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
      this.title = "Crear Proyecto";
      this.show = true;
      this.toggleModal(id);
      this.project = Object.assign({}, {});
      this.$store.commit("setRequestsProjectModal", {});
      this.type = "Create";
     
    },
    edit(item) {
      this.id = item._id;
      this.title = "Editar ";
      this.show = true;
      console.log("this.request", item.item);
      this.toggleModal(item._id);
      this.type = "Edit";
      this.request = Object.assign({}, item.item);
      console.log("this", this.request);
      this.$store.commit("setRequestsProjectModal", this.request);
      this.dialog = true;
    },
    detail(item) {
      this.type = "Detail";
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
    showModal: function (id) {
        console.log("id", this.activeModal == id)
      return this.activeModal == id;
    },
    openModal: function (req) {
      console.log("req", req);
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
    loadProjects() {
      this.data = true;
      const user = JSON.parse(localStorage.getItem("user"))._id;
      this.$store.dispatch("GET_PROJECTS_ALL");
      this.data = false;
      this.role = JSON.parse(localStorage.getItem("user")).role;
      console.log("role", this.role);
    },
      loadRequests() {
      //const user = JSON.parse(localStorage.getItem("user"))._id;
    this.$store.dispatch("GET_REQUESTS_ALL");

      this.role = JSON.parse(localStorage.getItem("user")).role;
    console.log("role", this.role);
      this.data = false;
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