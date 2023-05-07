<template>
  <ModalComponent :show="props.render">
    <template v-slot:header>
      <p class="modal-card-title">Cadastrar novo doutor</p>
      <button @click="close()" class="delete" aria-label="close"></button>
    </template>

    <template v-slot:body>
      <form>
        <div class="columns">
          <CardInput inputSize="is-7" nameLabel="Nome">
            <input
              class="input"
              type="text"
              placeholder="Nome"
              v-model="doctor.fullName"
              :disabled="disabledField()"
            />
          </CardInput>

          <CardInput inputSize="is-3" nameLabel="Sexo">
            <div class="control" style="margin-top: 1rem">
              <label class="radio">
                <input
                  type="radio"
                  name="answer"
                  :value="Gender.MALE"
                  v-model="doctor.gender"
                  :disabled="disabledField()"
                />
                Masculino
              </label>
              <label class="radio">
                <input
                  type="radio"
                  name="answer"
                  :value="Gender.FEMALE"
                  v-model="doctor.gender"
                  :disabled="disabledField()"
                />
                Feminino
              </label>
            </div>
          </CardInput>
        </div>

        <div class="columns">
          <CardInput inputSize="is-2" nameLabel="CRM">
            <input
              class="input"
              type="text"
              placeholder="000.00"
              v-mask="['###.##']"
              v-model="doctor.crm"
              :disabled="disabledField()"
            />
          </CardInput>

          <CardInput inputSize="is-6" nameLabel="Especialidades">
            <div class="select">
              <select v-model="doctor.specialty" :disabled="disabledField()">
                <option
                  v-for="specialty in doctorStore.specialties"
                  v-bind:key="specialty"
                >
                  {{ specialty }}
                </option>
              </select>
            </div>
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
                :disabled="disabledField()"
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
              :disabled="disabledField()"
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
                  :disabled="disabledField()"
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
              v-model="doctor.address.publicPlace"
              :disabled="disabledField()"
            />
          </CardInput>

          <CardInput inputSize="is-2" nameLabel="Nº"
            ><input
              class="input"
              type="number"
              placeholder="Nº"
              v-model="doctor.address.number"
              :disabled="disabledField()"
            />
          </CardInput>

          <CardInput inputSize="is-4" nameLabel="Bairro"
            ><input
              class="input"
              type="text"
              placeholder="Bairro"
              v-model="doctor.address.district"
              :disabled="disabledField()"
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
              :disabled="disabledField()"
            />
          </CardInput>

          <CardInput inputSize="is-2" nameLabel="Estado">
            <div class="select">
              <select
                v-model="doctor.address.state"
                :disabled="disabledField()"
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
              v-model="doctor.address.complement"
              :disabled="disabledField()"
            />
          </CardInput>
        </div>
      </form>
    </template>

    <template v-slot:footer>
      <button
        @click="register"
        class="button button-person"
        v-if="!disabledField()"
      >
        Salvar
      </button>
      <button
        @click="changeDoctor(false)"
        class="button button-cancel"
        v-if="!disabledField()"
      >
        Cancelar
      </button>
      <button
        @click="changeDoctor(true)"
        class="button button-person"
        v-if="disabledField()"
      >
        Editar
      </button>
      <button @click="close()" class="button" v-if="disabledField()">
        Voltar
      </button>
    </template>
  </ModalComponent>
</template>

<script lang="ts" setup>
import ModalComponent from "@/components/ModalComponent.vue";
import CardInput from "@/components/CardInputComponent.vue";
import { reactive, ref, watch, type PropType } from "vue";
import type Doctor from "@/interfaces/doctor/IDoctor";
import DoctorService from "@/services/DoctorService";
import CepService from "@/services/CepService";
import { Gender } from "@/enums/GenderEnum";
import useNotifierHook from "@/hooks/notifier-hook";
import { useDoctorStore } from "@/stores/doctor-store";
const doctorStore = useDoctorStore();

const props = defineProps({
  render: Boolean,
  doctor: Object as PropType<Doctor>,
});

let doctor = reactive<Doctor>({
  id: null,
  fullName: "",
  specialty: "",
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

watch(
  () => props.doctor,
  (newValue) => {
    if (newValue != null) {
      doctor = newValue;
    }
  }
);

const emit = defineEmits(["closeForm"]);
function close(): void {
  doctor = reactive<Doctor>({
    id: null,
    fullName: "",
    specialty: "",
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
  edit.value = false;
  emit("closeForm");
}

const edit = ref(false);
function disabledField(): boolean {
  return doctor.id && !edit.value ? true : false;
}

function changeDoctor(value: boolean): void {
  edit.value = value;
  if (!value) {
    close();
  }
}
function getAddress(): void {
  if (doctor.address.zipCode.length == 9) {
    CepService.getAddress(doctor.address.zipCode)
      .then((response) => {
        if (response.data.erro != null && response.data.erro == "true") {
          notifyInfo("Não foi possível encontrar CEP.");
        }
        doctor.address.publicPlace = response.data.logradouro;
        doctor.address.district = response.data.bairro;
        doctor.address.city = response.data.localidade;
        doctor.address.state = response.data.uf;
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
  if (!doctor.id) {
    DoctorService.registerDoctor(doctor)
      .then(() => {
        close();
        notifySuccess("Doutor cadastrado com sucesso!");
      })
      .catch((error) => notifyError(error));
  } else {
    DoctorService.updateDoctor(doctor.id, doctor)
      .then(() => {
        close();
        notifySuccess("Doutor atualizado com sucesso!");
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

.button-cancel {
  background: #ce1515;
  margin-bottom: 0rem;
  color: var(--light);
}
.modal-background {
  background-color: rgb(197 230 236 / 80%);
}
</style>
