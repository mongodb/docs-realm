import React from 'react';
import {useUser} from '@realm/react';
import Realm from 'realm';

interface LinkUserIdentitiesProps {
  username: string;
  password: string;
}

function LinkUserIdentities({username, password}: LinkUserIdentitiesProps) {
  const user = useUser();

  const linkIdentities = async (credentials: Realm.Credentials) => {
    await user.linkCredentials(credentials);
  };

  // ...
}
