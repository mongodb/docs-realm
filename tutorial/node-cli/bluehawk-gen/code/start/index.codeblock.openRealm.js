async function openRealm(partitionKey) {
  const config = {
    schema: [schemas.TaskSchema, schemas.UserSchema, schemas.ProjectSchema],
    sync: {
      user: users.getAuthedUser(),
      partitionValue: partitionKey,
    },
  };
  // // TODO: open a realm with these configuration settings.
}