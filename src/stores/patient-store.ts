import { ref } from "vue";
import { defineStore } from "pinia";
import type Patient from "@/interfaces/patient/IPatientList";
import PatientService from "@/services/PatientService";

export const usePatientStore = defineStore("patient", () => {
  const patientList = ref<Array<Patient>>([]);

  async function getPatientList() {
    await PatientService.getPatientList().then(
      (reponse) => (patientList.value = reponse.data.content)
    );
  }

  return { patientList, getPatientList };
});
