import React, {useState, useEffect} from 'react';
import {Credentials} from 'realm';
import {useApp, useAuth} from '@realm/react';

import {Button} from '../../utility-components/Button';

export const LoginWithApiKey = () => {
  const app = useApp();

  const [apiKey, setApiKey] = useState('');
  const {logInWithApiKey} = useAuth();

  // TODO: I don't think this will work. UserProvider picks up on the login
  // and unmounts the Login component. Maybe need to put a static server API key
  // direclty in a value/secret?
  // useEffect(() => {
  //   async function getApiKey() {
  //     const testCredentials = Credentials.anonymous();
  //     const testUser = await app.logIn(testCredentials);
  //     // TODO: Figure out how to delete this key too?
  //     // TODO: Need to either get admin API private keys if someone still has
  //     // them, or have someone create a new admin API key. I don't have
  //     // access to Bushicorp to create one.
  //     const serverApiKey = (await testUser.callFunction(
  //       'createApiKey',
  //     )) as string;

  //     await testUser.logOut();

  //     setApiKey(serverApiKey);
  //   }

  //   getApiKey();
  // }, []);

  return (
    <Button
      title="API key"
      onPress={() => {
        logInWithApiKey(apiKey);
      }}
    />
  );
};
