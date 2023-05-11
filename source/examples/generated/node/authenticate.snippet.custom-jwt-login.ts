let user: Realm.User | undefined = undefined;

// Create a custom jwt credential
const jwt = await authenticateWithExternalSystem();
const credentials = Realm.Credentials.jwt(jwt);

try {
  user = await app.logIn(credentials);
} catch (error) {
  if (error instanceof Error) {
    console.error("Failed to log in", error.message);
  }
}
