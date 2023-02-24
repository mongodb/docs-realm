// NOTE: not actually testing code examples to be in line with the existing Node.js SDK
// sync tests. Probably should be tested at some future point, but doesn't need
// to occur during this initial @realm/react-ification.
import React from 'react';
import {SyncedRealmContext} from '../RealmConfig';
const {RealmProvider, useRealm} = SyncedRealmContext;
import {AppProvider, UserProvider} from '@realm/react';
import Realm from 'realm';
import {useApp} from '@realm/react';
const APP_ID = 'js-flexible-oseso';
function AppWrapper() {
  return (
    <AppProvider id={APP_ID}>
      <UserProvider fallback={<LogIn />}>
        <RealmWithErrorHandling />
        <RealmWithRecoverOrDiscardUnsyncedChangesClientReset />
        <RealmWithRecoverUnsyncedChangesClientReset />
        <RealmWithManualClientResetFallback />
      </UserProvider>
    </AppProvider>
  );
}

// :snippet-start: handle-sync-error
function RealmWithErrorHandling() {
  return (
    <RealmProvider
      sync={{
        flexible: true,
        onError: (_session, error) => {
          console.log(error);
        },
      }}>
      <RestOfApp />
    </RealmProvider>
  );
}
// :snippet-end:

// :snippet-start: recover-discard-unsynced-changes
function RealmWithRecoverOrDiscardUnsyncedChangesClientReset() {
  return (
    <RealmProvider
      sync={{
        flexible: true,
        clientReset: {
          mode: 'recoverOrDiscardUnsyncedChanges',
          onBefore: realm => {
            // This block could be used for custom recovery, reporting, debugging etc.
          },
          onAfter: (beforeRealm, afterRealm) => {
            // This block could be used for custom recovery, reporting, debugging etc.
          },
          onFallback: (session, path) => {
            // See below "Manual Client Reset Fallback" section for example
          },
        },
      }}>
      <RestOfApp />
    </RealmProvider>
  );
}
// :snippet-end:
// :snippet-start: recover-unsynced-changes
function RealmWithRecoverUnsyncedChangesClientReset() {
  return (
    <RealmProvider
      sync={{
        flexible: true,
        clientReset: {
          mode: 'recoverUnsyncedChanges',
          onBefore: realm => {
            // This block could be used for custom recovery, reporting, debugging etc.
          },
          onAfter: (beforeRealm, afterRealm) => {
            // This block could be used for custom recovery, reporting, debugging etc.
          },
          onFallback: (session, path) => {
            // See below "Manual Client Reset Fallback" section for example
          },
        },
      }}>
      <RestOfApp />
    </RealmProvider>
  );
}
// :snippet-end:

// :snippet-start: manual-client-reset-fallback
let realm;

function RealmWithManualClientResetFallback() {
  return (
    <RealmProvider
      sync={{
        flexible: true,
        clientReset: {
          mode: 'recoverOrDiscardUnsyncedChanges', // or "recoverUnsyncedChanges"
          // can also include `onBefore` and `onAfter` callbacks
          onFallback: (_session, path) => {
            try {
              // Prompt user to perform a client reset immediately. If they don't,
              // they won't receive any data from the server until they restart the app
              // and all changes they make will be discarded when the app restarts.
              const didUserConfirmReset = showUserAConfirmationDialog();
              if (didUserConfirmReset) {
                // Close and delete old realm from device
                realm.close();
                Realm.deleteFile(path);
                // Perform client reset
                Realm.App.Sync.initiateClientReset(app, path);
                // Navigate the user back to the main page or reopen the
                // the Realm and reinitialize the current page
              }
            } catch (err) {
              // Reset failed. Notify user that they'll need to
              // update the app
            }
          },
        },
      }}>
      <RestOfApp />
    </RealmProvider>
  );
}

function RestOfApp() {
  // Assigning variable defined above to a realm.
  realm = useRealm();

  return <>{/* Other components in rest of app */}</>;
}
// :snippet-end:
function LogIn() {
  const app = useApp();

  React.useEffect(() => {
    app
      .logIn(Realm.Credentials.anonymous())
      .then(user => console.debug('logged in ', user.id));
  }, []);
  return <></>;
}
