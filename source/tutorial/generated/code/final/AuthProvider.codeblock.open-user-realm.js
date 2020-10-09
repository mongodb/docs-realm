const config = {
  sync: {
    user,
    partitionValue: `user=${user.id}`,
  },
};

// Open a realm with the logged in user's partition value in order
// to get the projects that the logged in user is a member of
Realm.open(config).then((userRealm) => {
  realmRef.current = userRealm;
  const users = userRealm.objects("User");

  users.addListener(() => {
    // The user custom data object may not have been loaded on
    // the server side yet when a user is first registered.
    if (users.length === 0) {
      setProjectData([myProject]);
    } else {
      const { memberOf } = users[0];
      setProjectData([...memberOf]);
    }
  });
});