import React from "react";
import { APP_ID } from "../realm.config.json";
import { AppProvider, UserProvider, RealmProvider, useRealm, useUser } from "@realm/react";

export const AppWrapper = () => {
    return (
      <AppProvider id={APP_ID}> {/* pass in your App ID as a prop */}
        <UserProvider>
          <RealmProvider>
            {/* call any app components here */}
          </RealmProvider>
        </UserProvider>
      </AppProvider>
    );
  };
