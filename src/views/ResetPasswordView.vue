<template>
  <div v-if="!emailSent" class="container">
    <div class="card-login">
      <form @submit.prevent="resetPassword">
        <h2 class="title">Redefinir senha</h2>
        <p style="margin-bottom: 2rem">
          Informe a nova senha nos campos abaixo.
        </p>

        <div class="field">
          <p class="control has-icons-left">
            <input
              class="input"
              type="password"
              placeholder="Nova senha"
              v-model="password.password"
            />
            <span class="icon is-small is-left">
              <i class="fas fa-lock"></i>
            </span>
          </p>
        </div>

        <div class="field">
          <p class="control has-icons-left">
            <input
              class="input"
              type="password"
              placeholder="Confirmar nova senha"
              v-model="password.passwordConfirm"
            />
            <span class="icon is-small is-left">
              <i class="fas fa-lock"></i>
            </span>
          </p>
        </div>

        <input type="submit" class="button" value="Redefinir" />
      </form>
    </div>
  </div>
  <SuccessView v-else :message="message" />
</template>

<script lang="ts" setup>
import { ref } from "vue";
import AuthenticationService from "@/services/AuthenticationService";
import useNotifierHook from "@/hooks/notifier-hook";
import type Password from "@/interfaces/authentication/IPassword";
import router from "@/router";

const { notifyError } = useNotifierHook();

const password = ref<Password>({
  password: "",
  passwordConfirm: "",
  token: router.currentRoute.value.params.token.toString(),
});
const emailSent = ref<Boolean>(false);
const message =
  "Senha alterado com sucesso. Clique no botão abaixo para acesso sua conta ";

async function resetPassword() {
  if (router.currentRoute.value.params.token != null) {
    await AuthenticationService.resetPassword(password.value)
      .then(() => {
        emailSent.value = true;
      })
      .catch((error) => notifyError(error));
  }
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
