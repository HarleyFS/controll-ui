<template>
  <div class="column" :class="inputSize">
    <div class="field">
      <label class="label">{{ nameLabel }}</label>
      <div class="control">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "CardInputComponent",

  props: {
    nameLabel: {
      type: String,
      default: "",
    },

    inputSize: {
      type: String,
      default: "",
    },
  },
});
</script>
