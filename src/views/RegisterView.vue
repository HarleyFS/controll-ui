<template>
  <div class="container">
    <div class="card-login">
      <form>
        <h2 class="title">Cadastre-se</h2>

        <div class="field">
          <input class="input" type="text" placeholder="Nome" />
        </div>

        <div class="field">
          <input class="input" type="text" placeholder="Sobrenome" />
        </div>

        <div class="field">
          <input class="input" type="email" placeholder="Email" />
        </div>

        <div class="field">
          <input class="input" type="text" placeholder="CPF/CNPJ" />
        </div>

        <div class="field">
          <input class="input" type="password" placeholder="Senha" />
        </div>

        <router-link to="/login">
          <a>Tem uma conta? Conecte-se</a>
        </router-link>

        <router-link to="/register">
          <input type="submit" class="button" value="Cadastrar" />
        </router-link>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {},
});
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
