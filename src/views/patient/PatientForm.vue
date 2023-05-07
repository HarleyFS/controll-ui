<template>
  <ModalComponent :show="props.render">
    <template v-slot:header>
      <p class="modal-card-title">Cadastrar novo paciente</p>
      <button @click="close()" class="delete" aria-label="close"></button>
    </template>

    <template v-slot:body>
      <form>
        <div class="columns">
          <CardInput inputSize="is-9" nameLabel="Nome">
            <input
              class="input"
              type="text"
              placeholder="Nome completo"
              v-model="patient.fullName"
              :disabled="disableField()"
            />
          </CardInput>

          <CardInput inputSize="is-9" nameLabel="Sexo">
            <div class="control" style="margin-top: 1rem">
              <label class="radio">
                <input
                  type="radio"
                  name="answer"
                  :value="Gender.MALE"
                  v-model="patient.gender"
                  :disabled="disableField()"
                />
                Masculino
              </label>
              <label class="radio">
                <input
                  type="radio"
                  name="answer"
                  :value="Gender.FEMALE"
                  v-model="patient.gender"
                  :disabled="disableField()"
                />
                Feminino
              </label>
            </div>
          </CardInput>
        </div>

        <div class="columns">
          <CardInput inputSize="is-3" nameLabel="Data nascimento">
            <input
              class="date"
              type="date"
              v-model="patient.birthDate"
              :disabled="disableField()"
            />
          </CardInput>

          <CardInput inputSize="is-3" nameLabel="CPF">
            <input
              class="input"
              type="text"
              placeholder="000.000.000-00"
              v-mask="['###.###.###-##', '##.###.###/####-##']"
              v-model="patient.cpf"
              :disabled="disableField()"
            />
          </CardInput>

          <CardInput inputSize="is-2" nameLabel="RG">
            <input
              class="input"
              type="text"
              placeholder="00.000.000-0"
              v-mask="'##.###.###.#'"
              v-model="patient.rg"
              :disabled="disableField()"
            />
          </CardInput>

          <CardInput inputSize="is-4" nameLabel="Nº Plano"
            ><input
              class="input"
              type="text"
              placeholder=""
              v-model="patient.healthPlanNumber"
              v-mask="['################']"
              :disabled="disableField()"
          /></CardInput>
        </div>

        <div class="columns">
          <CardInput inputSize="is-6" nameLabel="Email">
            <div class="control has-icons-left has-icons-right">
              <input
                class="input"
                type="email"
                placeholder="E-mail"
                v-model="patient.email"
                :disabled="disableField()"
              />
              <span class="icon is-small is-left">
                <i class="fas fa-envelope"></i>
              </span>
            </div>
          </CardInput>

          <CardInput inputSize="is-3" nameLabel="Telefone">
            <input
              class="input"
              type="text"
              v-mask="['(##) ####-####', '(##) #####-####']"
              placeholder="(00) 00000-0000"
              v-model="patient.phoneNumber"
              :disabled="disableField()"
            />
          </CardInput>

          <CardInput inputSize="is-3" nameLabel="Celular">
            <input
              class="input"
              type="text"
              placeholder="(00) 00000-0000"
              v-mask="['(##) ####-####', '(##) #####-####']"
              v-model="patient.cellNumber"
              :disabled="disableField()"
            />
          </CardInput>
        </div>

        <div class="columns">
          <div class="column is-2 field">
            <div class="field">
              <label class="label">CEP</label>
              <div class="control">
                <input
                  class="input"
                  type="text"
                  placeholder="00000-000"
                  v-mask="'#####-###'"
                  v-model="patient.address.zipCode"
                  :disabled="disableField()"
                  :blur="getAddress()"
                />
              </div>
            </div>
          </div>

          <CardInput inputSize="is-4" nameLabel="Logadrouro"
            ><input
              class="input"
              type="text"
              placeholder="Logradouro"
              v-model="patient.address.publicPlace"
              :disabled="disableField()"
            />
          </CardInput>

          <CardInput inputSize="is-2" nameLabel="Nº"
            ><input
              class="input"
              type="number"
              placeholder="Nº"
              v-model="patient.address.number"
              :disabled="disableField()"
            />
          </CardInput>

          <CardInput inputSize="is-4" nameLabel="Bairro"
            ><input
              class="input"
              type="text"
              placeholder="Bairro"
              v-model="patient.address.district"
              :disabled="disableField()"
            />
          </CardInput>
        </div>

        <div class="columns">
          <CardInput inputSize="is-5" nameLabel="Cidade">
            <input
              class="input"
              type="text"
              placeholder="Cidade"
              v-model="patient.address.city"
              :disabled="disableField()"
            />
          </CardInput>

          <CardInput inputSize="is-2" nameLabel="Estado">
            <div class="select">
              <select
                v-model="patient.address.state"
                :disabled="disableField()"
              >
                <option v-for="state in states" v-bind:key="state">
                  {{ state }}
                </option>
              </select>
            </div>
          </CardInput>

          <CardInput inputSize="is-5" nameLabel="Complemento">
            <input
              class="input"
              type="text"
              placeholder="Complemento"
              v-model="patient.address.complement"
              :disabled="disableField()"
            />
          </CardInput>
        </div>
      </form>
    </template>

    <template v-slot:footer>
      <button
        @click="register"
        class="button button-person"
        v-if="!disableField()"
      >
        Salvar
      </button>
      <button
        @click="changePatient(false)"
        class="button button-cancel"
        v-if="!disableField()"
      >
        Cancelar
      </button>
      <button
        @click="changePatient(true)"
        class="button button-person"
        v-if="disableField()"
      >
        Editar
      </button>
      <button @click="close()" class="button" v-if="disableField()">
        Voltar
      </button>
    </template>
  </ModalComponent>
</template>

<script lang="ts" setup>
import ModalComponent from "@/components/ModalComponent.vue";
import CardInput from "@/components/CardInputComponent.vue";
import { reactive, ref, watch, type PropType } from "vue";
import type Patient from "@/interfaces/patient/IPatient";
import PatientService from "@/services/PatientService";
import { Gender } from "@/enums/GenderEnum";
import useNotifierHook from "@/hooks/notifier-hook";
import CepService from "@/services/CepService";

const props = defineProps({
  render: Boolean,
  patient: Object as PropType<Patient>,
});

const emit = defineEmits(["closeForm"]);

function close(): void {
  patient = reactive<Patient>({
    id: null,
    fullName: "",
    gender: Gender.FEMALE,
    birthDate: new Date(),
    cpf: "",
    rg: "",
    healthInsurance: "",
    healthPlanNumber: "",
    email: "",
    phoneNumber: "",
    cellNumber: "",
    address: {
      publicPlace: "",
      number: Number(),
      district: "",
      city: "",
      state: "",
      country: "Brasil",
      zipCode: "",
      complement: "",
    },
  });
  edit.value = false;
  emit("closeForm");
}

const edit = ref(false);
function disableField(): boolean {
  return patient.id && !edit.value ? true : false;
}

function changePatient(value: boolean): void {
  edit.value = value;
  if (!value) {
    close();
  }
}

let patient = reactive<Patient>({
  id: null,
  fullName: "",
  gender: Gender.FEMALE,
  birthDate: new Date(),
  cpf: "",
  rg: "",
  healthInsurance: "",
  healthPlanNumber: "",
  email: "",
  phoneNumber: "",
  cellNumber: "",
  address: {
    publicPlace: "",
    number: Number(),
    district: "",
    city: "",
    state: "",
    country: "Brasil",
    zipCode: "",
    complement: "",
  },
});

watch(
  () => props.patient,
  (newValue) => {
    if (newValue != null) {
      patient = newValue;
    }
  }
);

function getAddress(): void {
  if (patient.address.zipCode.length == 9 && !disableField()) {
    CepService.getAddress(patient.address.zipCode)
      .then((response) => {
        if (response.data.erro != null && response.data.erro == "true") {
          notifyInfo("Não foi possível encontrar CEP.");
        }
        patient.address.publicPlace = response.data.logradouro;
        patient.address.district = response.data.bairro;
        patient.address.city = response.data.localidade;
        patient.address.state = response.data.uf;
      })
      .catch(() => notifyInfo("Não foi possível encontrar CEP."));
  }
}

const states = reactive([
  "AC",
  "AL",
  "AP",
  "AM",
  "BA",
  "CE",
  "DF",
  "ES",
  "GO",
  "MA",
  "MT",
  "MS",
  "MG",
  "PA",
  "PB",
  "PR",
  "PE",
  "PI",
  "RJ",
  "RN",
  "RS",
  "RO",
  "RR",
  "SC",
  "SP",
  "SE",
  "TO",
]);

const { notifySuccess, notifyError, notifyInfo } = useNotifierHook();

function register(): void {
  if (!patient.id) {
    PatientService.registerPatient(patient)
      .then(() => {
        close();
        notifySuccess("Paciente cadastrado com sucesso!");
      })
      .catch((error) => notifyError(error));
  } else {
    PatientService.updatePatient(patient.id, patient)
      .then(() => {
        close();
        notifySuccess("Paciente atualizado com sucesso!");
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

input.date[disabled] {
  background-color: #f5f5f5;
  border-color: #f5f5f5;
  box-shadow: none;
  color: #7a7a7a;
}

.button-person {
  background: var(--primary);
}
p,
.button-person {
  margin-bottom: 0rem;
  color: var(--light);
}

.button-edit {
  background: #ffe310;
  margin-bottom: 0rem;
  color: var(--light);
}

.button-cancel {
  background: #ce1515;
  margin-bottom: 0rem;
  color: var(--light);
}

.modal-background {
  background-color: rgb(197 230 236 / 80%);
}
</style>
