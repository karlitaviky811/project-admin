<template>
  <v-container id="dashboard" fluid tag="section">
    
    <v-row v-show="qrs.length">
      <v-col cols="12" lg="4">
        <base-material-chart-card
          :data="emailsSubscriptionChart.data"
          :options="emailsSubscriptionChart.options"
          :responsive-options="emailsSubscriptionChart.responsiveOptions"
          color="#0088cc"
          hover-reveal
          type="Bar"
        >
          <template v-slot:reveal-actions>
            <v-tooltip bottom>
              <template v-slot:activator="{ attrs, on }">
                <v-btn v-bind="attrs" color="info" icon v-on="on">
                  <v-icon color="info"> mdi-refresh </v-icon>
                </v-btn>
              </template>

              <span>Refresh</span>
            </v-tooltip>

            <v-tooltip bottom>
              <template v-slot:activator="{ attrs, on }">
                <v-btn v-bind="attrs" light icon v-on="on">
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </template>

              <span>Change Date</span>
            </v-tooltip>
          </template>

          <h4 class="card-title font-weight-light mt-2 ml-2">
            Solicitudes de Cambio
          </h4>

          <p class="d-inline-flex font-weight-light ml-2 mt-1">
            En el año en curso (2023)
          </p>
        </base-material-chart-card>
      </v-col>

      <v-col cols="12" lg="4">
        <base-material-chart-card
          :data="activeRequestChartUser.data"
          :options="activeRequestChartUser.options"
          color="success"
          hover-reveal
          type="Line"
        >
          <template v-slot:reveal-actions>
            <v-tooltip bottom>
              <template v-slot:activator="{ attrs, on }">
                <v-btn v-bind="attrs" color="info" icon v-on="on">
                  <v-icon color="info"> mdi-refresh </v-icon>
                </v-btn>
              </template>

              <span>Refresh</span>
            </v-tooltip>

            <v-tooltip bottom>
              <template v-slot:activator="{ attrs, on }">
                <v-btn v-bind="attrs" light icon v-on="on">
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </template>

              <span>Change Date</span>
            </v-tooltip>
          </template>

          <h4 class="card-title font-weight-light mt-2 ml-2">
            Solicitudes Aceptadas
          </h4>

          <p class="d-inline-flex font-weight-light ml-2 mt-1">
            En el año en curso (2023)
          </p>
        </base-material-chart-card>
      </v-col>

      <v-col cols="12" lg="4">
        <base-material-chart-card
          :data="rejectedRequestChart.data"
          :options="rejectedRequestChart.options"
          hover-reveal
          color="info"
          type="Line"
        >
          <template v-slot:reveal-actions>
            <v-tooltip bottom>
              <template v-slot:activator="{ attrs, on }">
                <v-btn v-bind="attrs" color="info" icon v-on="on">
                  <v-icon color="info"> mdi-refresh </v-icon>
                </v-btn>
              </template>

              <span>Refresh</span>
            </v-tooltip>

            <v-tooltip bottom>
              <template v-slot:activator="{ attrs, on }">
                <v-btn v-bind="attrs" light icon v-on="on">
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </template>

              <span>Change Date</span>
            </v-tooltip>
          </template>

          <h3 class="card-title font-weight-light mt-2 ml-2">
            Solicitudes Rechazadas
          </h3>

          <p class="d-inline-flex font-weight-light ml-2 mt-1">
            En el año en curso (2023)
          </p>
        </base-material-chart-card>
      </v-col>

      <v-col cols="12" sm="6" lg="3">
        <base-material-stats-card
          color="info"
          icon="mdi-widgets"
          title="Proyectos"
          :value="paramsProject.length"
        />
      </v-col>

      <v-col cols="12" sm="6" lg="3">
        <base-material-stats-card
          color="primary"
          icon="mdi-poll"
          title="Quejas"
          :value="qrs[0].cont"
        />
      </v-col>

      <v-col cols="12" sm="6" lg="3">
        <base-material-stats-card
          color="success"
          icon="mdi-store"
          title="Reclamos"
          :value="qrs[1].cont"
        />
      </v-col>

      <v-col cols="12" sm="6" lg="3">
        <base-material-stats-card
          color="orange"
          icon="mdi-sofa"
          title="Sugerencias"
          :value="qrs[2].cont"
        >
        </base-material-stats-card>
      </v-col>

      <v-col cols="12" md="6">
        <base-material-card color="warning" class="px-5 py-3">
          <template v-slot:heading>
            <div class="text-h3 font-weight-light">
              Proyectos con solicitudes nuevas
            </div>
          </template>
          <v-card-text>
            <v-data-table :headers="headers" :items="chartsListPSCUSER" />
          </v-card-text>
        </base-material-card>
      </v-col>

      <v-col cols="12" md="6">
        <base-material-card class="px-5 py-3">
          <template v-slot:heading>
            <v-tabs
              v-model="tabs"
              background-color="transparent"
              slider-color="white"
            >
              <span
                class="subheading font-weight-light mx-3"
                style="align-self: center"
                >Solicitudes:</span
              >
              <v-tab class="mr-3">
                <v-icon class="mr-2"> mdi-bug </v-icon>
                Incidencias
              </v-tab>
              <v-tab class="mr-3">
                <v-icon class="mr-2"> mdi-code-tags </v-icon>
                Problemas
              </v-tab>
              <v-tab>
                <v-icon class="mr-2"> mdi-cloud </v-icon>
                Cambios
              </v-tab>
            </v-tabs>
          </template>

          <v-tabs-items v-model="tabs" class="transparent">
            <v-tab-item>
              <template>
                <v-data-table
                  :headers="headersReq"
                  :items="tasks[0]"
                  :items-per-page="5"
                ></v-data-table>
              </template>
            </v-tab-item>
            <v-tab-item>
              <template>
                <v-data-table
                  :headers="headersReq"
                  :items="tasks[1]"
                  :items-per-page="5"
                ></v-data-table>
              </template>
            </v-tab-item>
            <v-tab-item>
              <template>
                <v-data-table
                  :headers="headersReq"
                  :items="tasks[2]"
                  :items-per-page="5"
                ></v-data-table>
              </template>
            </v-tab-item>
          </v-tabs-items>
        </base-material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "DashboardUser",
  async mounted() {
    this.loading = true;
    const user = JSON.parse(localStorage.getItem("user"))._id;
    await this.$store.dispatch("GET_LIST_PROJECTS_STATE_CREATE_USER");
    await this.$store.dispatch("GET_LIST_REQUEST_MONTS_USER", user);
    await this.$store.dispatch("GET_LIST_REQUEST_MONTS_A_USER");
    await this.$store.dispatch("GET_LIST_REQUEST_MONTS_R_USER");
    await this.$store.dispatch("GET_REQUESTS_ALL_BY_TYPE_USER");
    await this.$store.dispatch("GET_LIST_QRS_USER", user);
    await this.$store.dispatch("GET_PROJECTS_ALL");
    await this.$store.dispatch("GET_REQUESTS_USER", user);
    this.loading = false;
  },
  data() {
    return {
      dailySalesChart: {
        data: {
          labels: ["M", "T", "W", "T", "F", "S", "S"],
          series: [[12, 17, 7, 17, 23, 18, 38]],
        },
        options: {
          lineSmooth: this.$chartist.Interpolation.cardinal({
            tension: 0,
          }),
          low: 0,
          high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
          },
        },
      },
      loading: false,
      activeRequestChartUser: {
        data: {
          labels: ["E", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
          series: [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
        },

        options: {
          axisX: {
            showGrid: false,
          },
          low: 0,
          high: 50,
          chartPadding: {
            top: 0,
            right: 5,
            bottom: 0,
            left: 0,
          },
        },
        responsiveOptions: [
          [
            "screen and (max-width: 640px)",
            {
              seriesBarDistance: 5,
              axisX: {
                labelInterpolationFnc: function (value) {
                  return value[0];
                },
              },
            },
          ],
        ],
      },
      rejectedRequestChart: {
        data: {
          labels: ["E", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
          series: [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
        },

        options: {
          axisX: {
            showGrid: false,
          },
          low: 0,
          high: 50,
          chartPadding: {
            top: 0,
            right: 5,
            bottom: 0,
            left: 0,
          },
        },
        responsiveOptions: [
          [
            "screen and (max-width: 640px)",
            {
              seriesBarDistance: 5,
              axisX: {
                labelInterpolationFnc: function (value) {
                  return value[0];
                },
              },
            },
          ],
        ],
      },
      qrs: [],
      dataCompletedTasksChart: {
        data: {
          labels: ["12am", "3pm", "6pm", "9pm", "12pm", "3am", "6am", "9am"],
          series: [[230, 750, 450, 300, 280, 240, 200, 190]],
        },
        options: {
          lineSmooth: this.$chartist.Interpolation.cardinal({
            tension: 0,
          }),
          low: 0,
          high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
          },
        },
      },
      paramsProject: [],
      emailsSubscriptionChart: {
        data: {
          labels: ["E", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
          series: [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
        },
        options: {
          axisX: {
            showGrid: false,
          },
          low: 0,
          high: 50,
          chartPadding: {
            top: 0,
            right: 5,
            bottom: 0,
            left: 0,
          },
        },
        responsiveOptions: [
          [
            "screen and (max-width: 640px)",
            {
              seriesBarDistance: 5,
              axisX: {
                labelInterpolationFnc: function (value) {
                  return value[0];
                },
              },
            },
          ],
        ],
      },
      headers: [
        {
          sortable: false,
          text: "Proyecto",
          value: "name",
        },
        {
          sortable: false,
          text: "Status",
          value: "status",
          align: "right",
        },
        {
          sortable: false,
          text: "Solicitudes",
          value: "cont",
          align: "right",
        },
      ],
      items: [
        {
          id: 1,
          name: "Dakota Rice",
          country: "Niger",
          city: "Oud-Tunrhout",
          salary: "$35,738",
        },
        {
          id: 2,
          name: "Minerva Hooper",
          country: "Curaçao",
          city: "Sinaai-Waas",
          salary: "$23,738",
        },
        {
          id: 3,
          name: "Sage Rodriguez",
          country: "Netherlands",
          city: "Overland Park",
          salary: "$56,142",
        },
        {
          id: 4,
          name: "Philip Chanley",
          country: "Korea, South",
          city: "Gloucester",
          salary: "$38,735",
        },
        {
          id: 5,
          name: "Doris Greene",
          country: "Malawi",
          city: "Feldkirchen in Kārnten",
          salary: "$63,542",
        },
      ],
      headersReq: [
        {
          sortable: false,
          text: "",
          value: "i",
        },
        {
          sortable: false,
          text: "Titulo",
          value: "title",
        },
        {
          sortable: false,
          text: "Fecha",
          value: "date",
          align: "right",
        },
        {
          sortable: false,
          text: "Proyecto",
          value: "project",
          align: "right",
        },
      ],
      tabs: 0,
      tasks: {
        0: [
          {
            text: 'Listado de noticias no es resposive - WEB FACYT"',
            value: true,
          },
          {
            text: "Redirección link de asignados via OPSU no esta disponible - WEB FACYT",
            value: false,
          },
        ],
        1: [
          {
            text: "Registro de estudiantes en la seccion de Calculo I - Entorno Virtual",
            value: true,
          },
          {
            text: "Diseño de header - Web Facyt",
            value: false,
          },
        ],
        2: [
          {
            text: "Cambio de formato en constancias - SICE FACYT",
            value: false,
          },
          {
            text: "Cambiar textos bienvenida - SICE FACYT",
            value: true,
          },
          {
            text: "Cambio de formato en reporte de notas - SICE FACYT",
            value: true,
          },
        ],
      },
      list: {
        0: false,
        1: false,
        2: false,
      },
    };
  },
  computed: {
    ...mapGetters(["chartsListRPMUSER"]),
    ...mapGetters(["chartsListRPMAUSER"]),
    ...mapGetters(["chartsListRPMR"]),
    ...mapGetters(["chartsListPSCUSER"]),
    ...mapGetters(["requestsU"]),
    ...mapGetters(["chartsListQRSByUser"]),
    ...mapGetters(["projectsList"]),
  },
  watch: {
    chartsListRPMUSER() {
      this.emailsSubscriptionChart.data.series = [
        this.chartsListRPMUSER.series,
      ];
    },
    chartsListRPMAUSER() {
      this.activeRequestChartUser.data.series = [
        this.chartsListRPMAUSER.series,
      ];
    },
    chartsListRPMR() {
      this.rejectedRequestChartUser.data.series = [
        this.chartsListRPMRUSER.series,
      ];
    },
    chartsListQRSByUser() {
      this.qrs = this.chartsListQRSByUser;
    },
    projectsList() {
      this.paramsProject = this.projectsList;
    },
    requestsU() {
      let data = [];
      let typeArr = [];
      let type = ["Incidencia", "Problema", "Cambio"];
      type.forEach((type) => {
        this.requestsU.forEach((item) => {
          if (item.type == type) {
            data.push(item);
          }
        });

        typeArr.push(data);
        data = [];
      });
      this.tasks = typeArr;
      //console.log("hey", this.requestListByType)
      //this.rtasks = this.requestListByType
      console.log("request------>", this.tasks);
    },
  },
  methods: {
    complete(index) {
      this.list[index] = !this.list[index];
    },

    loading(){
      
    }
  },
};
</script>
<style>
.body {
  background: rgba(120, 227, 236, 0.15) !important;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border-radius: 10px;
}
</style>
