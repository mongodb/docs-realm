// Get the access token from a client application using the Facebook SDK
const accessToken = getFacebookAccessToken();
// Log the user in to your app
const credentials = Realm.Credentials.facebook(accessToken);

app.logIn(credentials).then((user: Realm.User) => {
  console.log(`Logged in with id: ${user.id}`);
});
