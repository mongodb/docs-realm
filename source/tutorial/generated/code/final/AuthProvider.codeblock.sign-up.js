// The signUp function takes an email and password and uses the
// emailPassword authentication provider to register the user.
const signUp = async (email, password) => {
  await app.emailPasswordAuth.registerUser(email, password);
};