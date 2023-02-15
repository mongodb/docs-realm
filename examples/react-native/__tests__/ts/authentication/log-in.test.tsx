// TODO: make test pass

// :snippet-start: log-in-user
import React from 'react';
import {useApp, UserProvider, AppProvider} from '@realm/react';
import {Button} from 'react-native';
// :remove-start:
import Realm from 'realm';
import {render, fireEvent, waitFor} from '@testing-library/react-native';

const APP_ID = 'example-testers-kvjdy';
const testId = 'test-log-in';
let higherScopedUser: Realm.User | null;
// :remove-end:

function AppWrapper() {
  return (
    <AppProvider id={APP_ID}>
      {/* Once the user successfully authenticates,
          the app unmounts the component in the
          `UserProvider.fallback` prop (this component).
          The app then renders the children components
          of `UserProvider`. */}
      <UserProvider fallback={LogIn}>
        {/* Components with access to the user.
            These components only render
            if there's an authenticated user.*/}
        <RestOfApp />
      </UserProvider>
    </AppProvider>
  );
}

function LogIn() {
  const app = useApp();

  // This example uses anonymous authentication.
  // However, you can use any authentication provider
  // to log a user in with this pattern.
  async function logInUser() {
    await app.logIn(Realm.Credentials.anonymous());
    higherScopedUser = app.currentUser; // :remove:
  }

  // TODO: try to see if can make a more compelling return statement
  return (
    <>
      {/* Code to add  */}
      {/* :remove-start  */}
      <Button title='Log In' onPress={logInUser} testID={testId} />
      {/* :remove-end  */}
    </>
  );
}
// :snippet-end:

let restOfAppRendered = false;
function RestOfApp() {
  restOfAppRendered = true;
  return <></>;
}

afterEach(async () => await Realm.App.getApp(APP_ID).currentUser?.logOut());

test('Log in user', async () => {
  const {getByTestId} = render(<AppWrapper />);
  const button = await waitFor(() => getByTestId(testId));
  fireEvent.press(button);
  await waitFor(() => {
    expect(restOfAppRendered).toBe(true);
    expect(higherScopedUser).toBeInstanceOf(Realm.User);
  });
});
