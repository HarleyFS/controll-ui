import { userStore } from "@/stores/user-store";
import axios, { type AxiosInstance } from "axios";

const store = userStore();

const isLogged = store.token != null && store.token.length > 0;

const httpClient: AxiosInstance = axios.create({
  baseURL: "http://localhost:8080/controll",
  headers: {
    ContentType: "application/json",
    Authorization: isLogged ? `Bearer ${store.token}` : "",
  },
});

export default httpClient;
