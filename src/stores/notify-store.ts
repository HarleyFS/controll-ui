import { reactive } from "vue";
import { defineStore } from "pinia";
import type INotification from "@/interfaces/INotification";

export const userNotifyStore = defineStore("notify", () => {
  const notifications = reactive<Array<INotification>>([]);

  function notify(newNotification: INotification) {
    newNotification.id = new Date().getTime();
    notifications.push(newNotification);
    setTimeout(() => {
      const notification = notifications.filter(
        (n) => n.id == newNotification.id
      );
      const index = notifications.indexOf(notification[0]);
      notifications.splice(index, 1);
    }, 3000);
  }

  return { notifications, notify };
});
