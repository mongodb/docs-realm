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
