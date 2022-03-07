import { GraphQLClient } from "graphql-request";
import { GRAPHQL_DEPENDENT, GRAPHQL_VACCINE_SCHEDULE } from "../backend";

export const dependentService = {
  registerDependent,
  registerDependentVaccine,
  updateDependentVaccine,
  getAllDependent,
  getDependentById,
};

async function registerDependent(dependentData) {
  console.log("dependent Data : ", dependentData);
  const {
    bloodGroup,
    dob,
    firstName,
    lastName,
    gender,
    imagePreviewUrl,
    parentId,
  } = dependentData;
  const graphcms = new GraphQLClient(GRAPHQL_DEPENDENT);
  try {
    const { createDependent } = await graphcms.request(`
    mutation{
      createDependent
      (
        bloodGroup:"${bloodGroup}",
        dob:"${dob}",
        firstName:"${firstName}",
        lastName:"${lastName}",
        gender:"${gender}",
        parentId:${parentId},
        imageUrl:"${imagePreviewUrl}"
      )
      {
        dependent{id}
      }
    }
  `);
    return createDependent.dependent.id;
    console.log(" dependent id:", createDependent.dependent.id);
  } catch ({ message }) {
    console.log(message);
    return message;
  }
}

async function registerDependentVaccine(vaccineDetail) {
  console.log("dependent vaccine : ", vaccineDetail);
  const { dependentId, vaccineId, doseNumber, doseDateTime, category, status } =
    vaccineDetail;
  const graphcms = new GraphQLClient(GRAPHQL_VACCINE_SCHEDULE);

  try {
    const { createDependentVaccine } = await graphcms.request(`
    mutation{
      createVaccineSchedule(beneficiaryId:${dependentId},
      doseDatetime:"${doseDateTime}",
      doseNumber:${doseNumber},
      category:${category},
      statusId:${status},
      vaccineId:${vaccineId}){
        vaccineSchedule {
          id
        },
      }
      
    }
  `);
    return createDependentVaccine;
  } catch ({ message }) {
    console.log(message);
    return message;
  }
}

async function updateDependentVaccine(vaccineDetail) {
  console.log("dependent vaccine : ", vaccineDetail);
  const { id, doseDateTime, status } = vaccineDetail;
  const graphcms = new GraphQLClient(GRAPHQL_VACCINE_SCHEDULE);

  try {
    const { updateVaccineSchedule } = await graphcms.request(`
    mutation{
      updateVaccineSchedule(
        id:${id},
        doseDatetime:"${doseDateTime}",
        status:"${status}"
      ){
        vaccineSchedule {
          id
        },
      }

    }
  `);
    return updateVaccineSchedule;
  } catch ({ message }) {
    console.log(message);
    return message;
  }
}

async function getAllDependent(parentId) {
  const graphcms = new GraphQLClient(GRAPHQL_DEPENDENT);
  try {
    const { userById } = await graphcms.request(`
    query{
      userById(id:${parentId}){
       dependent{
         id,
         firstName,
         lastName,
         dob,
         bloodGroup,
         imageUrl,
         gender,
         isNotify
       }
      }
     }
    `);
    console.log("allDependent :", userById);
    return userById.dependent;
  } catch ({ message }) {
    console.log(message);
    return message;
  }
}

async function getDependentById(dependentId) {
  const graphcms = new GraphQLClient(GRAPHQL_DEPENDENT);
  try {
    const { dependentById } = await graphcms.request(`
    query{
      dependentById(id:${dependentId}){
        vaccineSchedule{
          id,
          doseNumber,
          doseDatetime,
          statusId{
            id,
            status
          },
          vaccineId{
            id,
            name
          }
        }
        
      }
    }
    `);
    console.log("dependent by id :", dependentById);
    return dependentById.vaccineSchedule;
  } catch ({ message }) {
    console.log(message);
    return message;
  }
}
