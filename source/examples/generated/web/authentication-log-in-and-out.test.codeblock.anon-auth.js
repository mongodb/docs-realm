async function loginAnonymous() {
  // Create an anonymous credential
  const credentials = Realm.Credentials.anonymous();
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
const user = await loginAnonymous();
console.log("Successfully logged in!", user.id);

