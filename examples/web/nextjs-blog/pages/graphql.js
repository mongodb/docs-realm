// :snippet-start: whole-code-ex
// :snippet-start: apollo-imports
import * as Realm from "realm-web";
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  useQuery,
  gql,
} from "@apollo/client";
// :snippet-end:

// :snippet-start: apollo-provider
function GraphQLProvider({ children }) {
  const app = Realm.App.getApp(process.env.NEXT_PUBLIC_APP_ID);
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
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
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
    variables: { name: "daffodil" },
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
// :snippet-end:

// :snippet-start: full-graphql-page
function FullGraphQLPage() {
  return (
    <GraphQLProvider>
      <GraphQLConsumer />
    </GraphQLProvider>
  );
}
export default FullGraphQLPage;

// :snippet-end:
// :snippet-end:
