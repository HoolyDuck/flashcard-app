import TokenService from "@/services/tokenService";
import { $host, $authHost } from "@/services/axios/axios";
import jwt_decode from "jwt-decode";

class UserService {
  async login(credentials: { email: string; password: string }): Promise<any> {
    const { data } = await $host.post("user/login", {
      email: credentials.email,
      password: credentials.password,
    });
    TokenService.setToken(data.token);
    return jwt_decode(data.token);
  }

  async logout() {
    TokenService.removeToken();
  }

  async register(credentials: {
    email: string;
    password: string;
  }): Promise<any> {
    const { data } = await $host.post("user/register", {
      email: credentials.email,
      password: credentials.password,
    });
    TokenService.setToken(data.token);
    return jwt_decode(data.token);
  }

  async checkAuth(): Promise<any> {
    if (!TokenService.getToken()) return null;

    const { data } = await $authHost.get("user/auth");
    TokenService.setToken(data.token);
    return jwt_decode(data.token);
  }
}

export default new UserService();
