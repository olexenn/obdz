import axios, { AxiosResponse } from "axios";
import { IUser } from "./UserApi";

export interface IExtract {
  id: number;
  number: string;
  created_at: Date;
  qualification: string;
  applicant_first_name: string;
  applicant_last_name: string;
  description: string;
  suspect: string | null;
  authority: string;
  user: IUser;
}

export interface IAddExtract {
  number: string;
  qualification: string;
  applicantFirstName: string;
  applicantLastName: string;
  description: string;
  suspect?: string;
  authority: string;
  username: string;
}

class ExtractApi {
  private static url = "http://localhost:3001/api/v1/extracts";

  static async getAllExtracts(
    token: string
  ): Promise<AxiosResponse<IExtract[]>> {
    return axios.get(`${this.url}/all`, {
      headers: {
        Authorization: token,
      },
    });
  }

  static async addExtract(
    payload: IAddExtract,
    token: string
  ): Promise<AxiosResponse<IExtract>> {
    return axios.post(`${this.url}/create`, payload, {
      headers: {
        Authorization: token,
      },
    });
  }
}

export default ExtractApi;
