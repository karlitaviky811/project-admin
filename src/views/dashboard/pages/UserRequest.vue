<template>
  <div>
    <table-req v-if="role === 'ROLE_USER'" />
    <table-req-admin v-else/>
  </div>
</template>

<script>
import TableReq from "./TableReq.vue";
import TableReqAdmin from "./TableReqAdmin.vue";
export default {
  components: {
    TableReq,
    TableReqAdmin,
  },
  mounted() {
    this.role = JSON.parse(localStorage.getItem("user")).role;
  },
  data() {
    return {
      search: "",
      isModalVisible: false,
      activeModal: 0,
      expanded: [],
      singleExpand: false,
      dialog: false,
      role: '',
      props: {
        expanded: false,
      },
      request: {},
      headers: [],
    };
  },
  computed: {},
  methods: {},
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