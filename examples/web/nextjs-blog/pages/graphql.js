// :snippet-start: whole-code-ex
// :snippet-start: apollo-imports
import { useContext } from "react";
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  useQuery,
  gql,
} from "@apollo/client";
import AppServicesContext from "../realm/AppServicesContext";
// :snippet-end:

<<<<<<< HEAD
// :snippet-start: apollo-provider
function GraphQLProvider() {
=======
function GraphQLProvider({ children }) {
>>>>>>> 825a22a5bb9d978257e3ec2cbf2d3b5a5002d5f9
  const app = useContext(AppServicesContext);
  const client = new ApolloClient({
    link: new HttpLink({
      uri: process.env.NEXT_PUBLIC_GRAPHQL_API_ENDPOINT,
      // We get the latest access token on each request
      fetch: async (uri, options) => {
        const accessToken = app?.currentUser?.accessToken;
        options.headers.Authorization = `Bearer ${accessToken}`;
        return fetch(uri, options);
      },
    }),
    cache: new InMemoryCache(),
  });
<<<<<<< HEAD
  return (
    <ApolloProvider client={client}>
      <GraphQLConsumer />
    </ApolloProvider>
  );
=======
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
>>>>>>> 825a22a5bb9d978257e3ec2cbf2d3b5a5002d5f9
}
// :snippet-end:

// :snippet-start: mongo-query
const GET_PLANT = gql`
  query Plant($name: String!) {
    plant(query: { name: $name }) {
      _id
      sunlight
      name
      color
      type
      _partition
    }
  }
`;

function GraphQLConsumer() {
  const { loading, error, data } = useQuery(GET_PLANT, {
    variables: { name: "lily of the valley" },
  });
  if (loading || !data) return <p>Loading ...</p>;
  if (error) console.error("Failed with error:", error);
  return (
    <div>
      {data.plant ? (
        <div>
          <p>{data.plant.name}</p>
          <p>{data.plant.color}</p>
        </div>
      ) : (
        "no plant"
      )}
    </div>
  );
}
<<<<<<< HEAD
// :snippet-end:

// :snippet-start: full-graphql-page

const FullGraphQLPage = () => {
  <GraphQLProvider>
    <GraphQLConsumer />
  </GraphQLProvider>;
};
export default FullGraphQLPage;

// :snippet-end:
// :snippet-end:
=======

function FullGraphQLPage() {
  return (
    <GraphQLProvider>
      <GraphQLConsumer />
    </GraphQLProvider>
  );
}
export default FullGraphQLPage;
>>>>>>> 825a22a5bb9d978257e3ec2cbf2d3b5a5002d5f9
