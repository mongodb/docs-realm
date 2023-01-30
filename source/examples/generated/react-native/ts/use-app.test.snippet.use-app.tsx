import React from 'react';
import { useApp } from '@realm/react';
import { Credentials } from 'realm';

function MyApp() {
  const app = useApp();
  function logInAnonymousUser() {
    app.logIn(Credentials.anonymous());
  }
  // ...
}
