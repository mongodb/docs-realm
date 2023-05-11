let user: Realm.User | undefined = undefined;

// Create a custom function credential
const credentials = Realm.Credentials.function({
  username: "ilovemongodb",
});

try {
  user = await app.logIn(credentials);
} catch (error) {
  if (error instanceof Error) {
    console.error("Failed to log in", error.message);
  }
}
