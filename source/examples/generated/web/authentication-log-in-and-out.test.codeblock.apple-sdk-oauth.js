// Get the ID token from the Apple SDK
AppleID.auth
  .signIn()
  .then(({ id_token }) => {
    // Define credentials with the ID token from the Apple SDK
    const credentials = Realm.Credentials.apple(id_token);
    // Log the user in to your app
    return app.logIn(credentials);
  })
  .then((user) => {
    console.log(`Logged in with id: ${user.id}`);
  });
