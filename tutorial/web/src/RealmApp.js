import React from "react";
import * as Realm from "realm-web";

const RealmAppContext = React.createContext();

export const useRealmApp = () => {
  const app = React.useContext(RealmAppContext);
  if (!app) {
    throw new Error(
      `You must call useRealmApp() inside of a <RealmAppProvider />`
    );
  }
  return app;
};

// :code-block-start: realmAppProvider
export const RealmAppProvider = ({ appId, children }) => {
  // :hide-start:
  const [app, setApp] = React.useState(new Realm.App(appId));
  // :replace-with:
  // // TODO: Wrap the Realm.App object with React state.
  // :hide-end: 
  React.useEffect(() => {
    setApp(new Realm.App(appId));
  }, [appId]);
  
  // Wrap the Realm.App object's user state with React state
  const [currentUser, setCurrentUser] = React.useState(app.currentUser);
  async function logIn(credentials) {
    // :hide-start:
    await app.logIn(credentials);
    // :replace-with: 
    // // TODO: Call the logIn() method with the given credentials
    // :hide-end:
    // If successful, app.currentUser is the user that just logged in
    setCurrentUser(app.currentUser);
  }
  async function logOut() {
    // Log out the currently active user
    // :hide-start:
    await app.currentUser?.logOut();
    // :replace-with:
    // // TODO: Call the logOut() method on the current user. 
    // :hide-end:
    // If another user was logged in too, they're now the current user.
    // Otherwise, app.currentUser is null.
    // :hide-start:
    setCurrentUser(app.currentUser);
    // :replace-with:
    // // TODO: Call the setCurrentUser() method on the app's current user.
    // :hide-end:
  }

  const wrapped = { ...app, currentUser, logIn, logOut };
  
  return (
    <RealmAppContext.Provider value={wrapped}>
      {children}
    </RealmAppContext.Provider>
  );
};
// :code-block-end:
