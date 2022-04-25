import axios, { AxiosResponse } from "axios";

interface ITokens {
  accessToken: string;
  refreshToken: string;
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
  ): Promise<AxiosResponse<ITokens>> {
    console.log(0);
    return axios.post<ITokens>(`${this.url}/login`, { username, password });
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
