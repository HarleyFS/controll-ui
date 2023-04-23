import { defineStore } from "pinia";
import { ref } from "vue";
import type Schedule from "@/interfaces/schedule/ISchedule";
import ScheduleService from "@/services/ScheduleService";

export const useScheduleStore = defineStore("schedule", () => {
  const scheduleList = ref<Array<Schedule>>([]);

  async function getScheduleList() {
    //await ScheduleService.getScheduleList().then(
    //  (reponse) => (scheduleList.value = reponse.data.content)
    //);
  }

  return { scheduleList, getScheduleList };
});
