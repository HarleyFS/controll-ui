<template>
  <div class="tile is-ancestor">
    <div class="tile is-parent">
      <article class="tile is-child box">
        <div class="media is-6">
          <figure class="media-left image is-128x128">
            <img class="is-rounded" src="../assets/doctor.jpg" />
          </figure>

          <div class="media-content" style="margin-top: 1rem">
            <div class="content">
              <p>
                <strong>Paciente</strong>
                <br />Nome: {{ schedule?.fullName }} <br />Idade:
                {{ schedule?.age }} anos <br />Sexo:
                {{ schedule?.gender == Gender.MALE ? "M" : "F" }}
              </p>
            </div>
          </div>
        </div>

        <div class="level" style="margin-top: 1rem">
          <div class="level-item has-text-centered">
            <div
              class="box"
              style="
                padding: 0.5rem;
                box-shadow: 0 0.5em 1em -0.125em rgb(10 10 10 / 4%),
                  0 0 0 1px rgb(10 10 10 / 0%);
              "
            >
              <p class="heading">Horário da Consulta</p>
              <p class="info-patient">
                {{
                  schedule.scheduleDateTime
                    ? new Date(schedule.scheduleDateTime)
                        .toLocaleString()
                        .replace(",", " ")
                    : null
                }}
              </p>
            </div>
          </div>

          <!-- <div class="level-item has-text-centered">
            <div
              class="box"
              style="
                padding: 0.5rem;
                box-shadow: 0 0.5em 1em -0.125em rgb(10 10 10 / 4%),
                  0 0 0 1px rgb(10 10 10 / 0%);
              "
            >
              <p class="heading">Consultas</p>
              <p class="info-patient">4</p>
            </div>
          </div> -->
        </div>

        <div class="has-text-centered">
          <i
            v-for="(j, i) in schedulesList.length"
            :key="i"
            :class="j == x ? 'fa-solid fa-circle' : 'fa-regular fa-circle'"
            style="padding: 0.15rem"
            @click="nextSchedule()"
          ></i>
        </div>
      </article>
    </div>

    <div class="tile is-parent is-8">
      <article class="tile is-child box">
        <LineChartsComponent :dataList="dataLine" />
      </article>
    </div>
  </div>

  <div class="tile is-ancestor">
    <div class="tile is-parent">
      <article class="tile is-child box">
        <DonutChartsComponent2 :dataList="dataDonut2" />
      </article>
    </div>

    <div class="tile is-parent">
      <article class="tile is-child box">
        <DonutChartsComponent :dataList="dataDonut" />
      </article>
    </div>

    <div class="tile is-parent">
      <article class="tile is-child box">
        <PieChartsComponent :dataList="dataPie" />
      </article>
    </div>
  </div>
</template>

<script lang="ts" setup>
import DonutChartsComponent from "@/components/charts/DonutChartsComponent.vue";
import DonutChartsComponent2 from "@/components/charts/DonutChartsComponent2.vue";
import LineChartsComponent from "@/components/charts/LineChartsComponent.vue";
import PieChartsComponent from "@/components/charts/PieChartsComponent.vue";

import DashboardService from "@/services/DashboardService";
import { onMounted, onUnmounted, reactive, ref } from "vue";
import type { IDataChart } from "@/interfaces/IDataChart";
import type IScheduleRegister from "@/interfaces/schedule/IScheduleRegister";
import { Gender } from "@/enums/GenderEnum";

let dataLine = reactive<Array<Object>>([]);
let dataDonut = reactive<Array<Object>>([]);
let dataDonut2 = reactive<Array<Object>>([]);
let dataPie = reactive<Array<Object>>([]);
let schedulesList = reactive<Array<IScheduleRegister>>([]);
let schedule = ref<IScheduleRegister>({
  id: null,
  fullName: "-",
  name: "-",
  lastName: "-",
  gender: null,
  cellNumber: "",
  birthDate: null,
  age: null,
  scheduleDateTime: null,
  doctor: null,
  patient: null,
});

let x = ref<Number>(1);
let count = 1;
onMounted(async () => {
  await DashboardService.getDataLineChart().then((response) => {
    schedulesList = response.data.schedulesList;
    if (schedulesList.length > 0) {
      schedule.value = schedulesList[0];
    }
    dataLine.push(["Mês", "Consultas realizadas"]);
    response.data.dataLineChart.forEach((dataChart: IDataChart) => {
      dataLine.push([dataChart.key, dataChart.value]);
    });

    dataDonut.push(["Comparecimento", "Consultas realizadas"]);
    response.data.dataDonutChart.forEach((dataChart: IDataChart) => {
      dataDonut.push([dataChart.key, dataChart.value]);
    });

    dataDonut2.push(["Sexo", "Consultas realizadas"]);
    response.data.dataDonutChart2.forEach((dataChart: IDataChart) => {
      dataDonut2.push([dataChart.key, dataChart.value]);
    });

    dataPie.push(["Especialidade", "Consultas realizadas"]);
    response.data.dataPieChart.forEach((dataChart: IDataChart) => {
      dataPie.push([dataChart.key, dataChart.value]);
    });
  });

  setInterval(() => {
    x.value = count;
    schedule.value = schedulesList[count - 1];
    if (count > schedulesList.length - 1) {
      count = 0;
    }

    count++;
  }, 5000);
});

function nextSchedule() {
  x.value = count;
  schedule.value = schedulesList[count - 1];
  if (count > schedulesList.length - 1) {
    count = 0;
  }
  count++;
}
</script>

<style scoped>
.info-patient {
  color: #363636;
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.125;
}

.box {
  padding: 0.5rem;
  box-shadow: 0 0.5em 1em -0.125em rgb(45 170 184 / 56%),
    0 0 0 1px rgb(10 10 10 / 2%);
}
</style>
