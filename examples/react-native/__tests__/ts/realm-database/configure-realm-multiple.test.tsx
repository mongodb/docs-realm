// :snippet-start: two-realm-contexts
import React from 'react';
import {AppProvider, UserProvider, RealmProvider} from '@realm/react';
// :remove-start:
import {render, waitFor, fireEvent} from '@testing-library/react-native';
import {Realm, useApp, useRealm} from '@realm/react';
import {Button, View, Text} from 'react-native';

const APP_ID = 'js-flexible-oseso';
const testId = 'test-log-in';
let higherScopedUser: Realm.User | null;
let realm1Schema: string;
let realm2Schema: string;

class Turtle extends Realm.Object {
  _id!: string;
  owner_id!: string;
  name!: string;
  birthDate?: Realm.Mixed;

  static schema = {
    name: 'Turtle',
    properties: {
      _id: 'string',
      name: 'string',
      birthDate: 'mixed',
      owner_id: 'string',
    },
    primaryKey: '_id',
  };
}

class Cat extends Realm.Object<Cat> {
  name!: string;
  birthDate?: Realm.Mixed;

  static schema = {
    name: 'Cat',
    properties: {
      name: 'string',
      birthDate: 'mixed',
    },
  };
}

function AppSectionOne() {
  const app = useApp();
  const realm = useRealm();

  realm1Schema = realm.schema[0].name;

  if (app.id !== APP_ID) {
    throw new Error('Did not instantiate app client');
  }

  return (
    <View>
      <Text>Turtle realm</Text>
    </View>
  );
}

function AppSectionTwo() {
  const app = useApp();
  const realm = useRealm();

  realm2Schema = realm.schema[0].name;

  if (app.id !== APP_ID) {
    throw new Error('Did not instantiate app client');
  }

  return (
    <View>
      <Text>Cat realm</Text>
    </View>
  );
}
// :remove-end:

function TwoRealmsWrapper() {
  return (
    <AppProvider id={APP_ID}>
      <UserProvider fallback={LogIn}>
        {/* This realm uses Flexible Sync. */}
        <RealmProvider schema={[Turtle]} sync={{flexible: true}}>
          <AppSectionOne />
        </RealmProvider>
        {/* This is a separate local-only realm. */}
        <RealmProvider schema={[Cat]}>
          <AppSectionTwo />
        </RealmProvider>
      </UserProvider>
    </AppProvider>
  );
}
// :snippet-end:

function LogIn() {
  const app = useApp();

  async function logInUser() {
    // When anonymous authentication is enabled, users can immediately log
    // into your app without providing any identifying information.
    await app.logIn(Realm.Credentials.anonymous());
    higherScopedUser = app.currentUser; // :remove:
  }

  return (
    <Button
      title='Log In'
      onPress={logInUser}
      testID={testId} // :remove:
    />
  );
}

afterEach(async () => await Realm.App.getApp(APP_ID).currentUser?.logOut());

test('Instantiate SecondRealmProvider correctly', async () => {
  const {findByTestId} = render(<TwoRealmsWrapper />);
  const button = await findByTestId(testId);

  fireEvent.press(button);

  await waitFor(() => {
    expect(higherScopedUser).toBeInstanceOf(Realm.User);
  });

  await waitFor(() => {
    expect(realm1Schema).toBe('Turtle');
  });

  await waitFor(() => {
    expect(realm2Schema).toBe('Cat');
  });
});
