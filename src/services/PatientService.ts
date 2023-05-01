import httpClient from "@/http";
import type Patient from "@/interfaces/patient/IPatient";

class PatientService {
  public registerPatient(patient: Patient): Promise<any> {
    return httpClient.post("/patient", patient);
  }

  public getById(id: Number): Promise<any> {
    return httpClient.get(`/patient/${id}`);
  }

  public getPatientList(page: number, filter: String): Promise<any> {
    page -= 1;
    return httpClient.post(
      `/patient/search?filter=${filter}&page=${page}`,
      filter
    );
  }

  public deletePatientById(id: Number): Promise<any> {
    return httpClient.delete(`/patient/${id}`);
  }

  public updatePatient(id: Number, patient: Patient): Promise<any> {
    return httpClient.put(`/patient/${id}`, patient);
  }
}

export default new PatientService();
