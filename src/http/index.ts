import axios, { type AxiosInstance } from "axios";

const httpClient: AxiosInstance = axios.create({
  baseURL: "http://localhost:8080/controll",
});

export default httpClient;
