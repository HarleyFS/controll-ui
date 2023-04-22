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
            <input class="input search" type="text" placeholder="Filtro" />
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
        </tr>
      </thead>

      <tbody>
        <tr v-for="patient in patientList" :key="Number(patient.id)">
          <td>{{ patient.name }}</td>
          <td>{{ patient.lastName }}</td>
          <td>{{ patient.cellNumber }}</td>
          <td>{{ patient.birthDate }}</td>
          <td>{{ patient.gender }}</td>
          <td>{{ patient.email }}</td>
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

  <PacientForm :render="render" @closeForm="renderModal()"></PacientForm>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import PacientForm from "@/views/patient/PatientForm.vue";
import PaginationComponent from "@/components/PaginationComponent.vue";
import { usePatientStore } from "@/stores/patient-store";
import type Patient from "@/interfaces/patient/IPatientList";
import PatientService from "@/services/PatientService";

export default defineComponent({
  name: "PacientView",
  components: {
    PacientForm,
    PaginationComponent,
  },

  setup() {
    const render = ref(false);
    const patientStore = usePatientStore();
    const patientList = ref<Array<Patient>>([]);

    const currentPage = ref(1);
    const totalPages = ref(1);
    const totalElements = ref(0);

    const renderModal = () => {
      render.value = !render.value;
    };

    const loadItems = async (page: number) => {
      await PatientService.getPatientList(page).then((response) => {
        patientList.value = response.data.content;
        totalPages.value = response.data.totalPages;
        totalElements.value = response.data.totalElements;
        patientStore.setPatientList(patientList.value);
      });
    };

    const onPageChange = (page: number) => {
      currentPage.value = page;
      loadItems(page);
    };

    loadItems(currentPage.value);

    return {
      render,
      renderModal,
      patientList,
      currentPage,
      totalPages,
      onPageChange,
      totalElements,
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
