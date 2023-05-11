let user;

// Create a custom function credential
const credentials = Realm.Credentials.function({
  username: "ilovemongodb",
});

try {
  user = await app.logIn(credentials);
} catch (error) {
  console.error("Failed to log in", error.message);
}
