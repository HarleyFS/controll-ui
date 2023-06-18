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
                    :class="currentHour == hour ? 'shadow' : ''"
                  >
                    <Time
                      :schedule="getSchedule(hour, minute)"
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
      <article class="is-child card-calender" style="margin-bottom: 3rem">
        <p id="calendar" class="title">Calendário</p>
        <DatePicker v-model="calendarDate" style="width: 100%" />
      </article>

      <article class="is-child box">
        <div class="level">
          <div class="level-left">
            <a @click="goToPreviousPage()">
              <i class="fas fa-angle-left"></i>
            </a>
          </div>

          <div class="level-right">
            <a @click="goToNextPage()">
              <i class="fas fa-angle-right"></i>
            </a>
          </div>
        </div>

        <div class="media is-6">
          <figure class="media-left image is-128x128">
            <img class="is-rounded" src="../assets/men-women.png" />
          </figure>

          <div class="media-content" style="margin-top: 1rem">
            <div class="content">
              <p>
                <strong>{{ doctor?.name }}</strong>
                <br />
                {{ doctor?.specialty }}
              </p>
            </div>
          </div>
        </div>

        <div class="level" style="margin-top: 2rem">
          <div class="level-item has-text-centered">
            <div class="box">
              <p class="heading">Consultas Agendadas</p>
              <p class="title">{{ amountSchedules }}</p>
            </div>
          </div>
        </div>
      </article>
    </div>
  </div>
  <AgendaForm
    :schedule="schedule"
    :scheduleDateTime="calendarDate"
    :render="render"
    @closeForm="renderModal"
  />
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from "vue";
import { DatePicker } from "v-calendar";
import AgendaForm from "./agenda/AgendaForm.vue";
import Time from "@/components/TimeComponent.vue";
import ScheduleService from "@/services/ScheduleService";
import type ISchedule from "@/interfaces/schedule/IScheduleRegister";
import type IDoctor from "@/interfaces/doctor/IDoctorList";
import { useDoctorStore } from "@/stores/doctor-store";
import DoctorService from "@/services/DoctorService";

const scheduleList = ref<Array<any>>([]);
const doctorStore = useDoctorStore();
const doctor = ref<IDoctor>();
const amountSchedules = ref<Number>();

onMounted(() => {
  getCurrentDoctor(0);
});

async function getScheduleList() {
  if (doctor.value != null && doctor.value.id != null) {
    await ScheduleService.getScheduleList(
      doctor.value.id,
      calendarDate.value
    ).then((reponse) => {
      scheduleList.value = reponse.data.content;
    });
  }
}

const currentHour = ref(new Date().getHours());
const hours = ref(Array.from({ length: 17 }, (_, i) => i + 7));
const minutes = ref(Array.from({ length: 6 }, (_, i) => (i *= 10)));

const calendarDate = ref(new Date());
let schedule = ref<ISchedule>();

function getSchedule(hour: number, minute: number) {
  if (hour != null && minute != null) {
    var name = null;
    scheduleList.value.forEach((element) => {
      const boardDate = new Date(calendarDate.value);
      boardDate.setHours(hour, minute, 0, 0);
      const scheduleDate = new Date(element.scheduleDateTime);

      if (boardDate.getTime() == scheduleDate.getTime()) {
        name = element;
      }
    });
  }

  return name;
}

let currentPage = 0;

function goToPreviousPage() {
  if (currentPage - 1 > -1) {
    currentPage -= 1;
    getCurrentDoctor(currentPage);
  }
}

function goToNextPage() {
  if (currentPage + 1 < doctorStore.totalDoctors) {
    currentPage += 1;
    getCurrentDoctor(currentPage);
  }
}

async function getCurrentDoctor(page: number) {
  await DoctorService.getOneDoctorList(page).then((response) => {
    doctor.value = response.data.content[0];
    if (doctor.value != null && doctor.value != undefined) {
      doctorStore.setCurrentDoctor(doctor.value);
      getScheduleList();
      getAmountSchedules();
    }
  });
}

function getAmountSchedules() {
  if (doctor.value != null && doctor.value.id != null) {
    ScheduleService.getAmountSchedules(doctor.value.id).then(
      (response) => (amountSchedules.value = response.data)
    );
  }
}

const render = ref(false);
const renderModal = (hours: any) => {
  if (hours != null) {
    calendarDate.value.setHours(hours.hour, hours.minute, 0, 0);
    schedule.value = hours.schedule;
  }
  render.value = !render.value;
  getScheduleList();
};

watch([() => calendarDate.value], () => {
  getScheduleList();
});
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
