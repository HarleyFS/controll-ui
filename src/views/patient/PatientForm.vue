<template>
  <ModalComponent :show="render">
    <template v-slot:header>
      <p class="modal-card-title">Cadastrar novo paciente</p>
      <button @click="renderModal" class="delete" aria-label="close"></button>
    </template>

    <template v-slot:body>
      <div class="columns">
        <CardInput inputSize="is-9" nameLabel="Nome">
          <input class="input" type="text" placeholder="Nome completo" />
        </CardInput>

        <CardInput inputSize="is-9" nameLabel="Sexo">
          <div class="control" style="margin-top: 1rem">
            <label class="radio">
              <input type="radio" name="answer" />
              Masculino
            </label>
            <label class="radio">
              <input type="radio" name="answer" />
              Feminino
            </label>
          </div>
        </CardInput>
      </div>

      <div class="columns">
        <CardInput inputSize="is-3" nameLabel="Data nascimento">
          <input class="date" type="date" />
        </CardInput>

        <CardInput inputSize="is-3" nameLabel="CPF">
          <input
            class="input"
            type="text"
            placeholder="000.000.000-00"
            v-mask="['###.###.###-##', '##.###.###/####-##']"
          />
        </CardInput>

        <CardInput inputSize="is-2" nameLabel="RG">
          <input
            class="input"
            type="text"
            placeholder="00.000.000-0"
            v-mask="'##.###.###.#'"
          />
        </CardInput>

        <CardInput inputSize="is-4" nameLabel="Nº Plano"
          ><input class="input" type="text" placeholder=""
        /></CardInput>
      </div>

      <div class="columns">
        <CardInput inputSize="is-6" nameLabel="Email">
          <div class="control has-icons-left has-icons-right">
            <input class="input" type="email" placeholder="E-mail" value="" />
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
          />
        </CardInput>

        <CardInput inputSize="is-3" nameLabel="Celular">
          <input
            class="input"
            type="text"
            placeholder="(00) 00000-0000"
            v-mask="['(##) ####-####', '(##) #####-####']"
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
              />
            </div>
          </div>
        </div>

        <CardInput inputSize="is-4" nameLabel="Logadrouro"
          ><input class="input" type="text" placeholder="Logradouro" />
        </CardInput>

        <CardInput inputSize="is-2" nameLabel="Nº"
          ><input class="input" type="number" placeholder="Nº" />
        </CardInput>

        <CardInput inputSize="is-4" nameLabel="Bairro"
          ><input class="input" type="text" placeholder="Bairro" />
        </CardInput>
      </div>

      <div class="columns">
        <CardInput inputSize="is-5" nameLabel="Cidade">
          <input class="input" type="text" placeholder="Cidade" />
        </CardInput>

        <CardInput inputSize="is-2" nameLabel="Estado">
          <div class="select">
            <select>
              <option>SP</option>
              <option>MG</option>
              <option>RJ</option>
            </select>
          </div>
        </CardInput>

        <CardInput inputSize="is-5" nameLabel="Complemento">
          <input class="input" type="text" placeholder="Complemento" />
        </CardInput>
      </div>
    </template>

    <template v-slot:footer>
      <button class="button button-person">Salvar</button>
      <button @click="renderModal" class="button">Cancelar</button>
    </template>
  </ModalComponent>
</template>

<script lang="ts">
import ModalComponent from "@/components/ModalComponent.vue";
import CardInput from "@/components/CardInputComponent.vue";
import { defineComponent, ref } from "vue";

export default defineComponent({
  components: { ModalComponent, CardInput },
  name: "PacientForm",

  setup() {
    const render = ref(true);

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
