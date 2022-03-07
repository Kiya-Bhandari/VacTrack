import { dependentConstants } from "../constants";

const initialState = {
  loading: false,
  dependentId: 0,
  error: "",
  dependents: [],
  vaccineSchedule: [],
};

export function dependent(state = initialState, action) {
  console.log("actionnn:", action);
  switch (action.type) {
    case dependentConstants.REGISTER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case dependentConstants.REGISTER_SUCCESS:
      console.log("depenedent id:", action.payload);
      return {
        ...state,
        loading: false,
        dependentId: action.payload,
        error: "",
      };

    case dependentConstants.REGISTER_FAILURE:
      return {
        ...state,
        loading: false,
        dependentId: action.payload,
        error: action.payload,
      };

    case dependentConstants.GET_DEPENDENTBYID_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case dependentConstants.GET_DEPENDENTBYID_SUCCESS:
      console.log("depenedent schedule:", action.payload);
      return {
        ...state,
        loading: false,
        vaccineSchedule: action.payload,
        error: "",
      };

    case dependentConstants.GET_DEPENDENTBYID_FAILURE:
      return {
        ...state,
        loading: false,
        dependents: action.payload,
        error: action.payload,
      };

    case dependentConstants.GETALL_DEPENDENT_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case dependentConstants.GETALL_DEPENDENT_SUCCESS:
      console.log("depenedent id:", action.payload);
      return {
        ...state,
        loading: false,
        dependents: action.payload,
        error: "",
      };

    case dependentConstants.GETALL_DEPENDENT_FAILURE:
      return {
        ...state,
        loading: false,
        dependents: action.payload,
        error: action.payload,
      };

    default:
      return state;
  }
}
