<template>
  <NotificationComponent />
  <RouterView />
</template>

<script setup lang="ts">
import NotificationComponent from "./components/NotificationComponent.vue";
</script>

<style>
:root {
  --primary: #2daab8;
  --dark: #18202d;
  --light: #fcffff;
}

.is-ancestor {
  padding-left: 0.75rem;
  padding-top: 0.75rem;
  padding-bottom: 0;
}

.tile.is-parent {
  padding: 0.5rem;
  padding-bottom: 0rem;
}
</style>
