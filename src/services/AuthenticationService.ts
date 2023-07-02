import httpClient from "@/http/auth";
import type User from "@/interfaces/authentication/IUser";
import type Login from "@/interfaces/authentication/ILogin";
import type Password from "@/interfaces/authentication/IPassword";

class AuthenticationService {
  public register(user: User): Promise<any> {
    return httpClient.post("/register", user);
  }

  public authenticate(login: Login): Promise<any> {
    return httpClient.post("/login", login);
  }

  public recoverPassword(email: String): Promise<any> {
    return httpClient.get(`/recovery/${email}`);
  }

  public resetPassword(password: Password): Promise<any> {
    return httpClient.put("/reset", password);
  }

  public verifyToken(token: String): Promise<any> {
    return httpClient.get(`verify/${token}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}

export default new AuthenticationService();
