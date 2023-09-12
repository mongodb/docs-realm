import React, {useEffect} from 'react';
import Realm, {Credentials} from 'realm';
import {AppProvider, UserProvider, RealmProvider, useApp} from '@realm/react';

import {APP_ID} from '../../../appServicesConfig';

import {Bird} from './models/Bird';

import {Unsubscribe} from './Unsubscribe';
import {AlwaysWait} from './AlwaysWait';
import {WaitFirstTime} from './WaitFirstTime';

function LogIn() {
  const app = useApp();

  useEffect(() => {
    app.logIn(Credentials.anonymous());
  }, []);

  return <></>;
}

// :snippet-start: initial-subscriptions
export const SubscribeApiExamples = () => {
  return (
    <AppProvider id={APP_ID}>
      <UserProvider fallback={LogIn}>
        <RealmProvider
          schema={[Bird]}
          sync={{
            flexible: true,
            initialSubscriptions: {
              update: (subs, realm) => {
                subs.add(realm.objects(Bird), {name: 'Initial birds'});
              },
              rerunOnOpen: true,
            },
          }}>
          {/* ...work with realm data in nested components. */}
          {/* :remove-start: */}
          <WaitFirstTime />
          <AlwaysWait />
          <Unsubscribe />
          {/* :remove-end: */}
        </RealmProvider>
      </UserProvider>
    </AppProvider>
  );
};
// :snippet-end:
