<template>
  <v-container id="dashboard" fluid tag="section" >
    <v-row >
      <v-col cols="12" lg="4">
        <base-material-chart-card :data="emailsSubscriptionChart.data" :options="emailsSubscriptionChart.options"
          :responsive-options="emailsSubscriptionChart.responsiveOptions" color="#0088cc" hover-reveal type="Bar">
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

          <h4 class="card-title font-weight-light mt-2 ml-2">Solicitudes de Cambio</h4>

          <p class="d-inline-flex font-weight-light ml-2 mt-1">
            En el año en curso (2023)
          </p>

        </base-material-chart-card>
      </v-col>

      <v-col cols="12" lg="4">
        <base-material-chart-card :data="activeRequestChart.data" :options="activeRequestChart.options" color="success"
          hover-reveal type="Line">
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

          <h4 class="card-title font-weight-light mt-2 ml-2">Solicitudes Aceptadas</h4>

          <p class="d-inline-flex font-weight-light ml-2 mt-1">
            En el año en curso (2023)
          </p>
        </base-material-chart-card>
      </v-col>

      <v-col cols="12" lg="4">
        <base-material-chart-card :data="rejectedRequestChart.data" :options="rejectedRequestChart.options"
          hover-reveal color="info" type="Line">
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
        <base-material-stats-card color="info" icon="mdi-widgets" title="Proyectos" :value="paramsProject.length" />

      </v-col>

      <v-col cols="12" sm="6" lg="3" v-if="qrs.length">
        <base-material-stats-card color="primary" icon="mdi-poll" title="Quejas" :value="qrs[0]?.cont" />
      </v-col>

      <v-col cols="12" sm="6" lg="3"  v-if="qrs.length">
        <base-material-stats-card color="success" icon="mdi-store" title="Reclamos"  :value="qrs[1]?.cont" />
      </v-col>

      <v-col cols="12" sm="6" lg="3"  v-if="qrs.length">
        <base-material-stats-card color="orange" icon="mdi-sofa" title="Sugerencias"  :value="qrs[2]?.cont">
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
            <v-data-table :headers="headers" :items="chartsListPSC" />
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
                  </template> </v-tab-item>
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

     <v-row>

       <base-material-card color="primary" class="px-5 py-3">
          <template v-slot:heading>
            <div class="text-h3 font-weight-light">
             Proyectos con QRS
            </div>
          </template>
          <v-card-text>
   <v-data-table
    :headers="headersQRS"
    :items="chartsQrsProjectR"
    item-key="id"
    class="elevation-1"
    show-expand
    :expanded.sync="expanded" 
    @click:row="expandRow"
  >
    <template v-slot:expanded-item="{ headers, item }">
      <td :colspan="headers.length">
        <v-data-table
          :headers="replyHeaders"
          :items="item.info"
          item-key="item._id"
          hide-default-footer
        ></v-data-table>
      </td>
    </template>
  </v-data-table>

  <template> 
     </template>

          </v-card-text>
        </base-material-card>
      </v-col>

        <v-col cols="12" lg="6">
        <base-material-chart-card :data="qrsAllRequestChart.data" :options="qrsAllRequestChart.options"
          hover-reveal color="info" type="Bar">
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
   </v-row>

  </v-container>
  
</template>

<script>

import { mapGetters } from "vuex";
export default {
  name: "DashboardAdmin",
  async created() {
    
    await this.$store.dispatch("GET_LIST_PROJECTS_STATE_CREATE");
    await this.$store.dispatch("GET_LIST_REQUEST_MONTS");
    await this.$store.dispatch("GET_LIST_REQUEST_MONTS_A");
    await this.$store.dispatch("GET_LIST_REQUEST_MONTS_R");
    await this.$store.dispatch("GET_REQUESTS_ALL_BY_TYPE");
    await this.$store.dispatch("GET_LIST_QRS");
    await  this.$store.dispatch("GET_PROJECTS_ALL");
    await this.$store.dispatch("GET_LIST_QRS_PROJECTR")
    await this.$store.dispatch("GET_LIST_QRS_ALL")

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
      emailsSubscriptionChart: {
        data: {
          labels: [
            "E",
            "F",
            "M",
            "A",
            "M",
            "J",
            "J",
            "A",
            "S",
            "O",
            "N",
            "D",
          ],
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
      activeRequestChart: {
        data: {
          labels: [
            "E",
            "F",
            "M",
            "A",
            "M",
            "J",
            "J",
            "A",
            "S",
            "O",
            "N",
            "D",
          ],
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
      rejectedRequestChart:  {
        data: {
          labels: [
            "E",
            "F",
            "M",
            "A",
            "M",
            "J",
            "J",
            "A",
            "S",
            "O",
            "N",
            "D",
          ],
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
      qrsAllRequestChart: {
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
      items:[
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
      tabs:  0,
      tasks: {
      },
      list: {
        0: false,
        1: false,
        2: false,
      },
      paramsProject: [],
      qrs: [],
      requestByType: {},
      loading : false,
      headersReq:[
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
       headersQRS: [
        {
          sortable: false,
          text: "Proyecto",
          value: "name",
        },
        {
          sortable: false,
          text: "Tipo",
          value: "type",
          align: "right",
        },
        {
          sortable: false,
          text: "Solicitudes",
          value: "number",
          align: "right",
        },
      ],
      replyHeaders: [
        {
          sortable: false,
          text: "Título",
          value: "title",
        },
        {
          sortable: false,
          text: "Description",
          value: "description"
        },
        {
          sortable: false,
          text: "Fecha",
          value: "date",
          align: "right",
        },
        {
          sortable: false,
          text: "Estatus",
          value: "status",
          align: "right",
        },
      ],
    };
  },
  computed: {
    ...mapGetters(["chartsListRPM"]),
    ...mapGetters(["chartsListPSC"]),
    ...mapGetters(["chartsListRPMA"]),
    ...mapGetters(["chartsListRPMR"]),
    ...mapGetters(["requestListByType"]),
    ...mapGetters(["chartsListQRSUsers"]),
    ...mapGetters(["projectsList"]),
    ...mapGetters(["chartsQrsProjectR"]),
    ...mapGetters(["chartsQRSAll"])
  },
  watch: {
    chartsListRPM() {
      this.emailsSubscriptionChart.data.series = [this.chartsListRPM.series];
    },

    chartsListRPMA() {
      this.activeRequestChart.data.series = [this.chartsListRPMA.series];
    },
    chartsListRPMR() {
      this.rejectedRequestChart.data.series = [this.chartsListRPMR.series];
    },
    chartsListQRSUsers(){
      this.qrs =  this.chartsListQRSUsers
    },
     chartsQRSAll(){
      console.log("la data----------",   this.chartsQRSAll)
      this.qrsAllRequestChart.data.series = [
        this.chartsQRSAll.data.series,
      ];
    },
    requestListByType(){
      let data = []
      let typeArr = []
      let type = ['Incidencia', 'Problema', 'Cambio']
      type.forEach(type=>{
        this.requestListByType.forEach(item=>{
        if(item.type == type){
          data.push(item)
        }
      })

      typeArr.push(data)
      data = []
      })
     this.tasks = typeArr
      //console.log("hey", this.requestListByType)
      //this.rtasks = this.requestListByType
      console.log("request",  this.tasks)
    },
      projectsList(){
      this.paramsProject = this.projectsList
    },
  },
  methods: {
    complete(index) {
      this.list[index] = !this.list[index];
    },

  },
};
</script>
