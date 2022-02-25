async function loginCustomJwt(jwt) {
  // Create a Custom JWT credential
  const credentials = Realm.Credentials.jwt(jwt);
  try {
    // Authenticate the user
    const user = await app.logIn(credentials);
    // `App.currentUser` updates to match the logged in user
    console.assert(user.id === app.currentUser.id);
    return user;
  } catch (err) {
    console.error("Failed to log in", err);
  }
}
loginCustomJwt("eyJ0eXAi...Q3NJmnU8oP3YkZ8").then((user) => {
  console.log("Successfully logged in!", user);
});
