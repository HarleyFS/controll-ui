import axios, { type AxiosInstance } from "axios";

const httpClientCEP: AxiosInstance = axios.create({
  baseURL: "http://viacep.com.br/ws",
});

class CepService {
  public getAddress(zipCode: String): Promise<any> {
    return httpClientCEP.get(`/${zipCode}/json/`);
  }
}

export default new CepService();
