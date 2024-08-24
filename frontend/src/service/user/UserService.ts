import { IApiService, ApiService } from "../apiService";
import { User } from "../../types/User";
import axios from "axios";

export class UserService {
  private apiService: IApiService;

  constructor() {
    this.apiService = new ApiService();
  }

  async register(user: User.Add): Promise<string> {
    return this.apiService.post("/auth/register", user);
  }

  async login(data: User.Login): Promise<User.LoginResponse> {
    const response: any = await this.apiService.post("/auth/login", data);

    axios.defaults.headers.Authorization = `Bearer ${response}`;
    if (response) {
      localStorage.setItem("user", JSON.stringify(response));
    }
    return response;
  }

  async logout() {
    localStorage.removeItem("user");
  }

  async updateUser(user: User.Entity): Promise<string> {
    const userString = localStorage.getItem("user");
    const userStored = userString ? JSON.parse(userString) : null;

    const response: any = await this.apiService.put(`/users/${user.id}`, user, {
      headers: {
        Authorization: `Bearer ${userStored.token}`,
      },
    });

    if (response) {
      //merge objects
      userStored.username = user.username;

      localStorage.setItem("user", JSON.stringify(userStored));
    }

    return userStored;
  }

  async user(): Promise<User.Entity> {
    const userString = localStorage.getItem("user");
    const userStored = userString ? JSON.parse(userString) : null;

    const response: any = await this.apiService.get(
      `/users/${userStored.username}`,
      {
        headers: {
          Authorization: `Bearer ${userStored.token}`,
        },
      }
    );
    return response.user;
  }
}

export const userService = new UserService();
