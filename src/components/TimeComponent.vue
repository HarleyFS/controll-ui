<template>
  <p class="title">
    {{ props.hour }}:{{ props.minutes == 0 ? "00" : props.minutes }}
    <i class="fa-solid fa-circle-plus" @click="open()"></i>
  </p>
  <p class="subtitle" @click="open()">{{ props.patient }}</p>
</template>

<script lang="ts" setup>
const props = defineProps({
  hour: {
    type: Number,
    default: 0,
  },
  minutes: {
    type: Number,
    default: 0,
  },
  patient: {
    type: String,
    default: null,
  },
});

const emit = defineEmits<{
  (e: "openForm", hours: any): void;
}>();

function open(): void {
  emit("openForm", { hour: props.hour, minute: props.minutes });
}
</script>

<style scoped>
i {
  position: relative;
  margin-left: 0.25rem;
}

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
</style>
