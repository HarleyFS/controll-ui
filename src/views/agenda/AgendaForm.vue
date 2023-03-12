<template>
  <ModalComponent :show="render">
    <template v-slot:header>
      <p class="modal-card-title">Novo agendamento</p>
      <button @click="close()" class="delete" aria-label="close"></button>
    </template>

    <template v-slot:body>
      <div class="columns">
        <CardInput inputSize="is-9" nameLabel="Nome">
          <input class="input" type="text" placeholder="Nome completo" />
        </CardInput>
      </div>

      <div class="columns">
        <CardInput inputSize="is-3" nameLabel="Idade">
          <input class="input" type="text" placeholder="Idade" />
        </CardInput>

        <CardInput inputSize="is-3" nameLabel="Sexo">
          <div class="control" style="margin-top: 1rem">
            <label class="radio">
              <input type="radio" name="answer" />
              Masculino
            </label>
            <label class="radio">
              <input type="radio" name="answer" />
              Feminino
            </label>
          </div>
        </CardInput>

        <CardInput inputSize="is-3" nameLabel="Celular">
          <input
            class="input"
            type="text"
            placeholder="(00) 00000-0000"
            v-mask="['(##) ####-####', '(##) #####-####']"
          />
        </CardInput>
      </div>
    </template>

    <template v-slot:footer>
      <button class="button button-person" @click="create()" v-if="!id">
        Salvar
      </button>
      <button class="button" @click="close()" v-if="!id">Voltar</button>

      <button class="button button-person" @click="update()" v-if="id">
        Editar
      </button>
      <button class="button is-danger" @click="close()" v-if="id">
        Cancelar
      </button>
    </template>
  </ModalComponent>
</template>

<script lang="ts" setup>
import ModalComponent from "@/components/ModalComponent.vue";
import CardInput from "@/components/CardInputComponent.vue";
import ScheduleService from "@/services/ScheduleService";
import type Schedule from "@/interfaces/schedule/IScheduleCreate";
import { Gender } from "@/enums/GenderEnum";
import { reactive } from "vue";

const schedule = reactive<Schedule>({
  id: null,
  fullName: "",
  gender: Gender.FEMALE,
  birthDate: new Date(),
  scheduleDate: new Date(),
  cellNumber: "",
});

const props = defineProps({
  render: Boolean,
  id: Number,
});

const emit = defineEmits(["closeForm"]);

function close(): void {
  emit("closeForm");
}

function create(): void {
  ScheduleService.createSchedule(schedule)
    .then((response) => {
      close();
      console.log(response);
    })
    .catch((error) => console.log(error));
}

function update(): void {
  if (props.id) {
    ScheduleService.updateSchedule(props.id, schedule)
      .then((response) => {
        close();
        console.log(response);
      })
      .catch((error) => console.log(error));
  }
}
</script>

<style scoped>
input.date {
  padding-bottom: calc(0.5em - 1px);
  padding-left: calc(0.75em - 1px);
  padding-right: calc(0.75em - 1px);
  padding-top: calc(0.5em - 1px);
  font-size: 1rem;
  border: 1px solid transparent;
  box-shadow: inset 0 0.0625em 0.125em rgb(10 10 10 / 5%);
  max-width: 100%;
  width: 100%;
  background-color: #fff;
  border-color: #dbdbdb;
  border-radius: 4px;
  color: #363636;
}

.button-person {
  background: var(--primary);
}

p,
.button-person {
  margin-bottom: 0rem;
  color: var(--light);
}

.modal-background {
  background-color: rgb(197 230 236 / 80%);
}
</style>
