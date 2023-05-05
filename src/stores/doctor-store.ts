import { computed, ref } from "vue";
import { defineStore } from "pinia";
import type Doctor from "@/interfaces/doctor/IDoctorList";
import DoctorService from "@/services/DoctorService";

export const useDoctorStore = defineStore("doctor", () => {
  const doctorList = ref<Array<Doctor>>([]);
  const currentDoctor = ref<Doctor>();
  const totalDoctors = ref(2);
  const specialties = ref<Array<String>>();

  async function getDoctorList() {
    await DoctorService.getOneDoctorList().then(
      (reponse) => (doctorList.value = reponse.data.content)
    );
  }

  function setCurrentDoctor(doctor: Doctor) {
    currentDoctor.value = doctor;
  }

  const getCurrentDoctor = computed(() => currentDoctor);

  async function getSpecialties() {
    await DoctorService.getSpecialties().then(
      (response) => (specialties.value = response.data)
    )
  }
  return {
    doctorList,
    currentDoctor,
    getDoctorList,
    setCurrentDoctor,
    getCurrentDoctor,
    totalDoctors,
    getSpecialties,
    specialties,
  };
});
