// :snippet-start: use-app
import React from 'react';
import {useApp, useAuth} from '@realm/react';
// :remove-start:
import {App} from 'realm';
import {AppProvider} from '@realm/react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import {View, Button} from 'react-native';

import {APP_ID} from '../../../appServicesConfig';

// function AppWrapper() {
//   return (
//     <View>
//       <AppProvider id={APP_ID}>
//         <MyApp />
//       </AppProvider>
//     </View>
//   );
// }
export const AppWithAuthHook = () => {
  return (
    <View>
      <AppProvider id={APP_ID}>
        <MyApp />
      </AppProvider>
    </View>
  );
}

// :remove-end:
function MyApp() {
  const app = useApp();
  const {logInWithAnonymous, result} = useAuth();

  const performAnonymousLogin = logInWithAnonymous;

  // Handle `result`...
  // :remove-start:
  return (
    <Button
      testID="log-in-anonymous"
      title="Log in anonymously"
      onPress={() => {
        performAnonymousLogin();
      }}
    />
  );
  // :remove-end:
}
// :snippet-end:

//afterEach(async () => await App.get(APP_ID).currentUser?.logOut());

// test('useApp hook works correctly', async () => {
//   const {getByTestId} = render(<AppWithAuthHook />);
//   const button = getByTestId('test-use-auth');
//   fireEvent.press(button);
//   await waitFor(() => expect(App.get(APP_ID).currentUser).not.toBeNull());
// });