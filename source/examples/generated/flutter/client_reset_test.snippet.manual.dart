final config = Configuration.flexibleSync(currentUser, schema,
    clientResetHandler: ManualRecoveryHandler((clientResetError) {
  // Handle manual client reset here.
}));
