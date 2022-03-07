import { authHeader } from "../helpers";
import { GRAPHQL_USER } from "../backend";
import { Query } from "react-apollo";
import { GraphQLClient } from "graphql-request";
import { faRubleSign } from "@fortawesome/free-solid-svg-icons";

export const parentService = {
  registerParent,
  getParentByDoctor,
  deleteParent,
  sendSMS,
  sendMail,
};

const doctorId = localStorage.getItem("id");

async function registerParent(
  firstName,
  lastName,
  phone,
  email,
  isNotify = false
) {
  const graphcms = new GraphQLClient(GRAPHQL_USER);
  try {
    const { createParent } = await graphcms.request(`
    mutation{
        createParent(
            doctorId:${doctorId},
            roleId:2,
            firstName:"${firstName}",
            lastName:"${lastName}",
            phone:"${phone}",
            email:"${email}"
            isNotify:${isNotify}
        ){
          parent {
            id,
            firstName,
            lastName,
            mobile,
            createdAt,
            email
          }
        }
      }`);
    return createParent.parent;
  } catch ({ message }) {
    console.log(message);
    return message;
  }
}

async function getParentByDoctor(dataPerPage, skip) {
  const graphcms = new GraphQLClient(GRAPHQL_USER);
  try {
    const { parentCount, parents } = await graphcms.request(`
    query{
        parentCount:parentByDoctorCount(doctorId:${doctorId}),
        parents:parentByDoctorPages(doctorId:${doctorId},dataPerPage:${dataPerPage},skip:${skip}){
          id,
          firstName,
          lastName,
          mobile,
          email,
          isNotify,
          createdAt
        }
      }
      `);
    return { parentCount, parents };
  } catch ({ message }) {
    console.log(message);
    return message;
  }
}

async function deleteParent(id) {
  const graphcms = new GraphQLClient(GRAPHQL_USER);
  try {
    const { parentId } = await graphcms.request(`
    mutation {
      deleteParent(id: ${id}) {
        parentId
      }
    }
    `);
    return { parentId };
  } catch ({ message }) {
    console.log(message);
    return message;
  }
}

async function sendSMS(phoneNumbers, message) {
  const graphcms = new GraphQLClient(GRAPHQL_USER);
  console.log("phoneNumbers message service:", phoneNumbers, message);
  try {
    const { sendSms } = await graphcms.request(`
    mutation{
        sendSms(
            phoneNumbers:[${phoneNumbers.map((phone) => `"${phone}"`)}],
            message:"${message}"
        ){
          message
        }
      }`);
    return sendSms;
  } catch ({ message }) {
    console.log(message);
    return message;
  }
}

async function sendMail(subject, message, recipientList) {
  const graphcms = new GraphQLClient(GRAPHQL_USER);

  try {
    const { sendMail } = await graphcms.request(`
    mutation{
        sendMail(
            recipientList:[${recipientList.map(
              (recipient) => `"${recipient}"`
            )}],
            subject:"${subject}",
            message:"${message}"
        ){
          message
        }
      }`);
    return sendMail;
  } catch ({ message }) {
    console.log(message);
    return message;
  }
}
