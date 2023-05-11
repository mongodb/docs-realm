let user: Realm.User | undefined = undefined;

// Create an email/password credential
const credentials = Realm.Credentials.emailPassword(
  "someone@example.com",
  "Pa55w0rd!"
);
try {
  user = await app.logIn(credentials);
} catch (error) {
  if (error instanceof Error) {
    console.error("Failed to log in", error.message);
  }
}
