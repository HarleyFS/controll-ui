import { computed, ref } from "vue";
import { defineStore } from "pinia";
import type Doctor from "@/interfaces/doctor/IDoctorList";
import DoctorService from "@/services/DoctorService";

export const useDoctorStore = defineStore("doctor", () => {
  const doctorList = ref<Array<Doctor>>([]);
  const currentDoctor = ref<Doctor>();
  const totalDoctors = ref(2);

  async function getDoctorList() {
    await DoctorService.getOneDoctorList().then(
      (reponse) => (doctorList.value = reponse.data.content)
    );
  }

  function setCurrentDoctor(doctor: Doctor) {
    currentDoctor.value = doctor;
  }

  const getCurrentDoctor = computed(() => currentDoctor);

  return {
    doctorList,
    currentDoctor,
    getDoctorList,
    setCurrentDoctor,
    getCurrentDoctor,
    totalDoctors,
  };
});
