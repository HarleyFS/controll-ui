<template>
  <div class="tile is-ancestor">
    <div class="tile is-vertical is-8">
      <div class="card-agenda tile is-parent">
        <article class="tile is-child">
          <div class="header">
            <p id="agenda" class="title">Agenda</p>
          </div>
          <div class="body-agenda">
            <span v-for="(hour, index) of hours" :key="index">
              <div
                class="tile is-ancestor card-ancestor"
                :class="currentHour == hour ? 'shadow' : ''"
              >
                <div class="tile is-parent">
                  <article
                    v-for="(minute, index) in minutes"
                    :key="index"
                    class="tile is-child box card-child"
                    :class="currentHour == hour ? 'shadow' : ''">
                    <Time
                      :patient="getName(hour, minute)"
                      @openForm="renderModal"
                      :hour="hour"
                      :minutes="minute"
                    ></Time>
                  </article>
                </div>
              </div>
            </span>
          </div>
        </article>
      </div>
    </div>

    <div class="tile is-parent is-vertical">
      <article class="tile is-child card-calender">
        <p id="calendar" class="title">Calendário</p>
        <DatePicker v-model="calendarDate" style="width: 100%" />
      </article>

      <article class="tile is-child box">
        <div class="level">
          <div class="level-left">
            <i class="fas fa-angle-left"></i>
          </div>

          <div class="level-right">
            <i class="fas fa-angle-right"></i>
          </div>
        </div>

        <div class="media is-6">
          <figure class="media-left image is-128x128">
            <img class="is-rounded" src="../assets/doctor.jpg" />
          </figure>

          <div class="media-content" style="margin-top: 1rem">
            <div class="content">
              <p>
                <strong>Dra. Mariana Barbosa</strong>
                <br />
                Clínico Geral
              </p>
            </div>
          </div>
        </div>

        <div class="level" style="margin-top: 2rem">
          <div class="level-item has-text-centered">
            <div class="box">
              <p class="heading">Consultas Agendadas</p>
              <p class="title">300</p>
            </div>
          </div>

          <div class="level-item has-text-centered">
            <div class="box">
              <p class="heading">Horários disponíveis</p>
              <p class="title">134</p>
            </div>
          </div>
        </div>
      </article>
    </div>
  </div>
  <AgendaForm :scheduleDate="calendarDate" :render="render" @closeForm="renderModal" />
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { useScheduleStore } from "@/stores/schedule-store";
import { DatePicker } from "v-calendar";
import AgendaForm from "./agenda/AgendaForm.vue";
import Time from "@/components/TimeComponent.vue";
import ScheduleService from "@/services/ScheduleService";


const scheduleStore = useScheduleStore();
const scheduleList = ref<Array<any>>([]);

onMounted(async () => {
  await scheduleStore.getScheduleList();
  scheduleList.value = scheduleStore.scheduleList;
});

ScheduleService.getScheduleList().then((response) => {
  scheduleList.value = response.data.content;
});

const currentHour = ref(new Date().getHours());
const hours = ref(Array.from({ length: 17 }, (_, i) => i + 7));
const minutes = ref(Array.from({ length: 6 }, (_, i) => (i *= 10)));

const calendarDate = ref(new Date());
const boardDate = ref(new Date());

function getName(hour: number, minute: number) {
  if (hour != null && minute != null) {
    var name = null;
    scheduleList.value.forEach((element) => {
      boardDate.value.setHours(hour, minute, 0, 0);
      const scheduleDate = new Date(element.scheduleDate);

      if (boardDate.value.getTime() == scheduleDate.getTime()) {
        name = element.fullName;
      }
    });
  }

  return name;
}


const render = ref(false);
const renderModal = (hours: any) => {
  if (hours != null) {
    calendarDate.value.setHours(hours.hour, hours.minute, 0, 0);
  }
  render.value = !render.value;
};
</script>

<style scoped>
.is-ancestor {
  padding: 0.75rem;
}

/* -------------------------- AGENDA -------------------------- */
.card-agenda {
  margin-top: 0 !important;
}

.card-agenda .header {
  background-color: var(--primary);
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}

.card-agenda #agenda {
  color: var(--light);
  font-size: xx-large;
  padding: 0.5rem 0 1rem 1rem;
}

.card-agenda #date {
  color: var(--light);
  font-size: large;
  border: 2px solid white;
  margin: 0 0 0 1rem;
}

.body-agenda {
  height: 85vh;
  overflow-y: auto;
}

::-webkit-scrollbar {
  background-color: white;
  width: 5px;
  border-end-end-radius: 5px;
  border-end-start-radius: 5px;
}

::-webkit-scrollbar-thumb {
  background-color: var(--primary);
  border-end-end-radius: 5px;
  border-end-start-radius: 5px;
}

/* -------------------------- CALENDAR -------------------------- */
.card-calender #calendar {
  background-color: var(--primary);
  border-radius: 4px;
  padding: 0.5rem 0 1rem 1rem;
  margin-bottom: 0.25rem;
  font-size: xx-large;
  color: var(--light);
  text-align: center;
}

/* -------------------------- DOCTOR DATA -------------------------- */
.box {
  background-color: #e9fffeeb;
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
