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
