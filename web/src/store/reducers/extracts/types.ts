import { IExtract } from "../../../api/ExtractApi";

export interface ExtractState {
  extracts: IExtract[];
}

export enum ExtractActionEnum {
  SET_EXTRACTS = "SET_EXTRACTS",
  ADD_EXTRACT = "ADD_EXTRACT",
  REMOVE_EXTRACT = "REMOVE_EXTRACT",
}

export interface SetExtractsAction {
  type: ExtractActionEnum.SET_EXTRACTS;
  payload: IExtract[];
}

export interface AddExtractAction {
  type: ExtractActionEnum.ADD_EXTRACT;
  payload: IExtract;
}

export interface RemoveExtractAction {
  type: ExtractActionEnum.REMOVE_EXTRACT;
  payload: IExtract;
}

export type ExtractAction =
  | SetExtractsAction
  | AddExtractAction
  | RemoveExtractAction;
