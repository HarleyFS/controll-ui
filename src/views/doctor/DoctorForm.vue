<template>
  <ModalComponent :show="props.render">
    <template v-slot:header>
      <p class="modal-card-title">Cadastrar novo doutor</p>
      <button @click="close()" class="delete" aria-label="close"></button>
    </template>

    <template v-slot:body>
      <form>
        <div class="columns">
          <CardInput inputSize="is-3" nameLabel="Nome">
            <input
              class="input"
              type="text"
              placeholder="Nome"
              v-model="doctor.name"
            />
          </CardInput>

          <CardInput inputSize="is-3" nameLabel="Sobrenome">
            <input
              class="input"
              type="text"
              placeholder="Sobrenome"
              v-model="doctor.lastName"
            />
          </CardInput>

          <CardInput inputSize="is-2" nameLabel="CRM">
            <input
              class="input"
              type="text"
              placeholder="000.00"
              v-mask="['###.##']"
              v-model="doctor.crm"
            />
          </CardInput>

          <CardInput inputSize="is-3" nameLabel="Especialidades">
            <input
              class="input"
              type="text"
              placeholder="Especialidade"
              v-model="doctor.specialty"
            />
          </CardInput>
        </div>

        <div class="columns">
          <CardInput inputSize="is-6" nameLabel="Email">
            <div class="control has-icons-left has-icons-right">
              <input
                class="input"
                type="email"
                placeholder="E-mail"
                v-model="doctor.email"
              />
              <span class="icon is-small is-left">
                <i class="fas fa-envelope"></i>
              </span>
            </div>
          </CardInput>

          <CardInput inputSize="is-3" nameLabel="Celular">
            <input
              class="input"
              type="text"
              placeholder="(00) 00000-0000"
              v-mask="['(##) ####-####', '(##) #####-####']"
              v-model="doctor.cellNumber"
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
                  v-model="doctor.address.zipCode"
                />
              </div>
            </div>
          </div>

          <CardInput inputSize="is-4" nameLabel="Logadrouro"
            ><input
              class="input"
              type="text"
              placeholder="Logradouro"
              v-model="doctor.address.publicPlace"
            />
          </CardInput>

          <CardInput inputSize="is-2" nameLabel="Nº"
            ><input
              class="input"
              type="number"
              placeholder="Nº"
              v-model="doctor.address.number"
            />
          </CardInput>

          <CardInput inputSize="is-4" nameLabel="Bairro"
            ><input
              class="input"
              type="text"
              placeholder="Bairro"
              v-model="doctor.address.district"
            />
          </CardInput>
        </div>

        <div class="columns">
          <CardInput inputSize="is-5" nameLabel="Cidade">
            <input
              class="input"
              type="text"
              placeholder="Cidade"
              v-model="doctor.address.city"
            />
          </CardInput>

          <CardInput inputSize="is-2" nameLabel="Estado">
            <div class="select">
              <select v-model="doctor.address.state">
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
              v-model="doctor.address.complement"
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
import type Doctor from "@/interfaces/doctor/IDoctor";
import DoctorService from "@/services/DoctorService";
import { Speciality } from "@/enums/SpecialityEnum";
import { Gender } from "@/enums/GenderEnum";
import useNotifierHook from "@/hooks/notifier-hook";

const doctor = reactive<Doctor>({
  id: null,
  name: "",
  lastName: "",
  specialty: null,
  email: "",
  gender: Gender.FEMALE,
  cellNumber: "",
  crm: "",
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

const { notifySuccess, notifyError } = useNotifierHook();

function register(): void {
  DoctorService.registerDoctor(doctor)
    .then((response) => {
      close();
      notifySuccess("Doutor cadastrado com sucesso!");
      console.log(response);
    })
    .catch((error) => notifyError(error));
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
