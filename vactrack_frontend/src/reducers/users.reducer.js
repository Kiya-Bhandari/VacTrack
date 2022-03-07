import { userConstants } from "../constants";

const initialState = {
  loading: false,
  userId: 0,
  otpSuccessMessage: "",
  otpErrorMessage: "",
  otpVerifyErrorMessage: "",
};

export function users(state = initialState, action) {
  switch (action.type) {
    case userConstants.LOGIN_SUCCESS:
      console.log("userId reducer: ", action.payload);
      return {
        ...state,
        userID: action.payload,
      };
    case userConstants.GETALL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case userConstants.GETALL_SUCCESS:
      return {
        ...state,
        items: action.users,
      };
    case userConstants.GETALL_FAILURE:
      return {
        ...state,
        error: action.error,
      };

    case userConstants.GETOTP_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case userConstants.GETOTP_SUCCESS:
      return {
        loading: false,
        otpSuccessMessage: action.otpSuccessMessage,
      };

    case userConstants.GETOTP_FAILURE:
      return {
        loading: false,
        otpErrorMessage: action.otpErrorMessage,
      };

    case userConstants.VERIFYOTP_REQUEST:
      return {
        ...state,
        loading: true,
        otpSuccessMessage: "",
        otpErrorMessage: "",
      };

    case userConstants.VERIFYOTP_SUCCESS:
      return {
        loading: false,
        otpSuccessMessage: "",
        otpErrorMessage: "",
      };

    case userConstants.VERIFYOTP_FAILURE:
      return {
        loading: false,
        otpVerifyErrorMessage: action.otpVerifyErrorMessage,
        otpSuccessMessage: "",
        otpErrorMessage: "",
      };

    default:
      return state;
  }
}
