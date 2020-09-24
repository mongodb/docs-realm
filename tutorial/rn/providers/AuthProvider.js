import React, { useContext, useState, useEffect, useRef } from "react";
import Realm from "realm";
import { Alert } from "react-native";
import { getRealmApp } from "../getRealmApp";

// Access the Realm App.
const app = getRealmApp();

// Create a new Context object that will be provided to descendants of
// the AuthProvider.
const AuthContext = React.createContext(null);

// The AuthProvider is responsible for user management and provides the
// AuthContext value to its descendants. Components under an AuthProvider can
// use the useAuth() hook to access the auth value.
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [projectData, setProjectData] = useState([]);
  const realmRef = useRef(null);

  useEffect(() => {
    if (!user) {
      return;
    }

    const openRealm = async () => {
      const config = {
        sync: {
          user,
          partitionValue: `user=${user.id}`,
        },
      };
      // open a realm with the logged in user's partition value in order
      // to get the projects that the logged in users is a member of

      const userRealm = await Realm.open(config);
      realmRef.current = userRealm;
      const users = userRealm.objects("User");

      if (users[0]) {
        const users = userRealm.objects("User");
        const { memberOf } = users[0];

        setProjectData([...memberOf]);
      } else {
        setProjectData([
          { name: "My Project", partition: `project=${user.id}` },
        ]);
      }

      users.addListener(() => {
        let memberOf = users[0].memberOf;
        setProjectData([...memberOf]);
      });
    };

    openRealm();

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

  // The signIn function takes an email and password and uses the
  // emailPassword authentication provider to log in.
  const signIn = async (email, password) => {
    try {
      const creds = Realm.Credentials.emailPassword(email, password);
      const newUser = await app.logIn(creds);
      setUser(newUser);
    } catch (err) {
      Alert.alert(
        "An error occured while signing in",
        JSON.stringify(err, null, 2)
      );
      console.warn(
        `An error occured while signing in ${JSON.stringify(err, null, 2)}`
      );
    }
  };

  // The signUp function takes an email and password and uses the
  // emailPassword authentication provider to register the user.
  const signUp = async (email, password) => {
    try {
      await app.emailPasswordAuth.registerUser(email, password);
    } catch (err) {
      Alert.alert(
        "An error occured while signing up",
        JSON.stringify(err, null, 2)
      );
      console.warn(
        `An error occured while signing up: ${JSON.stringify(err, null, 2)}`
      );
    }
  };

  // The signUp function calls the logOut function on the currently
  // logged in user
  const signOut = () => {
    if (user == null) {
      console.warn("Not logged in, can't log out!");
      return;
    }
    user.logOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        signUp,
        signIn,
        signOut,
        user,
        projectData, // list of projects the user is a memberOf
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// The useAuth hook can be used by components under an AuthProvider to
// access the auth context value.
const useAuth = () => {
  const auth = useContext(AuthContext);
  if (auth == null) {
    throw new Error("useAuth() called outside of a AuthProvider?");
  }
  return auth;
};

export { AuthProvider, useAuth };
