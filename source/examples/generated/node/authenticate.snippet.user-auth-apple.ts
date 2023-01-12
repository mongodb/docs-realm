// Get the access token from a client application using the Apple JS SDK
const idToken: string = getAppleIdToken();
// Log the user in to your app
const credentials = Realm.Credentials.apple(idToken);

app.logIn(credentials).then((user: Realm.User) => {
  console.log(`Logged in with id: ${user.id}`);
});
