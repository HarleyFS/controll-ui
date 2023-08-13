import axios, { type AxiosInstance } from "axios";

const httpClient: AxiosInstance = axios.create({
  baseURL: "https://service-controll.azurewebsites.net/controll",
  headers: {
    ContentType: "application/json",
  },
});

export default httpClient;
