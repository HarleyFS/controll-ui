<template>
  <p class="title">
    {{ props.hour }}:{{ props.minutes == 0 ? "00" : props.minutes }}
    <i
      v-if="!props.schedule?.fullName"
      class="fa-solid fa-circle-plus"
      @click="open()"
    ></i>
    <i v-else @click="open()"></i>
  </p>
  <p class="subtitle" :style="getColor()" @click="open()">
    {{
      props.schedule != null && props.schedule.patient != null
        ? props.schedule.patient.name + " " + props.schedule.patient.lastName
        : props.schedule?.fullName
    }}
  </p>
</template>

<script lang="ts" setup>
import { Status } from "@/enums/StatusEnum";
import type ISchedule from "@/interfaces/schedule/IScheduleRegister";
import type { PropType, StyleValue } from "vue";

const props = defineProps({
  hour: {
    type: Number,
    default: 0,
  },
  minutes: {
    type: Number,
    default: 0,
  },
  schedule: {
    type: Object as PropType<ISchedule>,
    default: null,
  },
});

const emit = defineEmits<{
  (e: "openForm", schedule: any): void;
}>();

function open(): void {
  emit("openForm", {
    hour: props.hour,
    minute: props.minutes,
    schedule: props.schedule,
  });
}
function getColor(): StyleValue {
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  if (props.schedule != null) {
    if (props.schedule.statusSchedule == Status.DONE) {
      return `background-color: #1ed5a4`;
    } else if (props.schedule.statusSchedule == Status.CANCELED) {
      return `background-color: #f14668`;
    } else {
      if (
        props.schedule.scheduleDateTime != null &&
        new Date(props.schedule.scheduleDateTime) > currentDate
      ) {
        return `background-color: #2daab8`;
      }
    }
  }
  return `background-color: #a9a4a4`;
}
</script>

<style scoped>
i {
  position: relative;
  margin-left: 0.25rem;
  cursor: pointer;
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
  margin-right: 8px;
  cursor: pointer;
  padding: 1px 4px 1px 4px;
}
</style>
