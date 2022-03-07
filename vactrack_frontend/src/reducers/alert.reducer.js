import { alertConstants } from "../constants";
import { Row, Col, Alert } from "react-bootstrap";

const initialState = {
  success: false,
  error: false,
  clear: false,
  errorMessage: "",
  successMessage: "",
};

export function alert(state = initialState, action) {
  switch (action.type) {
    case alertConstants.SUCCESS:
      return {
        ...state,
        error: false,
        errorMessage: "",
        success: true,
        successMessage: action.message,
      };
    case alertConstants.ERROR:
      return {
        ...state,
        success: false,
        successMessage: "",
        error: true,
        errorMessage: action.message,
      };
    case alertConstants.CLEAR:
      return {};
    default:
      return state;
  }
}
