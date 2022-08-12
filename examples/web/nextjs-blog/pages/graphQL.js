import { useContext } from "react";
import * as Realm from "realm-web";
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  useQuery,
  gql,
} from "@apollo/client";
import AppServicesContext from "../realm/AppServicesContext";

export default function GraphQLProvider() {
  const app = useContext(AppServicesContext);
  const client = new ApolloClient({
    link: new HttpLink({
      uri: `https://us-east-1.aws.realm.mongodb.com/api/client/v2.0/app/${process.env.NEXT_PUBLIC_APP_ID}/graphql`,
      // We define a custom fetch handler for the Apollo client that lets us authenticate GraphQL requests.
      // The function intercepts every Apollo HTTP request and adds an Authorization header with a valid
      // access token before sending the request.
      fetch: async (uri, options) => {
        const accessToken = app?.currentUser?.accessToken;
        options.headers.Authorization = `Bearer ${accessToken}`;
        return fetch(uri, options);
      },
    }),
    cache: new InMemoryCache(),
  });
  return (
    <ApolloProvider client={client}>
      <GraphQL />
    </ApolloProvider>
  );
}

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

function GraphQL() {
  const { loading, error, data } = useQuery(GET_PLANT, {
    variables: { name: "lily of the valley" },
  });
  if (loading || !data) return <p>Loading ...</p>;
  if (error) console.error("Failed with error:", error);
  console.log(data.plant);
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
