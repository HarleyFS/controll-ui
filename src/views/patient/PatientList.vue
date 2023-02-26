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

    <PaginationComponent></PaginationComponent>
  </section>

  <PacientForm />
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";
import PacientForm from "@/views/patient/PatientForm.vue";
import PaginationComponent from "@/components/PaginationComponent.vue";
import { usePatientStore } from "@/stores/patient-store";
import type Patient from "@/interfaces/patient/IPatientList";

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

    const renderModal = () => {
      render.value = !render.value;
    };

    onMounted(async () => {
      await patientStore.getPatientList();
      patientList.value = patientStore.patientList;
    });

    return {
      render,
      renderModal,
      patientList,
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
