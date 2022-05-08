import { ExtractAction, ExtractActionEnum, ExtractState } from "./types";

const initialState: ExtractState = {
  extracts: [],
};

function ExtractReducer(
  state = initialState,
  action: ExtractAction
): ExtractState {
  switch (action.type) {
    case ExtractActionEnum.SET_EXTRACTS:
      return { ...state, extracts: action.payload };
    case ExtractActionEnum.ADD_EXTRACT:
      return { ...state, extracts: [...state.extracts, action.payload] };
    case ExtractActionEnum.REMOVE_EXTRACT:
      return {
        ...state,
        extracts: state.extracts.filter(
          (extract) => extract.id !== action.payload.id
        ),
      };
    default:
      return state;
  }
}

export default ExtractReducer;
