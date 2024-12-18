<template>
  <div class="container">
    <div class="card-login">
      <form @submit.prevent="authenticate">
        <h2 class="title">Login</h2>

        <div class="field">
          <p class="control has-icons-left has-icons-right">
            <input
              class="input"
              type="email"
              placeholder="Email"
              v-model="user.email"
            />
            <span class="icon is-small is-left">
              <i class="fas fa-envelope"></i>
            </span>
          </p>
        </div>

        <div class="field">
          <p class="control has-icons-left">
            <input
              class="input"
              type="password"
              placeholder="Password"
              v-model="user.password"
            />
            <span class="icon is-small is-left">
              <i class="fas fa-lock"></i>
            </span>
          </p>
        </div>

        <router-link to="/recover-password">
          <a>Esqueceu sua senha?</a>
        </router-link>

        <input type="submit" class="button" value="Entrar" />

        <router-link to="/register">
          <input type="submit" class="button" value="Cria uma conta" />
        </router-link>
      </form>
    </div>
  </div>
  <SpinnerComponent v-if="showSpinner" />
</template>

<script lang="ts" setup>
import { ref } from "vue";
import type Login from "@/interfaces/authentication/ILogin";
import AuthenticationService from "@/services/AuthenticationService";
import { userStore } from "@/stores/user-store";
import router from "@/router";
import useNotifierHook from "@/hooks/notifier-hook";
import SpinnerComponent from "@/components/SpinnerComponent.vue";

const user = ref<Login>({
  email: "",
  password: "",
});

const store = userStore();
const { notifyError } = useNotifierHook();
const showSpinner = ref<Boolean>(false);

const authenticate = async (): Promise<void> => {
  showSpinner.value = true;
  await AuthenticationService.authenticate(user.value)
    .then((response) => {
      store.setToken(response.data.token);
      router.push({ name: "dashboard" });
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
