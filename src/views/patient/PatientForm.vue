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
                />
                Masculino
              </label>
              <label class="radio">
                <input
                  type="radio"
                  name="answer"
                  :value="Gender.FEMALE"
                  v-model="patient.gender"
                />
                Feminino
              </label>
            </div>
          </CardInput>
        </div>

        <div class="columns">
          <CardInput inputSize="is-3" nameLabel="Data nascimento">
            <input class="date" type="date" v-model="patient.birthDate" />
          </CardInput>

          <CardInput inputSize="is-3" nameLabel="CPF">
            <input
              class="input"
              type="text"
              placeholder="000.000.000-00"
              v-mask="['###.###.###-##', '##.###.###/####-##']"
              v-model="patient.cpf"
            />
          </CardInput>

          <CardInput inputSize="is-2" nameLabel="RG">
            <input
              class="input"
              type="text"
              placeholder="00.000.000-0"
              v-mask="'##.###.###.#'"
              v-model="patient.rg"
            />
          </CardInput>

          <CardInput inputSize="is-4" nameLabel="Nº Plano"
            ><input
              class="input"
              type="text"
              placeholder=""
              v-model="patient.healthPlanNumber"
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
            />
          </CardInput>

          <CardInput inputSize="is-3" nameLabel="Celular">
            <input
              class="input"
              type="text"
              placeholder="(00) 00000-0000"
              v-mask="['(##) ####-####', '(##) #####-####']"
              v-model="patient.cellNumber"
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
            />
          </CardInput>

          <CardInput inputSize="is-2" nameLabel="Nº"
            ><input
              class="input"
              type="number"
              placeholder="Nº"
              v-model="patient.address.number"
            />
          </CardInput>

          <CardInput inputSize="is-4" nameLabel="Bairro"
            ><input
              class="input"
              type="text"
              placeholder="Bairro"
              v-model="patient.address.district"
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
            />
          </CardInput>

          <CardInput inputSize="is-2" nameLabel="Estado">
            <div class="select">
              <select v-model="patient.address.state">
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
            />
          </CardInput>
        </div>
      </form>
    </template>

    <template v-slot:footer>
      <button @click="register" class="button button-person">Salvar</button>
      <button @click="close()" class="button">Cancelar</button>
    </template>
  </ModalComponent>
</template>

<script lang="ts" setup>
import ModalComponent from "@/components/ModalComponent.vue";
import CardInput from "@/components/CardInputComponent.vue";
import { reactive, ref } from "vue";
import type Patient from "@/interfaces/patient/IPatient";
import PatientService from "@/services/PatientService";
import { Gender } from "@/enums/GenderEnum";
const patient = reactive<Patient>({
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

function register(): void {
  PatientService.registerPatient(patient)
    .then((response) => {
      close();
      console.log(response);
    })
    .catch((error) => console.log(error));
}

const props = defineProps({
  render: Boolean,
});

const emit = defineEmits(["closeForm"]);

function close(): void {
  emit("closeForm");
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
