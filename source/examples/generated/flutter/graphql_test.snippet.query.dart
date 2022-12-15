final query = """
query {
  car_V1 {
    _id
    make
  }
}
""";

final queryOptions = QueryOptions(
  document: gql(query),
);

final queryRes = await client.query(queryOptions);
