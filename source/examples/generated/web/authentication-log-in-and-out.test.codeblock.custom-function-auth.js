async function loginCustomFunction(payload) {
  // Create a Custom Function credential
  const credentials = Realm.Credentials.function(payload);
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
loginCustomFunction({ username: "mongolover" }).then((user) => {
  console.log("Successfully logged in!", user);
});
