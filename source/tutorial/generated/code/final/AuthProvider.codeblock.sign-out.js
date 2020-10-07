// The signOut function calls the logOut function on the currently
// logged in user
const signOut = () => {
  if (user == null) {
    console.warn("Not logged in, can't log out!");
    return;
  }
  user.logOut();
  setUser(null);
};