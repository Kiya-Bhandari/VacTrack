import { authHeader } from "../helpers";
import { API, GRAPHQL_USER } from "../backend";
import { Query } from "react-apollo";
import { GraphQLClient } from "graphql-request";

export const userService = {
  // login,
  logout,
  registerDoctorProfile,
  // signup,
  getOtp,
  verifyOtp,
};

// async function login(email, password) {
//   console.log("In Login");
//   const graphcms = new GraphQLClient(GRAPHQL_USER, {});
//   try {
//     const { tokenAuth } = await graphcms.request(`
//       mutation{
//         tokenAuth(email:"${email}", password:"${password}") {
//           success,
//           errors,
//           token,
//           refreshToken
//           user{
//             pk,
//             email
//           }
//         }
//       }`);
//     const { success, errors, token, refreshToken, user } = tokenAuth;
//     if (success) {
//       console.log("token", token);
//       console.log("refreshToken", refreshToken);
//       console.log(tokenAuth);
//       localStorage.setItem("token", token);
//       localStorage.setItem("refreshToken", refreshToken);
//       localStorage.setItem("id", user.pk);
//       return tokenAuth;
//     } else {
//       console.log(errors);
//       return errors;
//     }
//   } catch ({ message }) {
//     console.log(message);
//     return message;
//   }
// }

const doctorId = parseInt(localStorage.getItem("id"));

async function registerDoctorProfile(firstName, lastName, email) {
  const graphcms = new GraphQLClient(GRAPHQL_USER);
  try {
    const { createUpdateDoctorProfile } = await graphcms.request(`
    mutation{
          createUpdateDoctorProfile(
            id:${doctorId},
            firstName:"${firstName}",
            lastName:"${lastName}",
            email:"${email}"
        ){
          doctor {
            firstName,
            email
          }
        }
      }`);
    return createUpdateDoctorProfile.doctor;
  } catch ({ message }) {
    console.log(message);
    return message;
  }
}

function logout() {
  localStorage.removeItem("id");
  localStorage.removeItem("email");
  localStorage.removeItem("firstName");
  localStorage.removeItem("parentId");
  return true;
}

// async function signup(firstname, lastname, email, password) {
//   console.log(firstname, lastname, email, password);
//   const graphcms = new GraphQLClient(GRAPHQL_USER, {});
//   try {
//     const { register } = await graphcms.request(`
//       mutation{
//         register
//           (
//             email:"${email}",
//             password1:"${password}",
//             password2:"${password}",
//             firstName:"${firstname}",
//             lastName:"${lastname}",
//             roleId:"0",
//             username:"${firstname} ${lastname}"
//           )
//           {
//             success,
//             errors,
//           }
//         }`);
//     return register;
//   } catch ({ message }) {
//     console.log(message);
//     return message;
//   }
// }

async function getOtp(phone) {
  console.log(phone);
  const graphcms = new GraphQLClient(GRAPHQL_USER, {});
  try {
    const { message } = await graphcms.request(`
      query{
        message : generateOtp
          (
            phone:"${phone}"
          )
        }`);
    console.log("message :", message);
    return JSON.parse(message);
  } catch ({ message }) {
    console.log(message);
    return message;
  }
}

async function verifyOtp(phone, otp, role) {
  console.log("phone otp : ", phone, otp);
  const graphcms = new GraphQLClient(GRAPHQL_USER, {});
  try {
    const { verifyOtp } = await graphcms.request(`
      mutation{
        verifyOtp
          (
            phone:"${phone}",
            otp:"${otp}",
            roleId:${role}

          ){
            message
          }
        }`);
    console.log("verify otp :", verifyOtp);
    return JSON.parse(verifyOtp.message);
  } catch ({ message }) {
    console.log(message);
    return message;
  }
}
