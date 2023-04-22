import { ref } from "vue";
import { defineStore } from "pinia";
import type Patient from "@/interfaces/patient/IPatientList";
import PatientService from "@/services/PatientService";

export const usePatientStore = defineStore("patient", () => {
  const patientList = ref<Array<Patient>>([]);

  async function setPatientList(list: Array<Patient>) {
    patientList.value = list;
  }

  return { patientList, setPatientList };
});
