let user;

// Create a custom jwt credential
const jwt = await authenticateWithExternalSystem();
const credentials = Realm.Credentials.jwt(jwt);

try {
  user = await app.logIn(credentials);
} catch (error) {
  console.error("Failed to log in", error.message);
}
