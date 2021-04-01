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
  // :state-start: final
  const [app, setApp] = React.useState(new Realm.App(appId));
  // :state-end: :state-uncomment-start: start
  // // TODO: Wrap the Realm.App object with React state.
  // :state-uncomment-end:
  React.useEffect(() => {
    setApp(new Realm.App(appId));
  }, [appId]);

  // Wrap the Realm.App object's user state with React state
  const [currentUser, setCurrentUser] = React.useState(app.currentUser);
  async function logIn(credentials) {
    // :state-start: final
    await app.logIn(credentials);
    // :state-end: :state-uncomment-start: start
    // // TODO: Call the logIn() method with the given credentials
    // :state-uncomment-end:
    // If successful, app.currentUser is the user that just logged in
    setCurrentUser(app.currentUser);
  }
  async function logOut() {
    // Log out the currently active user
    // :state-start: final
    await app.currentUser?.logOut();
    // :state-end: :state-uncomment-start: start
    // // TODO: Call the logOut() method on the current user.
    // :state-uncomment-end:
    // If another user was logged in too, they're now the current user.
    // Otherwise, app.currentUser is null.
    // :state-start: final
    setCurrentUser(app.currentUser);
    // :state-end: :state-uncomment-start: start
    // // TODO: Call the setCurrentUser() method on the app's current user.
    // :state-uncomment-end:
  }

  const wrapped = { ...app, currentUser, logIn, logOut };

  return (
    <RealmAppContext.Provider value={wrapped}>
      {children}
    </RealmAppContext.Provider>
  );
};
// :code-block-end:
