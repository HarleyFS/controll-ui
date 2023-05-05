<template>
  <section>
    <div class="columns">
      <div class="column is-2">
        <button class="button button-person" @click="renderModal">
          <i style="margin-right: 0.5rem" class="fas fa-plus"></i>Novo
        </button>
      </div>
      <div class="column is-3" v-if="false">
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
          <th>Especialidade</th>
          <th>CMR</th>
          <th>Email</th>
          <th></th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="doctor in doctorList" :key="Number(doctor.id)">
          <td>{{ doctor.name }}</td>
          <td>{{ doctor.lastName }}</td>
          <td>{{ doctor.specialty }}</td>
          <td>{{ doctor.crm }}</td>
          <td>{{ doctor.email }}</td>
          <td>
            <i
              class="fa-solid fa-eye"
              @click="renderModal2(Number(doctor.id))"
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

  <DoctorForm
    :render="render"
    @closeForm="renderModal()"
    :doctor="doctor"
  ></DoctorForm>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import DoctorForm from "@/views/doctor/DoctorForm.vue";
import PaginationComponent from "@/components/PaginationComponent.vue";
import { useDoctorStore } from "@/stores/doctor-store";
import type Doctor from "@/interfaces/doctor/IDoctorList";
import DoctorService from "@/services/DoctorService";
import type IDoctor from "@/interfaces/doctor/IDoctor";

export default defineComponent({
  name: "PacientView",
  components: {
    DoctorForm,
    PaginationComponent,
  },

  setup() {
    const render = ref(false);
    const doctorStore = useDoctorStore();
    const doctorList = ref<Array<Doctor>>([]);
    const doctor = ref<IDoctor>();
    const renderModal = () => {
      render.value = !render.value;
      loadItems(1);
    };

    onMounted(() => {
      doctorStore.getSpecialties();
    });

    async function renderModal2(id: number) {
      await DoctorService.getById(id).then((response) => {
        console.log(
          "🚀 ~ file: DoctorList.vue:87 ~ awaitDoctorService.getById ~ response:",
          response
        );
        doctor.value = response.data;
        render.value = !render.value;
      });
    }

    const currentPage = ref(1);
    const totalPages = ref(1);
    const totalElements = ref(0);

    const loadItems = async (page: number) => {
      await DoctorService.getDoctorList(page).then((response) => {
        doctorList.value = response.data.content;
        totalPages.value = response.data.totalPages;
        totalElements.value = response.data.totalElements;
        doctorStore.doctorList = doctorList.value;
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
      doctorList,
      currentPage,
      totalPages,
      onPageChange,
      totalElements,
      renderModal2,
      doctor,
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
