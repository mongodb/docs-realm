import TestRenderer from "react-test-renderer";
import { MockedProvider } from "@apollo/client/testing";
import React from "react";
// :snippet-start: import-dependencies-query
// import whichever Apollo hooks you're using
import { useQuery, useMutation } from "@apollo/client";
import gql from "graphql-tag";
// :snippet-end:

// :snippet-start: run-query

const ALL_MOVIES = gql`
  query AllMovies {
    movies {
      _id
      title
      year
      runtime
    }
  }
`;
// Must be rendered inside of an ApolloProvider
function Movies() {
  const { loading, error, data } = useQuery(ALL_MOVIES);
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
const UPDATE_MOVIE_TITLE = gql`
  mutation UpdateMovieTitle($oldTitle: String!, $newTitle: String!) {
    updateOneMovie(query: { title: $oldTitle }, set: { title: $newTitle }) {
      title
      year
    }
  }
`;

// Must be rendered inside of an ApolloProvider
function MovieList({ movies }) {
  const [updateMovieTitle] = useMutation(UPDATE_MOVIE_TITLE);
  return (
    <ul>
      {movies.map((movie) => (
        <li key={movie._id}>
          <div>{movie.title}</div>
          <button
            onClick={() => {
              updateMovieTitle({
                variables: {
                  oldTitle: movie.title,
                  newTitle: "Some New Title",
                },
              });
            }}
          >
            Update Title
          </button>
        </li>
      ))}
    </ul>
  );
}
// :snippet-end:

describe("Queries and mutations", () => {
  const movies = [
    {
      _id: 1,
      title: "Saving Private Ryan",
      year: 1997,
      runtime: 169,
    },
    {
      _id: 2,
      title: "Defiance",
      year: 2008,
      runtime: 137,
    },
    {
      _id: 3,
      title: "Dunkirk",
      year: 2017,
      runtime: 106,
    },
  ];
  let clicked = false;
  const mocks = [
    {
      request: {
        query: ALL_MOVIES,
      },
      result: {
        data: {
          movies,
        },
      },
    },
    {
      request: {
        query: UPDATE_MOVIE_TITLE,
        variables: {
          oldTitle: "Saving Private Ryan",
          newTitle: "Some New Title",
        },
      },
      result: function () {
        clicked = true;
        return {
          data: {
            updateOneMovie: {
              title: "Some New Title",
              year: 1997,
            },
          },
        };
      },
    },
  ];

  const component = TestRenderer.create(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Movies />
    </MockedProvider>
  );
  it("Run a query", async () => {
    const tree = component.toJSON();
    expect(tree.children).toContain("loading");
    await new Promise((resolve) => setTimeout(resolve, 10));
    const divs = await component.root.findAllByType("div");
    expect(divs.length).toBe(3);
  });

  it("Run a mutation", async () => {
    await TestRenderer.act(async () => {
      const buttons = await component.root.findAllByType("button");
      buttons[0].props.onClick();
    });
    await new Promise((resolve) => setTimeout(resolve, 10));
    expect(clicked).toBe(true);
  });
});
