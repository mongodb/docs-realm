// :snippet-start: server-side
import nookies from "nookies";
import { ApolloClient, InMemoryCache, HttpLink, gql } from "@apollo/client";

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

// :snippet-start: props-page-component
export default function Ssr({ lily }) {
  return (
    <div>
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
