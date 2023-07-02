<template>
  <div v-if="!emailSent" class="container">
    <div class="card-login">
      <form @submit.prevent="resetPassword">
        <h2 class="title">Recuperação de senha</h2>
        <p style="margin-bottom: 2rem">
          Informe seu e-mail cadastrado e receba instruções para recuperar seu
          acesso.
        </p>

        <div class="field">
          <p class="control has-icons-left has-icons-right">
            <input
              class="input"
              type="email"
              placeholder="Email"
              v-model="email"
            />
            <span class="icon is-small is-left">
              <i class="fas fa-envelope"></i>
            </span>
          </p>
        </div>

        <input type="submit" class="button" value="Enviar" />
        <router-link to="/login">
          <button class="button">Conecte-se</button>
        </router-link>
      </form>
    </div>
  </div>
  <SuccessView v-else :message="message" />
</template>

<script lang="ts" setup>
import { ref } from "vue";
import AuthenticationService from "@/services/AuthenticationService";
import useNotifierHook from "@/hooks/notifier-hook";
import SuccessView from "./SuccessView.vue";

const { notifyError } = useNotifierHook();

const email = ref<String>("");
const emailSent = ref<Boolean>(false);
const message =
  "Enviamos as instruções para o seu email. Acesso-o e siga as instruções para alterar sua senha.";

async function resetPassword() {
  await AuthenticationService.recoverPassword(email.value)
    .then(() => {
      emailSent.value = true;
    })
    .catch((error) => notifyError(error));
}
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

h2 {
  font-size: 1.5rem;
}

a {
  display: block;
  text-align: right;
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
