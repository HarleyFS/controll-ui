import httpClient from "@/http";
import type User from "@/interfaces/authentication/IUser";
import type Login from "@/interfaces/authentication/ILogin";

class AuthenticationService {
  public register(user: User): Promise<User> {
    return httpClient.post("/register", user);
  }

  public authenticate(login: Login): Promise<Login> {
    return httpClient.post("/login", login);
  }
}

export default new AuthenticationService();
