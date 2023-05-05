import httpClient from "@/http";
import type Doctor from "@/interfaces/doctor/IDoctor";

class DoctorService {
  public registerDoctor(doctor: Doctor): Promise<any> {
    return httpClient.post("/doctor", doctor);
  }

  public getById(id: Number): Promise<any> {
    return httpClient.get(`/doctor/${id}`);
  }

  public getOneDoctorList(page: number = 1): Promise<any> {
    return httpClient.get(`/doctor?page=${page}&size=1`);
  }

  public getDoctorList(page: number = 1): Promise<any> {
    page -= 1;
    return httpClient.get(`/doctor?page=${page}&size=10`);
  }

  public deleteDoctorById(id: Number): Promise<any> {
    return httpClient.delete(`/doctor/${id}`);
  }

  public updateDoctor(id: Number, doctor: Doctor): Promise<any> {
    return httpClient.put(`/doctor/${id}`, doctor);
  }

  public getSpecialties(): Promise<any> {
    return httpClient.get("/doctor/specialties");
  }
}

export default new DoctorService();
