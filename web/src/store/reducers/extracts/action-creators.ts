import { IExtract } from "../../../api/ExtractApi";
import {
  AddExtractAction,
  ExtractActionEnum,
  RemoveExtractAction,
  SetExtractsAction,
} from "./types";

const ExtractActionCreators = {
  setExtracts: (payload: IExtract[]): SetExtractsAction => ({
    type: ExtractActionEnum.SET_EXTRACTS,
    payload: payload,
  }),

  addExtract: (payload: IExtract): AddExtractAction => ({
    type: ExtractActionEnum.ADD_EXTRACT,
    payload: payload,
  }),

  removeExtract: (payload: IExtract): RemoveExtractAction => ({
    type: ExtractActionEnum.REMOVE_EXTRACT,
    payload: payload,
  }),
};

export default ExtractActionCreators;
