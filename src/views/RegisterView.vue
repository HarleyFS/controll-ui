<template>
  <div v-if="!emailSent" class="container">
    <div class="card-login">
      <form @submit.prevent="register">
        <h2 class="title">Cadastre-se</h2>

        <div class="field">
          <input
            class="input"
            type="text"
            placeholder="Nome"
            v-model="user.name"
          />
        </div>

        <div class="field">
          <input
            class="input"
            type="text"
            placeholder="Sobrenome"
            v-model="user.lastname"
          />
        </div>

        <div class="field">
          <input
            class="input"
            type="email"
            placeholder="Email"
            v-model="user.email"
          />
        </div>

        <div class="field">
          <input
            class="input"
            type="password"
            placeholder="Senha"
            v-model="user.password"
          />
        </div>

        <router-link to="/login">
          <a>Tem uma conta? Conecte-se</a>
        </router-link>

        <input type="submit" class="button" value="Cadastrar" />
      </form>
    </div>
  </div>
  <SpinnerComponent v-if="showSpinner" />
  <SuccessView v-else :title="title" :message="messagem" :icon="icon" />
</template>

<script lang="ts" setup>
import { ref } from "vue";
import type User from "@/interfaces/authentication/IUser";
import AuthenticationService from "@/services/AuthenticationService";
import useNotifierHook from "@/hooks/notifier-hook";
import SuccessView from "./SuccessView.vue";
import SpinnerComponent from "@/components/SpinnerComponent.vue";

const { notifyError } = useNotifierHook();

const user = ref<User>({
  email: "",
  name: "",
  password: "",
  lastname: "",
});
const emailSent = ref<Boolean>(false);
const title = "Estamos quase lá";
const messagem =
  "Enviamos as instruções para o seu email. Acesso-o e siga as instruções para validar sua conta.";
const icon = "fa-regular fa-face-laugh-wink";
const showSpinner = ref<Boolean>(false);

const register = (): void => {
  showSpinner.value = true;
  AuthenticationService.register(user.value)
    .then(() => {
      emailSent.value = true;
    })
    .catch((error) => notifyError(error));
    showSpinner.value = false;

};
</script>

<style scoped>
.container {
  height: 100vh;
  display: grid;
  justify-content: center;
}

.card-login {
  display: flex;
  align-items: center;
}

form {
  width: 360px;
}

a {
  display: block;
  text-align: left;
  text-decoration: none;
  color: #69797b;
  font-size: 1rem;
  transition: 0.5s;
}

a:hover {
  color: var(--dark);
}

.button {
  margin-top: 10px;
  width: 100%;
  color: var(--light);
  font-family: "Poppins", sans-serif;
  cursor: pointer;
  background: #21a2b0;
}

@media screen and (max-width: 1080px) {
  .container {
    grid-gap: 5rem;
  }
}

@media screen and (max-width: 1000px) {
  form {
    width: 300px;
  }

  .card-login h2 {
    font-size: 2rem;
    margin: 8px 0 30px;
  }
}

@media screen and (max-width: 900px) {
  .container {
    grid-template-columns: 1fr;
  }

  .card-login {
    justify-content: center;
  }
}
</style>
