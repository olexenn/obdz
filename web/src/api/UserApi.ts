import axios, { AxiosResponse } from "axios";

interface ILogin {
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
  role: string;
}

export interface IUser {
  username: string;
  firstName: string;
  lastName: string;
  profilePicture: string;
}

class UserApi {
  private static url = "http://localhost:3001/api/v1/users";

  static async login(
    username: string,
    password: string
  ): Promise<AxiosResponse<ILogin>> {
    return axios.post<ILogin>(`${this.url}/login`, { username, password });
  }

  static async getInfo(token: string): Promise<AxiosResponse<IUser>> {
    return axios.get(`${this.url}/info`, {
      headers: {
        Authorization: token,
      },
    });
  }
}

export default UserApi;
