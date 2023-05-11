let user: Realm.User | undefined = undefined;

// Create an anonymous credential
const credentials = Realm.Credentials.anonymous();

try {
  user = await app.logIn(credentials);
} catch (error) {
  if (error instanceof Error) {
    console.error("Failed to log in", error.message);
  }
}
