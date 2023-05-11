let user;

// Create an anonymous credential
const credentials = Realm.Credentials.anonymous();

try {
  user = await app.logIn(credentials);
} catch (error) {
  console.error("Failed to log in", error.message);
}
