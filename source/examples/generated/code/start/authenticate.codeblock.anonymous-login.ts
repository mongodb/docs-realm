// Create an anonymous credential
const credentials = Realm.Credentials.anonymous();
try {
  const user = await app.logIn(credentials);
  console.log("Successfully logged in!", user.id);
  return user;
} catch (err) {
  console.error("Failed to log in", err.message);
}