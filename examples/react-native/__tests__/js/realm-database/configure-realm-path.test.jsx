// :snippet-start: configure-realm-path
import React from 'react';
import {AppProvider, createRealmContext, UserProvider} from '@realm/react';
// :remove-start:
import {useEffect} from 'react';
import Realm from 'realm';
import {render, waitFor} from '@testing-library/react-native';
import {useApp} from '@realm/react';
import {Text} from 'react-native';

const APP_ID = 'js-flexible-oseso';
const customBaseFilePath = 'customBasePath';
const customRealmPath = 'customRealmPath';
let higherScopeRealmPath;

class Profile extends Realm.Object {
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
  path: customRealmPath,
  schema: [Profile],
});
const {RealmProvider} = realmContext;

function AppWrapperSync({customBaseFilePath}) {
  return (
    <AppProvider id={APP_ID} baseFilePath={customBaseFilePath}>
      <UserProvider fallback={LogIn}>
        <RealmProvider
          sync={{
            flexible: true,
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
  const {useRealm} = realmContext;
  const realm = useRealm();

  higherScopeRealmPath = realm.path;

  return (
    <>
      <Text testID='text-container'>Rest of the app!</Text>
    </>
  );
}

test('Instantiate AppWrapperSync and test sync', async () => {
  render(<AppWrapperSync customBaseFilePath={customBaseFilePath} />);

  await waitFor(() => {
    expect(higherScopeRealmPath).toEqual(
      `${customBaseFilePath}/${customRealmPath}`,
    );
  });
});
