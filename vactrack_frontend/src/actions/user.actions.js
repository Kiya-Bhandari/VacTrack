import { Route } from "react-router";
import { userConstants } from "../constants";
import { userService } from "../services";
import { alertActions } from "./";
import { navItemActions } from "./";

export const userActions = {
  // login,
  registerDoctorProfile,
  // deleteDoctor,
  // undoDoctor,
  logout,
  // signup,
  getOtp,
  verifyOtp,
};

const Role = {
  DOCTOR: 1,
  PARENT: 2,
};

function registerDoctorProfile(firstName, lastName, email) {
  return (dispatch) => {
    dispatch(request());

    userService.registerDoctorProfile(firstName, lastName, email).then(
      (doctor) => {
        console.log("doctorr:", typeof doctor.email, doctor.email);
        dispatch(success(doctor));
        localStorage.setItem("email", doctor.email);
        localStorage.setItem("firstName", doctor.firstName);

        // dispatch(alertActions.success("Doctor registered"));
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request() {
    return { type: userConstants.DOCTOR_REGISTER_REQUEST };
  }
  function success(doctor) {
    return { type: userConstants.DOCTOR_REGISTER_SUCCESS, doctor };
  }
  function failure(error) {
    return { type: userConstants.DOCTOR_REGISTER_FAILURE, error };
  }
}

// function deleteDoctor(id, dataPerPage, skip) {
//   return (dispatch) => {
//     dispatch(request());

//     userService.deleteDoctor(id).then(
//       (doctor_id) => {
//         dispatch(success(doctor_id));
//         console.log("jken:", dataPerPage, skip);
//         // dispatch(alertActions.success("Parent registered"));
//       },
//       (error) => {
//         dispatch(failure(error.toString()));
//         dispatch(alertActions.error(error.toString()));
//       }
//     );
//   };

//   function request() {
//     return { type: userConstants.DOCTOR_DELETE_REQUEST };
//   }
//   function success(doctor) {
//     return { type: userConstants.DOCTOR_DELETE_SUCCESS, doctor };
//   }
//   function failure(error) {
//     return { type: userConstants.DOCTOR_DELETE_FAILURE, error };
//   }
// }

// function undoDoctor(firstName, lastName, phone, email, dataPerPage, skip) {
//   return (dispatch) => {
//     dispatch(request());

//     userService.registerUser(firstName, lastName, phone, email).then(
//       (parent) => {
//         dispatch(success(parent));
//         dispatch(alertActions.success("Action undone"));
//       },
//       (error) => {
//         dispatch(failure(error.toString()));
//         dispatch(alertActions.error(error.toString()));
//       }
//     );
//   };

//   function request() {
//     return { type: userConstants.DOCTOR_REGISTER_REQUEST };
//   }
//   function success(doctor) {
//     return { type: userConstants.DOCTOR_REGISTER_SUCCESS, doctor };
//   }
//   function failure(error) {
//     return { type: userConstants.DOCTOR_REGISTER_FAILURE, error };
//   }
// }

// function login(username, password) {
//   return (dispatch) => {
//     dispatch(request({ username }));
//     userService.login(username, password).then(
//       (authToken) => {
//         if (authToken["success"]) {
//           // const { user } = authToken;
//           console.log("userId action:", authToken["user"]["pk"]);
//           dispatch(success(authToken["user"]["pk"]));
//           dispatch(navItemActions.authenticatedNavItem);
//           window.location.href = "/dashboard";
//         } else {
//           dispatch(
//             failure(
//               authToken["errors"]["nonFieldErrors"][0]["message"].toString()
//             )
//           );
//           dispatch(
//             alertActions.error(
//               authToken["errors"]["nonFieldErrors"][0]["message"].toString()
//             )
//           );
//         }
//       },
//       (error) => {
//         dispatch(failure(error.toString()));
//         dispatch(alertActions.error(error.toString()));
//       }
//     );
//   };

//   function request(username) {
//     return { type: userConstants.LOGIN_REQUEST, username };
//   }
//   function success(userId) {
//     return { type: userConstants.LOGIN_SUCCESS, payload: userId };
//   }
//   function failure(error) {
//     return { type: userConstants.LOGIN_FAILURE, error };
//   }
// }

function logout() {
  return (dispatch) => {
    userService.logout();
    dispatch(navItemActions.unauthenticatedNavItem);
  };
}

// function signup(firstname, lastname, email, password) {
//   return (dispatch) => {
//     dispatch(request({ firstname }));

//     userService.signup(firstname, lastname, email, password).then(
//       (register) => {
//         if (register["success"]) {
//           dispatch(success());
//           window.location.href = "/signin";
//           dispatch(alertActions.success("Registration successful"));
//         } else {
//           dispatch(failure(register["errors"].toString()));
//           dispatch(
//             alertActions.error(
//               register["errors"]["email"][0]["message"].toString()
//             )
//           );
//         }
//       },
//       (error) => {
//         dispatch(failure(error.toString()));
//         dispatch(alertActions.error(error.toString()));
//       }
//     );
//   };

//   function request(firstname) {
//     return { type: userConstants.REGISTER_REQUEST, firstname };
//   }
//   function success(firstname) {
//     return { type: userConstants.REGISTER_SUCCESS, firstname };
//   }
//   function failure(error) {
//     return { type: userConstants.REGISTER_FAILURE, error };
//   }
// }

function getOtp(phone) {
  return (dispatch) => {
    dispatch(request());

    userService.getOtp(phone).then((message) => {
      console.log("message action:", message);
      if (message.success) {
        dispatch(success(message.success));
        // dispatch(alertActions.success(message.success));
      } else {
        console.log("error msg:", message.error);
        dispatch(failure(message.error));
        // dispatch(alertActions.error(message.error));
      }
    });
  };

  function request() {
    return { type: userConstants.GETOTP_REQUEST };
  }
  function success(otpSuccessMessage) {
    return { type: userConstants.GETOTP_SUCCESS, otpSuccessMessage };
  }
  function failure(otpErrorMessage) {
    return { type: userConstants.GETOTP_FAILURE, otpErrorMessage };
  }
}

function verifyOtp(phone, otp, role) {
  return (dispatch) => {
    dispatch(request());

    userService.verifyOtp(phone, otp, role).then((message) => {
      console.log("verify message action:", message);
      if (message.success) {
        dispatch(success());
        // dispatch(alertActions.success(message.success));
        localStorage.setItem("id", message.id);
        localStorage.setItem("firstName", message.first_name);
        localStorage.setItem("email", message.email);
        if (message.role_id === Role.DOCTOR) {
          window.location.href = "/doctor-dashboard";
        } else {
          window.location.href = "/parent-dashboard";
        }
      } else {
        console.log("error msg:", message.error);
        dispatch(failure(message.error));
        // dispatch(alertActions.error(message.error));
      }
    });
  };
  function request() {
    return { type: userConstants.VERIFYOTP_REQUEST };
  }
  function success() {
    return { type: userConstants.VERIFYOTP_SUCCESS };
  }
  function failure(otpVerifyErrorMessage) {
    return { type: userConstants.VERIFYOTP_FAILURE, otpVerifyErrorMessage };
  }
}

function getAll() {
  return (dispatch) => {
    dispatch(request());

    userService.getAll().then(
      (users) => dispatch(success(users)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request() {
    return { type: userConstants.GETALL_REQUEST };
  }
  function success(users) {
    return { type: userConstants.GETALL_SUCCESS, users };
  }
  function failure(error) {
    return { type: userConstants.GETALL_FAILURE, error };
  }
}

function _delete(id) {
  return (dispatch) => {
    dispatch(request(id));

    userService.delete(id).then(
      (user) => dispatch(success(id)),
      (error) => dispatch(failure(id, error.toString()))
    );
  };

  function request(id) {
    return { type: userConstants.DELETE_REQUEST, id };
  }
  function success(id) {
    return { type: userConstants.DELETE_SUCCESS, id };
  }
  function failure(id, error) {
    return { type: userConstants.DELETE_FAILURE, id, error };
  }
}
