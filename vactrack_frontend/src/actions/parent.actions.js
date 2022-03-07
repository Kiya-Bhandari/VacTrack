import { parentConstants } from "../constants";
import { parentService } from "../services";
import { alertActions } from "./";

export const parentActions = {
  registerParent,
  deleteParent,
  undoParent,
  getParentByDoctor,
  sendSMS,
  sendMail,
};

function registerParent(firstName, lastName, phone, email) {
  return (dispatch) => {
    dispatch(request());

    parentService.registerParent(firstName, lastName, phone, email).then(
      (parent) => {
        dispatch(success(parent));
        // dispatch(alertActions.success("Parent registered"));
      },
      (error) => {
        dispatch(failure(error.toString()));
        // dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request() {
    return { type: parentConstants.PARENT_REGISTER_REQUEST };
  }
  function success(parent) {
    return { type: parentConstants.PARENT_REGISTER_SUCCESS, parent };
  }
  function failure(error) {
    return { type: parentConstants.PARENT_REGISTER_FAILURE, error };
  }
}

function deleteParent(id, dataPerPage, skip) {
  return (dispatch) => {
    dispatch(request());

    parentService.deleteParent(id).then(
      (parent_id) => {
        dispatch(success(parent_id));
        console.log("jken:", dataPerPage, skip);
        dispatch(getParentByDoctor(dataPerPage, skip));
        // dispatch(alertActions.success("Parent registered"));
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request() {
    return { type: parentConstants.PARENT_DELETE_REQUEST };
  }
  function success(parent_id) {
    return { type: parentConstants.PARENT_DELETE_SUCCESS, parent_id };
  }
  function failure(error) {
    return { type: parentConstants.PARENT_DELETE_FAILURE, error };
  }
}

function undoParent(
  firstName,
  lastName,
  phone,
  email,
  isNotify,
  dataPerPage,
  skip
) {
  return (dispatch) => {
    dispatch(request());

    parentService
      .registerParent(firstName, lastName, phone, email, isNotify)
      .then(
        (parent) => {
          dispatch(success(parent));
          dispatch(getParentByDoctor(dataPerPage, skip));
          dispatch(alertActions.success("Action undone"));
        },
        (error) => {
          dispatch(failure(error.toString()));
          dispatch(alertActions.error(error.toString()));
        }
      );
  };

  function request() {
    return { type: parentConstants.PARENT_REGISTER_REQUEST };
  }
  function success(parent) {
    return { type: parentConstants.PARENT_REGISTER_SUCCESS, parent };
  }
  function failure(error) {
    return { type: parentConstants.PARENT_REGISTER_FAILURE, error };
  }
}

function getParentByDoctor(dataPerPage, skip) {
  return (dispatch) => {
    dispatch(request());

    parentService.getParentByDoctor(dataPerPage, skip).then(
      (data) => {
        dispatch(success(data.parentCount, data.parents));
      },
      (error) => {
        dispatch(failure(error.toString()));
      }
    );
  };

  function request() {
    return { type: parentConstants.PARENT_GETALL_REQUEST };
  }
  function success(parentCount, parents) {
    return {
      type: parentConstants.PARENT_GETALL_SUCCESS,
      parentCount,
      parents,
    };
  }
  function failure(error) {
    return { type: parentConstants.PARENT_GETALL_FAILURE, payload: error };
  }
}

function sendSMS(phoneNumbers, message) {
  return (dispatch) => {
    dispatch(request());

    parentService.sendSMS(phoneNumbers, message).then(
      (parent) => {
        dispatch(success(parent));
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request() {
    return { type: parentConstants.SEND_SMS_REQUEST };
  }
  function success() {
    return { type: parentConstants.SEND_SMS_SUCCESS };
  }
  function failure(error) {
    return { type: parentConstants.SEND_SMS_FAILURE, error };
  }
}

function sendMail(subject, message, recipientList) {
  return (dispatch) => {
    dispatch(request());

    parentService.sendMail(subject, message, recipientList).then(
      (parent) => {
        dispatch(success(parent));
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request() {
    return { type: parentConstants.SEND_EMAIL_REQUEST };
  }
  function success() {
    return { type: parentConstants.SEND_EMAIL_SUCCESS };
  }
  function failure(error) {
    return { type: parentConstants.SEND_EMAIL_FAILURE, error };
  }
}
