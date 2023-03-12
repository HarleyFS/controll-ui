import httpClient from "@/http";
import type Doctor from "@/interfaces/doctor/IDoctor";

class DoctorService {
  public registerDoctor(doctor: Doctor): Promise<any> {
    return httpClient.post("/doctor", doctor);
  }

  public getById(id: Number): Promise<any> {
    return httpClient.get(`/doctor/${id}`);
  }

  public getDoctorList(): Promise<any> {
    return httpClient.get("/doctor");
  }

  public deleteDoctorById(id: Number): Promise<any> {
    return httpClient.delete(`/doctor/${id}`);
  }

  public updateDoctor(id: Number, doctor: Doctor): Promise<any> {
    return httpClient.put(`/doctor/${id}`, doctor);
  }
}

export default new DoctorService();
