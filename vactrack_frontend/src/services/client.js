import ApolloClient from "apollo-boost";
export const client = new ApolloClient({
  uri: "http://127.0.0.1:8000/api/user/graphql/",
});
