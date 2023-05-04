<template>
  <div class="modal" :class="{ 'is-active': show }" v-if="show">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head modal-color">
        <slot name="header"></slot>
      </header>
      <section class="modal-card-body">
        <slot name="body"></slot>
      </section>
      <footer class="modal-card-foot">
        <slot name="footer"></slot>
      </footer>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ModalComponent",

  props: {
    show: {
      type: Boolean,
      required: true,
    },
  },
});
</script>

<style scoped>
.modal-card {
  width: 900px;
}

.modal-card-body {
  overflow: visible;
}

.modal-color,
.button-person {
  background: var(--primary);
}
.modal-color p,
.button-person {
  margin-bottom: 0rem;
  color: var(--light);
}

.modal-background {
  background-color: rgb(197 230 236 / 80%);
}

@media (max-width: 480px) {
  .modal-card {
    width: 300px;
    margin-left: 78px;
  }
  .modal {
    position: absolute;
  }
}
</style>
