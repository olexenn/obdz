import axios, { AxiosResponse } from "axios";
import $http from "./axios";

interface ILogin {
  csrf: string;
}

export interface IUser {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  avatar_url: string;
  role: string;
}

class UserApi {
  static async login(
    username: string,
    password: string
  ): Promise<AxiosResponse<ILogin>> {
    //return $http.post<ILogin>('/signin', {username, password})
    return axios.post<ILogin>("http://localhost:3001/signin", {
      username,
      password,
    });
  }

  static async getInfo(): Promise<AxiosResponse<IUser>> {
    return $http.get("/me");
  }

  static async getAllUsers(): Promise<AxiosResponse<IUser[]>> {
    return $http.get("/admin/users");
  }

  static async register(
    username: string,
    password: string,
    firstName: string,
    lastName: string
  ) {
    return $http.post("/admin/users", {
      user: {
        username: username,
        password: password,
        password_confirmation: password,
        first_name: firstName,
        last_name: lastName,
      },
    });
  }

  static async deleteUser(userId: number): Promise<AxiosResponse> {
    return $http.delete(`/admin/users/${userId}`);
  }

  static async updateUser(
    userId: number,
    username: string,
    firstName: string,
    lastName: string
  ): Promise<AxiosResponse> {
    return $http.put(`/admin/users/${userId}`, {
      user: {
        username: username,
        first_name: firstName,
        last_name: lastName,
      },
    });
  }
}

export default UserApi;
