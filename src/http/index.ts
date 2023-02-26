import { userStore } from "@/stores/user-store";
import axios, { type AxiosInstance } from "axios";

const store = userStore();

const httpClient: AxiosInstance = axios.create({
  baseURL: "http://localhost:8080/controll",
  headers: {
    Authorization: `Bearer ${store.token}`,
  },
});

export default httpClient;
