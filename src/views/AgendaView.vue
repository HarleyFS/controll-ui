<template>
  <div class="tile is-ancestor">
    <div class="tile is-vertical is-8">
      <div class="card-agenda tile is-parent">
        <article class="tile is-child">
          <div class="header">
            <p id="agenda" class="title">Agenda</p>
          </div>
          <div class="body-agenda">
            <span v-for="(i, index) of list" :key="index">
              <CardTimeComponent :hour="i" />
            </span>
          </div>
        </article>
      </div>
    </div>

    <div class="tile is-parent is-vertical">
      <article class="tile is-child card-calender">
        <p id="calendar" class="title">Calendário</p>
        <DatePicker v-model="date" style="width: 100%" />
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
  <AgendaForm></AgendaForm>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { DatePicker } from "v-calendar";
import CardTimeComponent from "@/components/CardTimeComponent.vue";
import AgendaForm from "./agenda/AgendaForm.vue";

export default defineComponent({
  components: {
    DatePicker,
    CardTimeComponent,
    AgendaForm,
  },

  setup() {
    const date = ref(new Date());
    const begin = ref(7);
    const final = ref(24);
    const list = ref(
      Array.from({ length: final.value - begin.value }, (_, i) => i + 6 + 1)
    );
    return {
      date,
      list,
    };
  },
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
</style>
