// Log the user into the backend app.
// The first time you login, the user must have a network connection.
const getUser = async () => {
  // Check for an existing user.
  // If the user is offline but credentials are
  // cached, this returns the existing user.
  if (app.currentUser) return app.currentUser;
  // If the device has no cached user credentials, log them in.
  const credentials = Realm.Credentials.anonymous();
  return await app.logIn(credentials);
};
