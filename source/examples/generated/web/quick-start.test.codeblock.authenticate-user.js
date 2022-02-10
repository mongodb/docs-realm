let user;
// Create an anonymous credential
const credentials = Realm.Credentials.anonymous();
try {
  // Authenticate the user
  user = await app.logIn(credentials);
  // `App.currentUser` updates to match the logged in user
  console.assert(user.id === app.currentUser.id);
} catch (err) {
  console.error("Failed to log in", err);
}
