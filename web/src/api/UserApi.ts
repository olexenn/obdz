import axios, { AxiosResponse } from "axios";

interface ILogin {
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
  role: string;
}

export interface IUser {
  id: number;
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

  static async getAllUsers(token: string): Promise<AxiosResponse<IUser[]>> {
    return axios.get(`${this.url}/all`, {
      headers: {
        Authorization: token,
      },
    });
  }

  static async register(
    username: string,
    password: string,
    firstName: string,
    lastName: string,
    token: string
  ) {
    return axios.post(
      `${this.url}/register`,
      {
        username: username,
        password: password,
        firstName: firstName,
        lastName: lastName,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }

  static async deleteUser(
    userId: number,
    token: string
  ): Promise<AxiosResponse> {
    return axios.delete(`${this.url}/delete`, {
      headers: {
        Authorization: token,
      },
      data: {
        userId: userId,
      },
    });
  }

  static async updateUser(
    userId: number,
    username: string,
    firstName: string,
    lastName: string,
    token: string
  ): Promise<AxiosResponse> {
    return axios.put(
      `${this.url}/update`,

      {
        userId: userId,
        username: username,
        firstName: firstName,
        lastName: lastName,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }
}

export default UserApi;
