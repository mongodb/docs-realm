import React from 'react';
import {useAuth} from '@realm/react';

import {Button} from '../../utility-components/Button';

export const LogInWithAnonymous = () => {
  // :snippet-start: login-anonymous
  const {logInWithAnonymous, result} = useAuth();

  const performAnonymousLogin = () => {
    logInWithAnonymous();
  };

  // Handle `result`...
  // :snippet-end:

  return (
    <Button
      testID="log-in-anonymous"
      title="Log in anonymously"
      onPress={() => {
        performAnonymousLogin();
      }}
    />
  );
};
