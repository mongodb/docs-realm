const config = {
  schema: [Task],
  // :hide-start:
  deleteRealmIfMigrationNeeded: true,
  // :hide-end:
};
export default createRealmContext(config);
