const handleLogin = async () => {
  setIsLoggingIn(true);
  setError((e) => ({ ...e, password: null }));
  try {
    await app.logIn(Realm.Credentials.emailPassword(email, password));
  } catch (err) {
    handleAuthenticationError(err, setError);
  }
};