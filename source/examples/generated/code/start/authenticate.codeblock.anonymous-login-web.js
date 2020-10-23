async function loginAnonymous() {
    // Create an anonymous credential
    const credentials = Realm.Credentials.anonymous();
    try {
      // Authenticate the user
      const user = await app.logIn(credentials); 
      return user;
    } catch(err) {
      console.error("Failed to log in", err);
    }
  }
  loginAnonymous().then(user => {
    console.log("Successfully logged in!", user)
  })