<template>
  <div class="container">
    <div>
      <h2 class="title">
        {{ props.title }} <i :class="icon != null ? icon : ''"></i>
      </h2>
      <p>
        {{ props.message }}
      </p>
      <router-link to="/">
        <i id="icon-success" class="fa-regular fa-circle-check" to="/"></i>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  title: {
    type: String,
    default: "Email enviado!",
  },

  message: {
    type: String,
    default: "",
  },

  icon: {
    type: String,
    default: null,
  },
});
</script>

<style scoped>
.container {
  height: 100vh;
  display: grid;
  justify-content: center;
  display: flex;
  align-items: center;
  text-align: center;
}

div {
  width: 360px;
}

h2 {
  font-size: 2rem;
}

p {
  font-size: 1.25rem;
  margin-bottom: 2rem;
}

#icon-success {
  color: var(--primary);
  font-size: 100px;
  align-self: center;
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
