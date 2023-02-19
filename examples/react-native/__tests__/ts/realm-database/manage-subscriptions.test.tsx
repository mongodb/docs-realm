// :snippet-start: manage-subscriptions
import React from 'react';
import {
  AppProvider,
  UserProvider,
  createRealmContext,
  Realm,
} from '@realm/react';
// :remove-start:
import {useEffect} from 'react';
import {App, Credentials} from 'realm';
import {useApp, useUser} from '@realm/react';
import {render, waitFor} from '@testing-library/react-native';

const APP_ID = 'js-flexible-oseso';
class Cat extends Realm.Object<Cat> {
  _id!: string;
  owner_id!: string;
  name!: string;
  birthDate?: Realm.Mixed;

  static schema = {
    name: 'Cat',
    properties: {
      _id: 'string',
      name: 'string',
      birthDate: 'mixed',
      owner_id: 'string',
    },
    primaryKey: '_id',
  };
}

class Bird extends Realm.Object<Bird> {
  _id!: string;
  owner_id!: string;
  name!: string;
  birthDate?: Realm.Mixed;

  static schema = {
    name: 'Bird',
    properties: {
      _id: 'string',
      name: 'string',
      birthDate: 'mixed',
      owner_id: 'string',
    },
    primaryKey: '_id',
  };
}

const config: Realm.Configuration = {
  // Pass all of your models into the schema value.
  schema: [Cat, Bird],
};
const RealmContext = createRealmContext(config);
const {useRealm} = RealmContext;
let numSubs: number;
// :remove-end:

function AppWrapper() {
  return (
    <AppProvider id={APP_ID}>
      <UserProvider fallback={LogIn}>
        <RealmWrapper>
          <SubscriptionManager />
        </RealmWrapper>
      </UserProvider>
    </AppProvider>
  );
}

function LogIn() {
  const app = useApp();
  console.log('In LogIn');

  useEffect(() => {
    console.log('in effect');
    app.logIn(Credentials.anonymous());
  }, []);

  return <></>;
}

type RealmWrapperProps = {
  children: React.ReactNode;
};

function RealmWrapper({children}: RealmWrapperProps) {
  const {RealmProvider} = RealmContext;
  const user = useUser();
  console.log('In RealmWrapper');

  return (
    <RealmProvider
      sync={{
        flexible: true,
        user: user!,
        initialSubscriptions: {
          update(subs, realm) {
            subs.add(realm.objects('Cat'));
          },
        },
        onError: console.log,
      }}
      fallback={<>{console.log('falling back')}</>}>
      {children}
    </RealmProvider>
  );
}

function SubscriptionManager() {
  const realm = useRealm();
  console.log('in subscription manager');

  useEffect(() => {
    console.log('heello from another effect');
    realm.subscriptions.update((subs, myRealm) => {
      subs.add(myRealm.objects('Cat'));
    });
    numSubs = realm.subscriptions.length;

    console.log('done w the effect');
  });

  return <></>;
}
// :snippet-end:

afterEach(async () => {
  await App.getApp(APP_ID).currentUser?.logOut();
  Realm.deleteFile(config);
});

test('Instantiate AppWrapper and children correctly', async () => {
  render(<AppWrapper />);
  await waitFor(
    () => {
      expect(numSubs).toBe(1);
    },
    {timeout: 5000},
  );
});
