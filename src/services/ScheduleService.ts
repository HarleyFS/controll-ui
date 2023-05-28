import httpClient from "@/http";
import type Schedule from "@/interfaces/schedule/IScheduleRegister";

class ScheduleService {
  public createSchedule(schedule: Schedule): Promise<any> {
    return httpClient.post("/schedule", schedule);
  }

  public getById(id: Number): Promise<any> {
    return httpClient.get(`/schedule/${id}`);
  }

  public getScheduleList(doctorId: Number, currentDate: Date): Promise<any> {
    return httpClient.get(
      `/schedule?doctorId=${doctorId}&currentDate=${currentDate.toLocaleDateString()}&size=200`
    );
  }

  public deleteScheduleById(id: Number): Promise<any> {
    return httpClient.delete(`/schedule/${id}`);
  }

  public updateSchedule(id: Number, schedule: Schedule): Promise<any> {
    return httpClient.put(`/schedule/${id}`, schedule);
  }

  public getAmountSchedules(doctorId: Number): Promise<any> {
    return httpClient.get(`/schedule/amount?doctorId=${doctorId}`);
  }
}

export default new ScheduleService();
