<script setup lang="ts">
import SidebarComponent from "./components/SidebarComponent.vue";
</script>

<template>
  <SidebarComponent>
    <RouterView />
  </SidebarComponent>
</template>

<style>
:root {
  --primary: #2daab8;
  --dark: #18202d;
  --light: #fcffff;
}
</style>
