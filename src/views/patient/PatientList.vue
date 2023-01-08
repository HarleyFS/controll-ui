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
          <th>CPF</th>
          <th>Telefone</th>
          <th>Cidade</th>
          <th>Estado</th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td>Harley</td>
          <td>Ferreira</td>
          <td>125.125.154-75</td>
          <td>(11) 94499-3371</td>
          <td>São Paulo</td>
          <td>SP</td>
        </tr>

        <tr>
          <td>Harley</td>
          <td>Ferreira</td>
          <td>125.125.154-75</td>
          <td>(11) 94499-3371</td>
          <td>São Paulo</td>
          <td>SP</td>
        </tr>

        <tr>
          <td>Harley</td>
          <td>Ferreira</td>
          <td>125.125.154-75</td>
          <td>(11) 94499-3371</td>
          <td>São Paulo</td>
          <td>SP</td>
        </tr>

        <tr>
          <td>Harley</td>
          <td>Ferreira</td>
          <td>125.125.154-75</td>
          <td>(11) 94499-3371</td>
          <td>São Paulo</td>
          <td>SP</td>
        </tr>

        <tr>
          <td>Harley</td>
          <td>Ferreira</td>
          <td>125.125.154-75</td>
          <td>(11) 94499-3371</td>
          <td>São Paulo</td>
          <td>SP</td>
        </tr>

        <tr>
          <td>Harley</td>
          <td>Ferreira</td>
          <td>125.125.154-75</td>
          <td>(11) 94499-3371</td>
          <td>São Paulo</td>
          <td>SP</td>
        </tr>

        <tr>
          <td>Harley</td>
          <td>Ferreira</td>
          <td>125.125.154-75</td>
          <td>(11) 94499-3371</td>
          <td>São Paulo</td>
          <td>SP</td>
        </tr>

        <tr>
          <td>Harley</td>
          <td>Ferreira</td>
          <td>125.125.154-75</td>
          <td>(11) 94499-3371</td>
          <td>São Paulo</td>
          <td>SP</td>
        </tr>

        <tr>
          <td>Harley</td>
          <td>Ferreira</td>
          <td>125.125.154-75</td>
          <td>(11) 94499-3371</td>
          <td>São Paulo</td>
          <td>SP</td>
        </tr>

        <tr>
          <td>Harley</td>
          <td>Ferreira</td>
          <td>125.125.154-75</td>
          <td>(11) 94499-3371</td>
          <td>São Paulo</td>
          <td>SP</td>
        </tr>
      </tbody>
    </table>

    <PaginationComponent></PaginationComponent>
  </section>

  <PacientForm />
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import PacientForm from "@/views/patient/PatientForm.vue";
import PaginationComponent from "@/components/PaginationComponent.vue";
export default defineComponent({
  name: "PacientView",
  components: {
    PacientForm,
    PaginationComponent,
  },

  setup() {
    const render = ref(false);

    const renderModal = () => {
      render.value = !render.value;
    };

    return {
      render,
      renderModal,
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
