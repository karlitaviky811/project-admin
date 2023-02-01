<template>
 
  <div>
    <modal :show="showDetail">
         <v-tabs centered>
      <v-tabs-slider/>
      <v-tab>Tab1</v-tab>
      <v-tab>Tab2</v-tab>
      <v-tab>Tab3</v-tab>

      <v-tab-item>
       <template>
        <v-form v-model="valid">
          <h3 class="font-weight-medium outline text-left">{{ title }}</h3>
          <v-container>
           <p>Modalito</p>
          </v-container>
        </v-form>
      </template>
      </v-tab-item>
      <v-tab-item>
        <MyView2 />
      </v-tab-item>
      <v-tab-item>
        <MyView3 />
      </v-tab-item>
    </v-tabs>
     
      </modal>
 
  </div>
</template>

<script>
import Modal from "./Modal";
export default {
  props: ["showDetail", "title", "req", "id"],
  components: { Modal },
  data: () => ({
    valid: false,
    firstname: "",
    request: {},
    lastname: "",
  }),
  mounted() {
    this.request = Object.assign({}, this.req);
  },
  methods: {
    close: function () {
      this.$emit("close");
    },
    save() {
      if (this.id === 0) {
        this.$store.dispatch("SAVE_REQUESTS_USER", this.request);
      } else {
        this.$store.dispatch("UPDATE_REQUESTS_USER", this.request);
       
      }

       this.close();
        this.$emit("reqCreated");
    },
    createReq() {},
  },
};
</script>

<style scoped>
.col-custom {
  padding-left: 10px;
  padding-right: 10px;
}
</style>
