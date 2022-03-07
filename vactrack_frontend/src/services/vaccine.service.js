import { API } from "../backend";
import { GRAPHQL_VACCINE, GRAPHQL_VACCINE_SCHEDULE } from "../backend";
import { GraphQLClient } from "graphql-request";

export const vaccineService = {
  getAllVaccine,
  getAllVaccineStatus,
};

async function getAllVaccine() {
  const graphcms = new GraphQLClient(GRAPHQL_VACCINE);

  try {
    const { allCategory } = await graphcms.request(`
      query{
       allCategory
        {
          id,
          name,
          vaccine{
            id,
            name,
            dosageNumber
          }

        }
      }
    `);
    console.log("allCategory :", allCategory);
    return allCategory;
  } catch ({ message }) {
    console.log(message);
    return message;
  }
}

async function getAllVaccineStatus() {
  const graphcms = new GraphQLClient(GRAPHQL_VACCINE_SCHEDULE);

  try {
    const { allVaccineStatus } = await graphcms.request(`
    query{
      allVaccineStatus{
        id,
        status
      }
    }
    `);
    console.log("allVaccineStatus :", allVaccineStatus);
    return allVaccineStatus;
  } catch ({ message }) {
    console.log(message);
    return message;
  }
}
