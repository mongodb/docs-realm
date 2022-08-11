import Head from 'next/head'

const REALM_API_KEY = "Oz4L6VwcAHpYEP2ojbYkjKDsgUjR0jQ3vXGSliAtkA6boTnlXSbeCxuOtJCfO4rc";

//client test
import * as Realm from "realm-web";

const app = new Realm.App({ id: "react-app-yoewz" });
/*
// Create an anonymous credential
const credentials = Realm.Credentials.anonymous();
// Authenticate the user
async function awaitLogIn(credentials) {
  const user = await app.logIn(credentials);
  return user;
}

  const user = awaitLogIn(credentials);
  const mongo = user.mongoClient("mongodb-atlas");
  const plants = mongo.db("tracker").collection("plants");

  async function insertPlant() {
    const result = await plants.insertOne({
      name: "lily of the valley",
      sunlight: "full",
      color: "white",
      type: "perennial",
      _partition: "Store 47",
    });
    console.log(result);
  }
  
insertPlant();
*/

// Create an anonymous credential
const credentials = Realm.Credentials.anonymous();
// Authenticate the user
async function awaitLogIn(credentials) {
 const user = await app.logIn(credentials);
 console.assert(user.id === app.currentUser.id);
 const mongo = user.mongoClient("mongodb-atlas");
 const plants = mongo.db("tracker").collection("plants");
 
async function insertPlant() {
 const result = await plants.insertOne({
   name: "lily of the valley",
   sunlight: "full",
   color: "white",
   type: "perennial",
   _partition: "Store 47",
  });
  console.log(result);
 }
 insertPlant();
}
 
awaitLogIn(credentials);





/*
const GET_LILY = gql`
query GetLily {
  plants {
    _id
    sunlight
    color
    type
    _partition
  }
}
`;

function Lily() {
  const { loading, error, data } = useQuery(GET_LILY);

  if (loading) return <p>Loading ...</p>;
  if (error) return `Error! ${error.message}`;
  return data.plants._id;
}*/
/*
//client test - graphQL
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  useQuery,
} from "@apollo/client";
import gql from "graphql-tag";

// Gets a valid Realm user access token to authenticate requests
async function getValidAccessToken() {
  // Guarantee that there's a logged in user with a valid access token
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

// Configure the ApolloClient to connect to your app's GraphQL endpoint
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

// ... code to create the GraphQL client
const AppWithApollo = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

 

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

function Lily() {
  const { loading, error, data } = useQuery(GET_LILY, {
    variables: { name: 'lily of the valley' },
  });
  if (loading) return <p>Loading ...</p>;
  if(error) console.error("Failed to log in", error);
  return data.plants._id;
}
 
Lily();
*/
//server-side rendering
/*
app
     .logIn(
       Realm.Credentials.emailPassword("chloe.ratte@mongodb.com", "abc123")
     )
     .then((user) => {
       setCookie("accessToken", user.accessToken);
       console.log("accessToken", user.accessToken);
     });

//add app?


import cookie from "cookie";
import { request } from "graphql-request";
 
export async function getServerSideProps({
 req: {
   headers: { cookie: authCookie },
 },
}) {
 const cookies = cookie.parse(authCookie);
 const token = cookies["accessToken"];
 
 const query = `
 query {
   task {
     _id
     _partition
     isComplete
     summary
   }
 }
 `;

const requestHeaders = {
  authorization: `Bearer ${token}`,
};
const res = await request({
  url: "https://realm.mongodb.com/api/client/v2.0/app/myappcopy-kecbo/graphql",
  document: query,
  requestHeaders,
});
return {
  props: { data: res },
};
}

function Data({ data: { task } }) {
  return (
    <div>
      <h1>Data from GraphQL</h1>
      <p>
        <b>Summary:</b> {task.summary}
      </p>
      <p>
        <b>isComplete:</b> {task.isComplete ? "yup" : "nope"}
      </p>
    </div>
  );
 }
  
 export default Data;
*/




//static rendering
/*
function Blog({ posts }) {
  return (
    <ul>
      {posts.map((post) => (
        <li>{post.title}</li>
      ))}
    </ul>
  )
}

export async function getStaticProps() {
  const apiKey = REALM_API_KEY;
  const credentials = Realm.Credentials.serverApiKey(apiKey);
  let tempUser;
   try {
     // Authenticate the user
    tempUser = await app.logIn(credentials);
     // `App.currentUser` updates to match the logged in user
     console.assert(user.id === app.currentUser.id);
   } catch (err) {
     console.error("Failed to log in", err);
   }
  const user = tempUser;
  console.log("Successfully logged in!", user);
   
  const mongo = user.mongoClient("mongodb-atlas");
  const plants = mongo.db("tracker").collection("plants");
  
  const lily = plants.findOne({name: "lily of the valley"});
  
   // By returning { props: { lily } }, the Blog component
   // will receive `lily` as a prop at build time
   return {
      props: {
         data: lily
      },
  }
}
function Lily({ data: { lily } }) {
 return (
   <div>
     <h1>Data from GraphQL</h1>
     <p>
       <b>ID:</b> {lily._id}
     </p>
     <p>
       <b>Needed sunlight:</b> {lily.sunlight}
     </p>
   </div>
 );
}
 
export default Lily;*/
  
export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className="description">
          Get started by editing <code>pages/index.js</code>
        </p>

        <div className="grid">
          <a href="https://nextjs.org/docs" className="card">
            <h3>Documentation &rarr;</h3>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className="card">
            <h3>Learn &rarr;</h3>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/master/examples"
            className="card"
          >
            <h3>Examples &rarr;</h3>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/import?filter=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className="card"
          >
            <h3>Deploy &rarr;</h3>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>

      <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel" className="logo" />
        </a>
      </footer>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer img {
          margin-left: 0.5rem;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .title a {
          color: #0070f3;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
        }

        .title,
        .description {
          text-align: center;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }

        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }

        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;

          max-width: 800px;
          margin-top: 3rem;
        }

        .card {
          margin: 1rem;
          flex-basis: 45%;
          padding: 1.5rem;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
        }

        .card:hover,
        .card:focus,
        .card:active {
          color: #0070f3;
          border-color: #0070f3;
        }

        .card h3 {
          margin: 0 0 1rem 0;
          font-size: 1.5rem;
        }

        .card p {
          margin: 0;
          font-size: 1.25rem;
          line-height: 1.5;
        }

        .logo {
          height: 1em;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}
