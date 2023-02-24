import { ref } from "vue";
import { defineStore } from "pinia";

export const userStore = defineStore("user", () => {
  const token = ref(localStorage.getItem("token"));

  function storeToken(tokenJWT: string) {
    localStorage.setItem("token", tokenJWT);
    token.value = tokenJWT;
  }

  return { token, storeToken };
});