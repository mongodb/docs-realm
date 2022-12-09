// Create a custom jwt credential
const jwt = await authenticateWithExternalSystem();
const credentials = Realm.Credentials.jwt(jwt);
try {
  const user = await app.logIn(credentials);
  console.log("Successfully logged in!", user.id);
  return user;
} catch (err) {
  console.error("Failed to log in", err.message);
}