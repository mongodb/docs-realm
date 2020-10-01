// The signIn function takes an email and password and uses the
// emailPassword authentication provider to log in.
const signIn = async (email, password) => {
  const creds = Realm.Credentials.emailPassword(email, password);
  const newUser = await app.logIn(creds);
  setUser(newUser);
};