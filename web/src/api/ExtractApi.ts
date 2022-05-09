import { AxiosResponse } from "axios";
import $http from "./axios";

export interface IExtract {
  id: number;
  law_number: number;
  created_at: Date;
  qualification: string;
  applicant_first_name: string;
  applicant_last_name: string;
  description: string;
  suspect: string | null;
  authority: string;
  user_id: number;
  first_name: string;
  last_name: string;
}

export interface IAddExtract {
  law_number: string;
  qualification: string;
  applicant_first_name: string;
  applicant_last_name: string;
  description: string;
  suspect?: string;
  authority: string;
  user_id: number;
}

class ExtractApi {
  static async getAllExtracts(): Promise<AxiosResponse<IExtract[]>> {
    return $http.get("admin/extracts");
  }

  static async addExtract(
    payload: IAddExtract
  ): Promise<AxiosResponse<IExtract>> {
    return $http.post("admin/extracts", { extract: payload });
  }
}

export default ExtractApi;
