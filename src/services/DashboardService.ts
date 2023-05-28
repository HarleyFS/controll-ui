import httpClient from "@/http";

class DashboardService {
  public getDataLineChart(): Promise<any> {
    return httpClient.get("/dashboard");
  }
}

export default new DashboardService();
