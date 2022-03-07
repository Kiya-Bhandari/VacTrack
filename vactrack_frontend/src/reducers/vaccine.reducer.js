import { vaccineConstants } from "../constants";

const initialState = {
  loading: false,
  vaccines: [],
  vaccineStatus: [],
  error: "",
};

export function vaccine(state = initialState, action) {
  switch (action.type) {
    case vaccineConstants.GETALL_VACCINE_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case vaccineConstants.GETALL_VACCINE_SUCCESS:
      return {
        ...state,
        loading: false,
        vaccines: action.payload,
        error: "",
      };

    case vaccineConstants.GETALL_VACCINE_FAILURE:
      return {
        loading: false,
        vaccines: [],
        error: action.payload,
      };

    case vaccineConstants.GETALL_VACCINESTATUS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case vaccineConstants.GETALL_VACCINESTATUS_SUCCESS:
      return {
        ...state,
        loading: false,
        vaccineStatus: action.payload,
        error: "",
      };

    case vaccineConstants.GETALL_VACCINESTATUS_FAILURE:
      return {
        loading: false,
        vaccineStatus: [],
        error: action.payload,
      };

    default:
      return state;
  }
}
