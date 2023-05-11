let user = undefined;

// Create an email/password credential
const credentials = Realm.Credentials.emailPassword(
  "someone@example.com",
  "Pa55w0rd!"
);
try {
  user = await app.logIn(credentials);
} catch (error) {
  console.error("Failed to log in", error.message);
}
