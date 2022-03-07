import { parentConstants } from "../constants";

const initialState = {
  loading: false,
  parentCount: 0,
  parents: [],
  history: [],
};

export function parent(state = initialState, action) {
  switch (action.type) {
    case parentConstants.PARENT_REGISTER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case parentConstants.PARENT_REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        // parents: state.parents.concat(action.parent),
      };

    case parentConstants.PARENT_REGISTER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    case parentConstants.PARENT_GETALL_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case parentConstants.PARENT_GETALL_SUCCESS:
      return {
        loading: false,
        parentCount: action.parentCount,
        parents: action.parents,
        error: "",
      };

    case parentConstants.PARENT_GETALL_FAILURE:
      return {
        loading: false,
        parents: [],
        error: action.payload,
      };

    case parentConstants.PARENT_DELETE_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case parentConstants.PARENT_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        // parentCount: action.parentCount,
        // parents: action.parents,
        // error: "",
      };

    case parentConstants.PARENT_DELETE_FAILURE:
      return {
        loading: false,
        error: action.payload,
      };

    case parentConstants.SEND_SMS_REQUEST:
    case parentConstants.SEND_SMS_SUCCESS:
    case parentConstants.SEND_SMS_FAILURE:

    case parentConstants.SEND_EMAIL_REQUEST:
    case parentConstants.SEND_EMAIL_SUCCESS:
    case parentConstants.SEND_EMAIL_FAILURE:
    default:
      return state;
  }
}
