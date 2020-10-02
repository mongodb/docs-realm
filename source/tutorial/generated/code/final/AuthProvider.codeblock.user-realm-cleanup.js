  return () => {
    // cleanup function
    const userRealm = realmRef.current;
    if (userRealm) {
      userRealm.close();
      realmRef.current = null;
      setProjectData([]); // set project data to an empty array (this prevents the array from staying in state on logout)
    }
  };
}, [user]);

// :code-block-start: sign-in
// The signIn function takes an email and password and uses the
// emailPassword authentication provider to log in.
const signIn = async (email, password) => {
  const creds = Realm.Credentials.emailPassword(email, password);
  const newUser = await app.logIn(creds);
  setUser(newUser);
};