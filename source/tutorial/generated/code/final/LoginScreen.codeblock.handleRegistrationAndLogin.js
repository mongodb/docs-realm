const handleRegistrationAndLogin = async () => {
  const isValidEmailAddress = validator.isEmail(email);
  setError((e) => ({ ...e, password: null }));
  if (isValidEmailAddress) {
    try {
      // Register the user and, if successful, log them in
      await app.emailPasswordAuth.registerUser(email, password);
      return await handleLogin();
    } catch (err) {
      handleAuthenticationError(err, setError);
    }
  } else {
    setError((err) => ({ ...err, email: "Email is invalid." }));
  }
};