// Get 5 cars with most miles
final query = """
query {
  plants(limit: 5) {
    _id
    name
    color
  }
}
""";

final queryOptions = QueryOptions(
  document: gql(query),
);

final queryRes = await client.query(queryOptions);
