// Create an email/password credential
const credentials = Realm.Credentials.emailPassword(
  "someone@example.com",
  "Pa55w0rd!"
);
try {
  const user = await app.logIn(credentials);
  console.log("Successfully logged in!", user.id);
  return user;
} catch (err) {
  console.error("Failed to log in", err.message);
}
