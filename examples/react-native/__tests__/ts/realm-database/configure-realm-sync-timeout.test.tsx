// :snippet-start: timeout-config
import React from 'react';
import {AppProvider, createRealmContext, UserProvider} from '@realm/react';
// :remove-start:
import {useEffect} from 'react';
import Realm from 'realm';
import {render, waitFor} from '@testing-library/react-native';
import {useApp} from '@realm/react';
import {Text} from 'react-native';

const APP_ID = 'js-flexible-oseso';
let numberOfProfiles: number;
class Profile extends Realm.Object<Profile> {
  _id!: Realm.BSON.UUID;
  name!: string;

  static schema = {
    name: 'Profile',
    primaryKey: '_id',
    properties: {
      _id: 'uuid',
      name: 'string',
    },
  };
}
// :remove-end:

const realmContext = createRealmContext({
  schema: [Profile],
});
const {RealmProvider} = realmContext;

function AppWrapperTimeoutSync() {
  const realmAccessBehavior: Realm.OpenRealmBehaviorConfiguration = {
    type: Realm.OpenRealmBehaviorType.DownloadBeforeOpen,
    timeOutBehavior: Realm.OpenRealmTimeOutBehavior.OpenLocalRealm,
    timeOut: 1000,
  };

  return (
    <AppProvider id={APP_ID}>
      <UserProvider fallback={LogIn}>
        <RealmProvider
          sync={{
            flexible: true,
            newRealmFileBehavior: realmAccessBehavior,
            existingRealmFileBehavior: realmAccessBehavior,
            onError: console.error,
          }}>
          <RestOfApp />
        </RealmProvider>
      </UserProvider>
    </AppProvider>
  );
}
// :snippet-end:

function LogIn() {
  const app = useApp();

  useEffect(() => {
    app.logIn(Realm.Credentials.anonymous());
  }, []);

  return <></>;
}

function RestOfApp() {
  const {useRealm, useQuery} = realmContext;
  const realm = useRealm();
  const profiles = useQuery(Profile);

  useEffect(() => {
    realm.subscriptions.update((subs, myRealm) => {
      subs.add(myRealm.objects('Profile'));
    });
  });

  // Check profile length to confirm this is the same sync realm as
  // that set up in beforeEach(). Then set numberOfProfiles to the length.
  if (profiles.length) {
    numberOfProfiles = profiles.length;
  }

  return (
    <>
      <Text>Rest of the app!</Text>
    </>
  );
}

const app = new Realm.App(APP_ID);
const createConfig = user => {
  return {
    schema: [Profile],
    sync: {
      user: user,
      flexible: true,
      onError: console.error,
    },
  };
};

beforeEach(async () => {
  const user = await app.logIn(Realm.Credentials.anonymous());
  const config = createConfig(user);
  const realm = await Realm.open(config);

  realm.subscriptions.update((subs, myRealm) => {
    subs.add(myRealm.objects('Profile'));
  });

  realm.write(() => {
    // Create a profile object.
    realm.create('Profile', {
      name: 'TestProfile',
      _id: new Realm.BSON.UUID(),
    });
  });

  realm.close();

  await user.logOut();
});

afterEach(async () => {
  const user = await app.logIn(Realm.Credentials.anonymous());
  const config = createConfig(user);
  const realm = await Realm.open(config);

  realm.write(() => {
    // Clean up. Delete all objects in the realm.
    realm.deleteAll();
  });

  numberOfProfiles = 0;

  realm.close();

  await user.logOut();
});

test('Instantiate AppWrapperTimeoutSync and test sync', async () => {
  render(<AppWrapperTimeoutSync />);

  await waitFor(
    () => {
      expect(numberOfProfiles).toBeGreaterThanOrEqual(1);
    },
    {timeout: 2000},
  );
});
