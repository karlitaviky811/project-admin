<template>
 <table-req />
</template>

<script>

import TableReq from './TableReq.vue'
import { mapGetters } from "vuex";
import moment from "moment";
export default {
  components: {
  TableReq
  },
  mounted() {
    
  },
  data() {
    return {
      search: "",
      isModalVisible: false,
      activeModal: 0,
      expanded: [],
      singleExpand: false,
      dialog: false,
      props: {
        expanded: false,
      },
      request: {},
      headers: [
      
      ],
    };
  },
  computed: {
    
  },
  methods: {
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