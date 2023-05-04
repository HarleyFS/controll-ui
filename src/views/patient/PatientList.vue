<template>
  <section>
    <div class="columns">
      <div class="column is-2">
        <button class="button button-person" @click="renderModal">
          <i style="margin-right: 0.5rem" class="fas fa-plus"></i>Novo
        </button>
      </div>
      <div class="column is-3">
        <div class="field">
          <p class="control has-icons-left">
            <input
              class="input search"
              type="text"
              placeholder="Filtro"
              v-model="patientFilter"
            />
            <span class="icon is-small is-left">
              <i class="fas fa-search search"></i>
            </span>
          </p>
        </div>
      </div>
    </div>
    <table class="table is-fullwidth">
      <thead>
        <tr>
          <th>Nome</th>
          <th>Sobrenome</th>
          <th>Telefone</th>
          <th>Idade</th>
          <th>Genero</th>
          <th>Email</th>
          <th></th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="patient in patientList" :key="Number(patient.id)">
          <td>{{ patient.name }}</td>
          <td>{{ patient.lastName }}</td>
          <td>{{ patient.cellNumber }}</td>
          <td>{{ patient.age }} anos</td>
          <td>{{ patient.gender }}</td>
          <td>{{ patient.email }}</td>
          <td>
            <i
              class="fa-solid fa-eye"
              @click="renderModal2(Number(patient.id))"
            ></i>
          </td>
        </tr>
      </tbody>
    </table>

    <PaginationComponent
      :currentPage="currentPage"
      :totalPages="totalPages"
      :onPageChange="onPageChange"
      :totalElements="totalElements"
    ></PaginationComponent>
  </section>

  <PacientForm
    :render="render"
    :patient="patient"
    @closeForm="renderModal()"
  ></PacientForm>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect, reactive } from "vue";
import PacientForm from "@/views/patient/PatientForm.vue";
import PaginationComponent from "@/components/PaginationComponent.vue";
import { usePatientStore } from "@/stores/patient-store";
import type Patient from "@/interfaces/patient/IPatientList";
import PatientService from "@/services/PatientService";
import type IPatient from "@/interfaces/patient/IPatient";

export default defineComponent({
  name: "PacientView",
  components: {
    PacientForm,
    PaginationComponent,
  },

  setup() {
    const patientFilter = ref("");
    const render = ref(false);
    const patientStore = usePatientStore();
    const patientList = ref<Array<Patient>>([]);
    const patient = ref<IPatient>();

    const currentPage = ref(1);
    const totalPages = ref(1);
    const totalElements = ref(0);

    const renderModal = () => {
      render.value = !render.value;
      currentPage.value = 1;
      loadPatientList(1);
    };

    async function renderModal2(id: number) {
      await PatientService.getById(id).then((response) => {
        patient.value = response.data;
        render.value = !render.value;
      });
    }

    async function loadPatientList(page: number) {
      await PatientService.getPatientList(page, patientFilter.value).then(
        (response) => {
          patientList.value = response.data.content;
          totalPages.value = response.data.totalPages;
          totalElements.value = response.data.totalElements;
          patientStore.setPatientList(patientList.value);
        }
      );
    }

    loadPatientList(currentPage.value);

    const onPageChange = (page: number) => {
      currentPage.value = page;
      loadPatientList(page);
    };

    watchEffect(() => {
      loadPatientList(currentPage.value);
    });

    return {
      render,
      renderModal,
      patientList,
      currentPage,
      totalPages,
      onPageChange,
      totalElements,
      patientFilter,
      renderModal2,
      patient,
    };
  },
});
</script>

<style scoped>
.button-person {
  background: var(--primary);
  margin-bottom: 0rem;
  color: var(--light);
}

.search {
  border-color: var(--primary);
  color: var(--primary);
}
</style>
