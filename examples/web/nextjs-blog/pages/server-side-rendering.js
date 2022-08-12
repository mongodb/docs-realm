import nookies from "nookies";
import { ApolloClient, InMemoryCache, HttpLink, gql } from "@apollo/client";

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

const createClient = (token) =>
  new ApolloClient({
    link: new HttpLink({
      ssrMode: true,
      uri: `https://realm.mongodb.com/api/client/v2.0/app/${process.env.NEXT_PUBLIC_APP_ID}/graphql`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
    cache: new InMemoryCache(),
  });

export async function getServerSideProps(context) {
  const { accessToken } = nookies.get(context);
  console.log("token::", accessToken);
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
