<template>
  <transition name="modal">
    <div class="modal-mask" @click="close" v-show="show">
      <div class="modal-container" @click.stop="close">
        <slot></slot>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: ["show"],

  mounted: function() {
    document.addEventListener("keydown", e => {
      if (this.show && e.keyCode == 27) {
        this.close();
      }
    });
  },
  methods: {
    close: function() {
      this.$emit("close");
    }
  }
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.modal-mask {
  display: grid;
  place-items: center;
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  transition: opacity 0.3s ease;
  overflow-x: auto;
}

.modal-container {
  width: 800px;
  height: auto !important;
  overflow: auto !important;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

.modal-body {
  margin: 20px 0;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */
.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

@media only screen and (max-width: 800px) {
  .modal-container {
    width: 100%;
    height: 100%;
  }
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
