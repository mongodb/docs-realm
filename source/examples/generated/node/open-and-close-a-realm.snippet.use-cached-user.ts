// Log user into your App Services App.
// On first login, the user must have a network connection.
const getUser = async () => {
  // If the app is offline, but credentials are
  // cached, return existing user.
  if (app.currentUser) {
    return app.currentUser;
  }

  // If the device has no cached user credentials, log in.
  const credentials = Realm.Credentials.anonymous();
  return await app.logIn(credentials);
};
