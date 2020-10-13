// Create an email/password credential
const credentials = Realm.Credentials.emailPassword("joe.jasper@example.com", "passw0rd");
try {
  const user: Realm.User = await app.logIn(credentials);
  console.log("Successfully logged in!", user.id);
  return user;
} catch(err) {
  console.error("Failed to log in", err.message);
}