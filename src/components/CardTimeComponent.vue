<template>
  <div
    class="tile is-ancestor card-ancestor"
    :class="isCurrentHour ? 'shadow' : ''"
  >
    <div class="tile is-parent">
      <article
        class="tile is-child box card-child"
        :class="isCurrentHour ? 'shadow' : ''"
      >
        <p class="title">{{ hour }}:00</p>
        <p class="subtitle">Harley Ferreira</p>
      </article>

      <article
        class="tile is-child box card-child"
        :class="isCurrentHour ? 'shadow' : ''"
      >
        <p class="title">{{ hour }}:10</p>
        <p class="subtitle">Harley Ferreira</p>
      </article>

      <article
        class="tile is-child box card-child"
        :class="isCurrentHour ? 'shadow' : ''"
      >
        <p class="title">{{ hour }}:20</p>
        <p class="subtitle">Harley Ferreira</p>
      </article>

      <article
        class="tile is-child box card-child"
        :class="isCurrentHour ? 'shadow' : ''"
      >
        <p class="title">{{ hour }}:30</p>
        <p class="subtitle">Harley Ferreira</p>
      </article>

      <article
        class="tile is-child box card-child"
        :class="isCurrentHour ? 'shadow' : ''"
      >
        <p class="title">{{ hour }}:40</p>
        <p class="subtitle">Harley Ferreira</p>
      </article>

      <article
        class="tile is-child box card-child"
        :class="isCurrentHour ? 'shadow' : ''"
      >
        <p class="title">{{ hour }}:50</p>
        <p class="subtitle">Harley Ferreira</p>
      </article>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  props: {
    hour: {
      type: Number,
      default: 1,
    },
  },
  setup(props) {
    const currentHour = ref(new Date().getHours());
    const isCurrentHour = currentHour.value == props.hour;
    return {
      props,
      isCurrentHour,
    };
  },
});
</script>

<style>
p.title {
  font-size: large;
}

p.subtitle {
  width: fit-content;
  font-size: small;
  background-color: var(--primary);
  color: var(--light) !important;
  border-radius: 8px;
  padding: 1px 3px 1px 3px;
  margin-right: 8px;
}

.card-ancestor {
  margin: 0px 0px 0 0 !important;
  background-color: var(--light);
  border-block: 1px solid #e4e4e4;
}

.card-ancestor.shadow {
  background-color: #b0f7f3eb;
}

.card-child {
  padding: 0;
  box-shadow: none;
  background-color: var(--light);
}

.card-child.shadow {
  background-color: #b0f7f3eb;
}
</style>
