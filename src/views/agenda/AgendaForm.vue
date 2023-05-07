<template>
  <ModalComponent :show="render">
    <template v-slot:header>
      <p class="modal-card-title">Novo agendamento</p>
      <button @click="close()" class="delete" aria-label="close"></button>
    </template>

    <template v-slot:body>
      <div class="columns">
        <CardInput inputSize="is-9" nameLabel="Nome">
          <input
            class="input"
            type="text"
            placeholder="Nome completo"
            v-model="schedule.fullName"
            @click="setSearch(true)"
            :disabled="disableField()"
          />
          <div v-for="patient in patientList" :key="Number(patient.id)">
            <a @click="fillSchedule(patient)" class="panel-block is-active">
              {{ patient.fullName }}
            </a>
          </div>
        </CardInput>
      </div>

      <div class="columns">
        <CardInput inputSize="is-3" nameLabel="Data nascimento">
          <input
            class="date"
            type="date"
            v-model="schedule.birthDate"
            :disabled="disableField()"
          />
        </CardInput>

        <CardInput inputSize="is-3" nameLabel="Sexo">
          <div class="control" style="margin-top: 1rem">
            <label class="radio">
              <input
                type="radio"
                name="answer"
                :value="Gender.MALE"
                v-model="schedule.gender"
                :disabled="disableField()"
              />
              Masculino
            </label>
            <label class="radio">
              <input
                type="radio"
                name="answer"
                :value="Gender.FEMALE"
                v-model="schedule.gender"
                :disabled="disableField()"
              />
              Feminino
            </label>
          </div>
        </CardInput>

        <CardInput inputSize="is-3" nameLabel="Celular">
          <input
            class="input"
            type="text"
            placeholder="(00) 00000-0000"
            v-mask="['(##) #####-####']"
            v-model="schedule.cellNumber"
            :disabled="disableField()"
          />
        </CardInput>
      </div>
      <div class="columns">
        <CardInput inputSize="is-3" nameLabel="Doutor(a)">
          <div class="custom-label">
            {{ doctor?.name }}
          </div>
        </CardInput>

        <CardInput inputSize="is-3" nameLabel="Horário">
          <div class="custom-label">
            {{ scheduleDate.toLocaleString().replace(",", "  ") }}
          </div>
        </CardInput>
      </div>
    </template>

    <template v-slot:footer>
      <button
        class="button button-person"
        @click="save()"
        v-if="!disableField()"
      >
        Salvar
      </button>
      <button
        class="button is-danger"
        @click="editSchedule(false)"
        v-if="!disableField()"
      >
        Cancelar
      </button>

      <button
        class="button button-person"
        @click="editSchedule(true)"
        v-if="disableField()"
      >
        Editar
      </button>
      <button class="button" @click="close()" v-if="disableField()">
        Voltar
      </button>
    </template>
  </ModalComponent>
</template>

<script lang="ts" setup>
import ModalComponent from "@/components/ModalComponent.vue";
import CardInput from "@/components/CardInputComponent.vue";
import ScheduleService from "@/services/ScheduleService";
import type ISchedule from "@/interfaces/schedule/IScheduleRegister";
import { Gender } from "@/enums/GenderEnum";
import { reactive, type PropType, watch, ref, watchEffect } from "vue";
import useNotifierHook from "@/hooks/notifier-hook";
import { useDoctorStore } from "@/stores/doctor-store";
import type IPatientList from "@/interfaces/patient/IPatientList";
import PatientService from "@/services/PatientService";

const doctorStore = useDoctorStore();
const patientList = ref<Array<IPatientList>>([]);

const props = defineProps({
  render: Boolean,
  id: Number,
  scheduleDate: {
    type: Date,
    default: null,
  },
  schedule: {
    type: Object as PropType<ISchedule>,
    default: null,
  },
});

const doctor = doctorStore.getCurrentDoctor;
const schedule = reactive<ISchedule>({
  id: null,
  fullName: "",
  name: "",
  lastName: "",
  gender: Gender.FEMALE,
  cellNumber: "",
  birthDate: null,
  scheduleDate: props.scheduleDate,
  doctor: doctor.value,
  patient: null,
});

watch(
  () => props.schedule,
  (newValue) => {
    if (newValue != null && newValue.id != null) {
      schedule.id = newValue.id;
      schedule.fullName = newValue.fullName;
      schedule.gender = newValue.gender;
      schedule.cellNumber = newValue.cellNumber;
      schedule.birthDate = newValue.birthDate;
      schedule.scheduleDate = newValue.scheduleDate;
      schedule.doctor = newValue.doctor;
      schedule.patient = newValue.patient;
    } else {
      fillScheduleDefault();
    }
  }
);

const edit = ref(false);
function disableField(): boolean {
  return schedule.id && !edit.value ? true : false;
}

function editSchedule(value: boolean): void {
  edit.value = value;
  if (!value) {
    close();
  }
}

const isSearch = ref(false);

function setSearch(value: boolean) {
  isSearch.value = value;
}

async function loadPatientList() {
  if (
    schedule.fullName != null &&
    schedule.fullName.length > 0 &&
    isSearch.value
  ) {
    await PatientService.getPatientList(1, schedule.fullName).then(
      (response) => {
        patientList.value = response.data.content;
      }
    );
  }
}

watchEffect(() => {
  loadPatientList();
});

function clearPatientList() {
  patientList.value = Array<IPatientList>();
  isSearch.value = false;
}

function fillSchedule(patient: IPatientList) {
  schedule.id = null;
  schedule.fullName = patient.fullName;
  schedule.gender = patient.gender;
  schedule.name = patient.name;
  schedule.lastName = patient.lastName;
  schedule.cellNumber = patient.cellNumber;
  schedule.birthDate = patient.birthDate;
  schedule.scheduleDate = props.scheduleDate;
  schedule.doctor = doctor.value;
  schedule.patient = patient;
  clearPatientList();
}

function fillScheduleDefault() {
  schedule.id = null;
  schedule.fullName = "";
  schedule.name = "";
  schedule.lastName = "";
  schedule.gender = Gender.FEMALE;
  schedule.cellNumber = "";
  schedule.birthDate = null;
  schedule.scheduleDate = props.scheduleDate;
  schedule.doctor = doctor.value;
  schedule.patient = null;
}

const { notifySuccess, notifyError } = useNotifierHook();

const emit = defineEmits(["closeForm"]);

function close(): void {
  fillScheduleDefault();
  clearPatientList();
  edit.value = false;
  emit("closeForm");
}

function save(): void {
  if (!schedule.id) {
    schedule.doctor = doctorStore.getCurrentDoctor.value;
    ScheduleService.createSchedule(schedule)
      .then(() => {
        close();
        notifySuccess("Consulta agendada com sucesso!");
      })
      .catch((error) => notifyError(error));
  } else {
    ScheduleService.updateSchedule(schedule.id, schedule)
      .then(() => {
        close();
        notifySuccess("Dados alterados com sucesso!");
      })
      .catch((error) => notifyError(error));
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

.custom-label {
  border: 1px solid #dbdbdb;
  border-radius: 4px;
  font-size: 1rem;
  color: #363636;
  padding: 7px 11px;
}
</style>
