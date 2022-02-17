import * as Realm from "realm-web";
import ReactDOM from "react-dom";

import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  useQuery,
  useMutation,
} from "@apollo/client";
import { MockedProvider } from "@apollo/client/testing";
import gql from "graphql-tag";

import { APP_ID } from "../realm.config.json";

describe("Set up Apollo Client", () => {
  it("Create an Apollo GraphQL Client", () => {
    // :snippet-start: create-apollo-client
    // :uncomment-start:
    // import * as Realm from "realm-web";
    // import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
    // :uncomment-end:

    // Add your Realm App ID
    const graphqlUri = `https://realm.mongodb.com/api/client/v2.0/app/${APP_ID}/graphql`;
    // Local apps should use a local URI!
    // const graphqlUri = `https://us-east-1.aws.stitch.mongodb.com/api/client/v2.0/app/${APP_ID}/graphql`
    // const graphqlUri = `https://eu-west-1.aws.stitch.mongodb.com/api/client/v2.0/app/${APP_ID}/graphql`
    // const graphqlUri = `https://ap-southeast-1.aws.stitch.mongodb.com/api/client/v2.0/app/${APP_ID}/graphql`

    const client = new ApolloClient({
      link: new HttpLink({
        uri: graphqlUri,
      }),
      cache: new InMemoryCache(),
    });
    // :snippet-end:
    // TODO: test in react component
  });

  it("Set up app with user authentication and client", () => {
    // :snippet-start: set-up-user-auth
    // Connect to your MongoDB Realm app
    const app = new Realm.App(APP_ID);

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
        uri: `https://realm.mongodb.com/api/client/v2.0/app/${APP_ID}/graphql`,
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
    // :snippet-end:

    // :snippet-start: add-apollo-client-to-app
    // :uncomment-start:
    // import React from "react";
    // import ReactDOM from "react-dom";
    // import App from "./App";
    // import {
    //   ApolloProvider,
    //   ApolloClient,
    //   HttpLink,
    //   InMemoryCache,
    // } from "@apollo/client";
    // :uncomment-end:

    // ... code to create the GraphQL client
    ReactDOM.render(
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>,
      document.getElementById("root")
    );
    // :snippet-end:
    function App() {
      return (
        <div>
          <p>hello apollo</p>
        </div>
      );
    }

    // TODO: test
  });
});

describe("Queries and mutations", () => {
  // :snippet-start: run-query
  // :uncomment-start:
  // import React from "react";
  // import { useQuery } from "@apollo/client";
  // import gql from "graphql-tag";
  // import MovieList from "./MovieList";
  // :uncomment-end:

  // Must be rendered inside of an ApolloProvider
  function Movies() {
    const { loading, error, data } = useQuery(gql`
        query AllMovies {
          movies {
            _id
            title
            year
            runtime
          }
        }
      `);
    if (loading) {
      return <div>loading</div>;
    }
    if (error) {
      return <div>encountered an error: {error}</div>;
    }
    return <MovieList movies={data.movies} />;
  }
  // :snippet-end:

  // :snippet-start: run-mutation
  // :uncomment-start:
  // import React from "react";
  // import { useMutation } from "@apollo/client";
  // import gql from "graphql-tag";
  // :uncomment-end:

  // Must be rendered inside of an ApolloProvider
  function MovieList({ movies }) {
    const [updateMovieTitle] = useMutation(gql`
      mutation UpdateMovieTitle($oldTitle: String!, $newTitle: String!) {
        updateOneMovie(query: { title: $oldTitle }, set: { title: $newTitle }) {
          title
          year
        }
      }
    `);
    return (
      <ul>
        {movies.map((movie) => (
          <li key={movie._id}>
            <div>{movie.title}</div>
            <button
              onClick={() =>
                updateMovieTitle({
                  variables: {
                    oldTitle: movie.title,
                    newTitle: "Some New Title",
                  },
                })
              }
            >
              Update Title
            </button>
          </li>
        ))}
      </ul>
    );
  }
  // :snippet-end:
  it("Run a Mutation", () => {
    const mocks = [
      {
        request: {
          query: AllMovies,
        },
        result: {
          data: [
            {
              _id: 1,
              name: "Saving Private Ryan",
              year: 1997,
              runtime: 169,
            },
            {
              _id: 2,
              name: "Dunkirk",
              year: 2017,
              runtime: 106,
            },
            {
              _id: 3,
              name: "Defiance",
              year: 2008,
              runtime: 137,
            },
          ],
        },
      },
    ];
    return;
  });

  it("Run a query", () => {});
});
