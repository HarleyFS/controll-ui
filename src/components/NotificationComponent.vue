<template>
  <div class="notifications">
    <div
      class="notification"
      :class="messageType[notification.type]"
      v-for="notification in notifications"
      :key="notification.type"
    >
      <button class="delete"></button>
      {{ notification.text }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { userNotifyStore } from "@/stores/notify-store";
import { computed, reactive } from "vue";
import { NotificationTypeEnum } from "@/enums/NotificationTypeEnum";
const store = userNotifyStore();

const notifications = computed(() => store.notifications);

const messageType = reactive({
  [NotificationTypeEnum.SUCCESS]: "is-success",
  [NotificationTypeEnum.INFO]: "is-warning",
  [NotificationTypeEnum.ERROR]: "is-danger",
});
</script>

<style scoped>
.notifications {
  position: absolute;
  right: 0;
  max-width: 300px;
  z-index: 99;
  padding: 8px;
  margin-top: 0.75rem;
}
</style>
