<template>
  <div>
    <dashboard-admin v-if="role === 'ROLE_ADMIN'" />
    <dashboard-user v-else />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import DashboardAdmin from './DashboardAdmin.vue';
import DashboardUser from './DashboardUser.vue'
export default {
  name: "DashboardDashboard",
  components:{
     DashboardAdmin,
     DashboardUser

  },
  async created() {
    await this.$store.dispatch("GET_LIST_PROJECTS_STATE_CREATE");
    await this.$store.dispatch("GET_LIST_REQUEST_MONTS");
   
    this.role = JSON.parse(localStorage.getItem("user")).role;

    this.emailsSubscriptionChart.series = this.chartsListRPM;
  },
  data() {
    return {
      role: '',
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
      tabs: 0,
      tasks: {
        0: [
          {
            text: 'Sign contract for "What are conference organizers afraid of?"',
            value: true,
          },
          {
            text: "Lines From Great Russian Literature? Or E-mails From My Boss?",
            value: false,
          },
          {
            text: "Flooded: One year later, assessing what was lost and what was found when a ravaging rain swept through metro Detroit",
            value: false,
          },
          {
            text: "Create 4 Invisible User Experiences you Never Knew About",
            value: true,
          },
        ],
        1: [
          {
            text: "Flooded: One year later, assessing what was lost and what was found when a ravaging rain swept through metro Detroit",
            value: true,
          },
          {
            text: 'Sign contract for "What are conference organizers afraid of?"',
            value: false,
          },
        ],
        2: [
          {
            text: "Lines From Great Russian Literature? Or E-mails From My Boss?",
            value: false,
          },
          {
            text: "Flooded: One year later, assessing what was lost and what was found when a ravaging rain swept through metro Detroit",
            value: true,
          },
          {
            text: 'Sign contract for "What are conference organizers afraid of?"',
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
    ...mapGetters(["chartsListRPM"]),
    ...mapGetters(["chartsListPSC"]),
   
  },
  watch:{
     chartsListRPM(){
       this.emailsSubscriptionChart.data.series = [this.chartsListRPM.series] ;
    }
  },
  methods: {
    complete(index) {
      this.list[index] = !this.list[index];
    },
   
  },
};
</script>
