import React from 'react';
import {useUser} from '@realm/react';
import Realm from 'realm';

function LinkUserIdentities({username, password}) {
  const user = useUser();

  const linkIdentities = async credentials => {
    await user.linkCredentials(credentials);
  };

  // ...
}
