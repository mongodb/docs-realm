// TODO: do i need to create a JS only version?
// :snippet-start: check-upload-download-progress
import React from 'react';
import {SyncedRealmContext} from '../RealmConfig';
const {useRealm} = SyncedRealmContext;
import {Text} from 'react-native';
// :remove-start:
const {RealmProvider} = SyncedRealmContext;
import {AppProvider, UserProvider, useUser} from '@realm/react';
import Realm from 'realm';
import {render, waitFor} from '@testing-library/react-native';
import {useApp} from '@realm/react';
import Profile from '../Models/Profile';

const APP_ID = 'js-flexible-oseso';
function AppWrapper() {
  return (
    <AppProvider id={APP_ID}>
      <UserProvider fallback={<LogIn />}>
        <RealmWrapper>
          <CheckUploadProgress />
        </RealmWrapper>
      </UserProvider>
    </AppProvider>
  );
}

type RealmWrapperProps = {
  children: React.ReactNode;
};

function RealmWrapper({children}: RealmWrapperProps) {
  const user = useUser()!;
  return (
    <RealmProvider
      sync={{
        user,
        flexible: true,
        initialSubscriptions: {
          update(subs, realm) {
            subs.add(realm.objects('Profile'));
          },
        },
        onError: (_, err) => {
          console.log('error is:', err);
        },
      }}>
      {children}
    </RealmProvider>
  );
}

function LogIn() {
  const app = useApp();

  React.useEffect(() => {
    app
      .logIn(Realm.Credentials.anonymous())
      .then(user => console.debug('logged in ', user.id));
  }, []);
  return <></>;
}

let higherScopedRealm: Realm;
let higherScopePercentTransferred: number = 0;

// Note: have to create and wait for this promise because
// otherwise the test fails and exits before all the network connection notifications
// have resolved.
let promiseResolve: (value: unknown) => void;
const promise = new Promise(function (resolve) {
  promiseResolve = resolve;
});
let timesCalled: number = 0;
// :remove-end:

function CheckUploadProgress() {
  console.log('hello from upload component');
  const realm = useRealm();
  higherScopedRealm = realm; // :remove:
  const [uploadProgressPercent, setUploadProgressPercent] = React.useState(0);

  React.useEffect(() => {
    console.log('in use effect');
    const progressNotificationCallback: Realm.ProgressNotificationCallback = (
      transferred,
      transferable,
    ) => {
      console.log('in callback');
      // Convert decimal to percent with no decimals
      // (e.g. 0.6666... -> 67)
      const percentTransferred = parseFloat(
        (transferred / transferable).toFixed(2),
      );

      setUploadProgressPercent(percentTransferred);
      // :remove-start:
      console.log('times called:', timesCalled++);
      if (percentTransferred === 100) {
        promiseResolve(true);
      }
      // :remove-end:
    };

    // Listen for changes to connection state
    realm.syncSession?.addProgressNotification(
      // Realm.ProgressDirection.Upload,
      // Realm.ProgressMode.ReportIndefinitely,
      'upload',
      'reportIndefinitely',
      progressNotificationCallback,
    );

    // Remove the connection listener when component unmounts
    return () =>
      realm.syncSession?.removeProgressNotification(
        progressNotificationCallback,
      );
    // Run useEffect only when component mounts
  }, []);
  // :remove-start:
  console.log('realm', realm);

  // console.log('num objs', realm.objects('Invoice').length);
  // realm.syncSession?.uploadAllLocalChanges();
  // :remove-end:

  return <Text>Percent Uploaded: {uploadProgressPercent} %</Text>;
}
// :snippet-end:

test('Test percent uploaded state', async () => {
  render(<AppWrapper />);

  await waitFor(async () => {
    higherScopedRealm.write(() => {
      higherScopedRealm.create('Profile', {
        _id: new Realm.BSON.UUID(),
        name: 'joey',
      });
      higherScopedRealm.create('Profile', {
        _id: new Realm.BSON.UUID(),
        name: 'steve',
      });
    });
    expect(true).toBe(true);
  });
  await promise.then(res => {
    expect(higherScopePercentTransferred).toBe(100);
    expect(res).toBe(true);
  });
});
