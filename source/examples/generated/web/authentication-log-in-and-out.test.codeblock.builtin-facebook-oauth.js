// The redirect URI should be on the same domain as this app and
// specified in the auth provider configuration.
const redirectUri = "https://app.example.com/handleOAuthLogin";
const credentials = Realm.Credentials.facebook(redirectUri);

// Calling logIn() opens a Facebook authentication screen in a new window.
app.logIn(credentials).then((user) => {
  // The logIn() promise will not resolve until you call `handleAuthRedirect()`
  // from the new window after the user has successfully authenticated.
  console.log(`Logged in with id: ${user.id}`);
});

// When the user is redirected back to your app, handle the redirect to
// save the user's access token and close the redirect window. This
// returns focus to the original application window and automatically
// logs the user in.
Realm.handleAuthRedirect();
