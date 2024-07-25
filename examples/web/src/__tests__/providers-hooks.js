import React from "react";
import * as Realm from "realm-web";
import { APP_ID } from "../realm.config.json";
import {AppProvider, UserProvider, RealmProvider} from "@realm/react";

export const AppWrapper = () => {
    return (
      <AppProvider id={APP_ID}> {/* pass in your App ID as a prop */}
        <UserProvider>
          <RealmProvider>
            <App />
          </RealmProvider>
        </UserProvider>
      </AppProvider>
    );
  };