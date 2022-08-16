// :snippet-start: server-side-imports
import nookies from "nookies";
import { ApolloClient, InMemoryCache, HttpLink, gql } from "@apollo/client";
//:snippet-end:

//:snippet-start: function-create
const createClient = (token) =>
  new ApolloClient({
    link: new HttpLink({
      ssrMode: true,
      uri: process.env.NEXT_PUBLIC_GRAPHQL_API_ENDPOINT,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
    cache: new InMemoryCache(),
  });
//:snippet-end:

//:snippet-start: gql-request
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
//:snippet-end:

//:snippet-start: server-side-props
export async function getServerSideProps(context) {
  const { accessToken } = nookies.get(context);
  const client = createClient(accessToken);
  const {
    data: { plant: lily },
  } = await client.query({
    query: GET_PLANT,
    variables: { name: "lily of the valley" },
  });

  return {
    props: { lily },
  };
}
// :snippet-end:

// :snippet-start: render-page
export default function Ssr({ lily }) {
  return (
    <div>
      <h1>Data from Server-Side Rendering</h1>
      {lily ? (
        <div>
          <p>{lily.name}</p>
          <p>{lily.color}</p>
        </div>
      ) : (
        "no plant"
      )}
    </div>
  );
}
// :snippet-end:
