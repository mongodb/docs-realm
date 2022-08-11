import { useEffect, useState } from "react";
import * as Realm from "realm-web";
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  useQuery,
} from "@apollo/client";
import gql from "graphql-tag";

const REALM_API_KEY =
  "Oz4L6VwcAHpYEP2ojbYkjKDsgUjR0jQ3vXGSliAtkA6boTnlXSbeCxuOtJCfO4rc";

const app = new Realm.App({ id: "react-app-yoewz" });

const plant = {
  name: "lily of the valley",
  sunlight: "full",
  color: "white",
  type: "perennial",
  _partition: "Store 47",
};

async function getValidAccessToken(app) {
  // Create an anonymous credential
  if (!app.currentUser) {
    // If no user is logged in, log in an anonymous user. The logged in user will have a valid
    // access token.
    await app.logIn(Realm.Credentials.anonymous());
  } else {
    // An already logged in user's access token might be stale. To guarantee that the token is
    // valid, we refresh the user's custom data which also refreshes their access token.
    await app.currentUser.refreshCustomData();
  }
  return app.currentUser.accessToken;
}

const client = new ApolloClient({
  link: new HttpLink({
    uri: `https://realm.mongodb.com/api/client/v2.0/app/${"react-app-yoewz"}/graphql`,
    // We define a custom fetch handler for the Apollo client that lets us authenticate GraphQL requests.
    // The function intercepts every Apollo HTTP request and adds an Authorization header with a valid
    // access token before sending the request.
    fetch: async (uri, options) => {
      const accessToken = await getValidAccessToken();
      options.headers.Authorization = `Bearer ${accessToken}`;
      return fetch(uri, options);
    },
  }),
  cache: new InMemoryCache(),
});

function makeApolloClient(app) {
  const graphqlUri = `https://realm.mongodb.com/api/client/v2.0/app/${"react-app-yoewz"}/graphql`;

  const client = new ApolloClient({
    link: new HttpLink({
      uri: graphqlUri,
    }),
    cache: new InMemoryCache(),
  });
}

function getPlants() {
  const mongo = app.currentUser.mongoClient("mongodb-atlas");
  const plants = mongo.db("tracker").collection("plants");
  return plants;
}

async function findPlant(plants, name) {
  const GET_LILY = gql`
    query GetLily($name: String!) {
      plants(name: $name) {
        _id
        sunlight
        color
        type
        _partition
      }
    }
  `;

async function Run() {
  const user = makeApolloClient(app);
  const plants = getPlants();
  const result = await findPlant(plants, "lily of the valley");
  return result;
}
const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};
export default function Home() {
  const [plant, setPlant] = useState();
  useEffect(() => {
    (async () => {
      await sleep(3000);
      const result = await Run();
      setPlant(result);
    })();
  }, []);
  return (
    <ApolloProvider client={client}>
        function Lilies(){ 
         const { loading, error, data } = useQuery(GET_LILY, {
           variables: { name },
         });
         if (loading) return <p>Loading ...</p>;
         if (error) console.error("Failed to log in", error);
        }
      <div>
        {plant ? (
          <div>
            <p>{plant.name}</p>
            <p>{plant.color}</p>
          </div>
        ) : (
          "no plant"
        )}
      </div>
    </ApolloProvider>
  );
}
