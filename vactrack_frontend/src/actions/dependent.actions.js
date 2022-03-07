import { dependentConstants } from "../constants";
import { dependentService } from "../services";

export const dependentActions = {
  registerDependent,
  registerDependentVaccine,
  addOtherDependentVaccine,
  updateDependentVaccine,
  getDependentById,
  getAllDependent,
};

function registerDependent(dependentData) {
  return (dispatch) => {
    dispatch(request());

    dependentService.registerDependent(dependentData).then(
      (dependentId) => {
        dispatch(success(dependentId));
      },
      (error) => {
        dispatch(failure(error.toString()));
      }
    );
  };

  function request() {
    return { type: dependentConstants.REGISTER_REQUEST };
  }
  function success(dependentId) {
    return { type: dependentConstants.REGISTER_SUCCESS, payload: dependentId };
  }
  function failure(error) {
    return { type: dependentConstants.REGISTER_FAILURE, payload: error };
  }
}

function registerDependentVaccine(vaccineDetail) {
  return (dispatch) => {
    dispatch(request());

    dependentService.registerDependentVaccine(vaccineDetail).then(
      (createDependentVaccine) => {
        dispatch(success(createDependentVaccine));
        window.location.href = "/doctor-dashboard/dependent";
      },
      (error) => {
        dispatch(failure(error.toString()));
      }
    );
  };

  function request() {
    return { type: dependentConstants.REGISTER_REQUEST };
  }
  function success(dependentId) {
    return { type: dependentConstants.REGISTER_SUCCESS, payload: dependentId };
  }
  function failure(error) {
    return { type: dependentConstants.REGISTER_FAILURE, payload: error };
  }
}

function addOtherDependentVaccine(vaccineDetail) {
  return (dispatch) => {
    dispatch(request());

    dependentService.registerDependentVaccine(vaccineDetail).then(
      (createDependentVaccine) => {
        dispatch(success(createDependentVaccine));
        dispatch(getDependentById(vaccineDetail.dependentId));
      },
      (error) => {
        dispatch(failure(error.toString()));
      }
    );
  };

  function request() {
    return { type: dependentConstants.REGISTER_REQUEST };
  }
  function success(dependentId) {
    return { type: dependentConstants.REGISTER_SUCCESS, payload: dependentId };
  }
  function failure(error) {
    return { type: dependentConstants.REGISTER_FAILURE, payload: error };
  }
}

function updateDependentVaccine(vaccineDetail, dependentId) {
  return (dispatch) => {
    dispatch(request());

    dependentService.updateDependentVaccine(vaccineDetail).then(
      (updateVaccineSchedule) => {
        dispatch(success(updateVaccineSchedule));
        dispatch(getDependentById(dependentId));
        // dispatch(getAllDependent(localStorage.getItem("parentId")));
        // window.location.href = "/doctor-dashboard/dependent";
      },
      (error) => {
        dispatch(failure(error.toString()));
      }
    );
  };

  function request() {
    return { type: dependentConstants.UPDATE_DEPENDENTVACCINE_REQUEST };
  }
  function success(dependentId) {
    return {
      type: dependentConstants.UPDATE_DEPENDENTVACCINE_SUCCESS,
      payload: dependentId,
    };
  }
  function failure(error) {
    return {
      type: dependentConstants.UPDATE_DEPENDENTVACCINE_FAILURE,
      payload: error,
    };
  }
}

function getDependentById(dependentId) {
  return (dispatch) => {
    dispatch(request());

    dependentService.getDependentById(dependentId).then(
      (vaccineSchedule) => {
        dispatch(success(vaccineSchedule));
      },
      (error) => {
        dispatch(failure(error.toString()));
      }
    );
  };

  function request() {
    return { type: dependentConstants.GET_DEPENDENTBYID_REQUEST };
  }
  function success(vaccineSchedule) {
    return {
      type: dependentConstants.GET_DEPENDENTBYID_SUCCESS,
      payload: vaccineSchedule,
    };
  }
  function failure(error) {
    return {
      type: dependentConstants.GET_DEPENDENTBYID_FAILURE,
      payload: error,
    };
  }
}

function getAllDependent(parentID) {
  return (dispatch) => {
    dispatch(request());

    dependentService.getAllDependent(parentID).then(
      (allDependent) => {
        dispatch(success(allDependent));
      },
      (error) => {
        dispatch(failure(error.toString()));
      }
    );
  };

  function request() {
    return { type: dependentConstants.GETALL_DEPENDENT_REQUEST };
  }
  function success(dependents) {
    return {
      type: dependentConstants.GETALL_DEPENDENT_SUCCESS,
      payload: dependents,
    };
  }
  function failure(error) {
    return {
      type: dependentConstants.GETALL_DEPENDENT_FAILURE,
      payload: error,
    };
  }
}
