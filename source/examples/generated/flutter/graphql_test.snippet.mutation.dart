// TODO: add mutation code example
final mutation = """
mutation AddCar( \$_id: ObjectId!, \$make: String!) {
  insertOneCar_V1(data: {
    _id: \$_id
    make: \$make
  }) {
    _id
    make
  }
}
""";
final mutationOptions = MutationOptions(
    document: gql(mutation),
    variables: {'_id': ObjectId().toString(), 'make': 'Toyota'});
final mutationRes = await client.mutate(mutationOptions);
print(mutationRes);
