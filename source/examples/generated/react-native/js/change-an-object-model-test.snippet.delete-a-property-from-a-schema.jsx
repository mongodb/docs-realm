const config = {
  schema: [Person],
  // increment the 'schemaVersion', since 'lastName' has been removed from the schema
  schemaVersion: 2,
};
// pass the configuration object with the updated 'schemaVersion' to createRealmContext()
createRealmContext(config);
