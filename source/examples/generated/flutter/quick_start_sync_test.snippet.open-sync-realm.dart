Configuration config =
    Configuration.flexibleSync(loggedInUser, [Todo.schema]);
Realm realm = Realm(
  config,
);
