import httpClient from "@/http";
import type Schedule from "@/interfaces/schedule/IScheduleCreate";

class ScheduleService {
  public createSchedule(schedule: Schedule): Promise<any> {
    return httpClient.post("/schedule", schedule);
  }

  public getById(id: Number): Promise<any> {
    return httpClient.get(`/schedule/${id}`);
  }

  public getScheduleList(): Promise<any> {
    return httpClient.get("/schedule");
  }

  public deleteScheduleById(id: Number): Promise<any> {
    return httpClient.delete(`/schedule/${id}`);
  }

  public updateSchedule(id: Number, schedule: Schedule): Promise<any> {
    return httpClient.put(`/schedule/${id}`, schedule);
  }
}

export default new ScheduleService();
