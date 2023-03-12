import { ref } from "vue";
import { defineStore } from "pinia";
import type Doctor from "@/interfaces/doctor/IDoctorList";
import DoctorService from "@/services/DoctorService";

export const useDoctorStore = defineStore("doctor", () => {
  const doctorList = ref<Array<Doctor>>([]);

  async function getDoctorList() {
    await DoctorService.getDoctorList().then(
      (reponse) => (doctorList.value = reponse.data.content)
    );
  }

  return { doctorList, getDoctorList };
});
