final document = """
query {
  car_V1 {
    _id
    make
  }
}
""";

final queryOptions = QueryOptions(
  document: gql(document),
);
final queryRes = await client.query(queryOptions);
