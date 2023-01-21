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
                <br />Harley Ferreira <br />Idade: 18 anos - Sexo: M
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
              <p class="heading">Última Consulta</p>
              <p class="info-patient">12/12/2022</p>
            </div>
          </div>

          <div class="level-item has-text-centered">
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
          </div>
        </div>
      </article>
    </div>
    <div class="tile is-parent is-8">
      <article class="tile is-child box">
        <LineChartsComponent />
      </article>
    </div>
  </div>
  <div class="tile is-ancestor">
    <div class="tile is-parent">
      <article class="tile is-child box">
        <DonutChartsComponent2 />
      </article>
    </div>
    <div class="tile is-parent">
      <article class="tile is-child box">
        <DonutChartsComponent />
      </article>
    </div>
    <div class="tile is-parent">
      <article class="tile is-child box">
        <DonutChartsComponent />
      </article>
    </div>
  </div>

  <div class="tile is-ancestor">
    <div class="tile is-parent is-8">
      <article class="tile is-child box">
        <ColumnChartsComponent />
      </article>
    </div>
    <div class="tile is-parent">
      <article class="tile is-child box">
        <PieChartsComponent />
      </article>
    </div>
  </div>
</template>

<script lang="ts">
import ColumnChartsComponent from "@/components/charts/ColumnChartsComponent.vue";
import DonutChartsComponent from "@/components/charts/DonutChartsComponent.vue";
import DonutChartsComponent2 from "@/components/charts/DonutChartsComponent2.vue";
import LineChartsComponent from "@/components/charts/LineChartsComponent.vue";
import PieChartsComponent from "@/components/charts/PieChartsComponent.vue";

import { defineComponent } from "vue";

export default defineComponent({
  name: "DashboardView",
  components: {
    ColumnChartsComponent,
    DonutChartsComponent,
    DonutChartsComponent2,
    LineChartsComponent,
    PieChartsComponent,
  },
});
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
