import { vaccineConstants } from "../constants";
import { vaccineService } from "../services";

export const vaccineActions = {
  getAllVaccine,
  getAllVaccineStatus,
};

function getAllVaccine() {
  return (dispatch) => {
    dispatch(request());

    vaccineService.getAllVaccine().then(
      (allCategory) => {
        dispatch(success(allCategory));
      },
      (error) => {
        dispatch(failure(error.toString()));
      }
    );
  };

  function request() {
    return { type: vaccineConstants.GETALL_VACCINE_REQUEST };
  }
  function success(vaccines) {
    return {
      type: vaccineConstants.GETALL_VACCINE_SUCCESS,
      payload: vaccines,
    };
  }
  function failure(error) {
    return { type: vaccineConstants.GETALL_VACCINE_FAILURE, payload: error };
  }
}

function getAllVaccineStatus() {
  return (dispatch) => {
    dispatch(request());

    vaccineService.getAllVaccineStatus().then(
      (allVaccineStatus) => {
        dispatch(success(allVaccineStatus));
      },
      (error) => {
        dispatch(failure(error.toString()));
      }
    );
  };

  function request() {
    return { type: vaccineConstants.GETALL_VACCINESTATUS_REQUEST };
  }
  function success(vaccineStatus) {
    return {
      type: vaccineConstants.GETALL_VACCINESTATUS_SUCCESS,
      payload: vaccineStatus,
    };
  }
  function failure(error) {
    return {
      type: vaccineConstants.GETALL_VACCINESTATUS_FAILURE,
      payload: error,
    };
  }
}
