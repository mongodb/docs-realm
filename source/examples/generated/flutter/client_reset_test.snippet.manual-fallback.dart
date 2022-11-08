late Realm realm;
final config = Configuration.flexibleSync(currentUser, schema,

    // This example uses the `RecoverOrDiscardUnsyncedChangesHandler`,
    // but the same logic could also be used with the `RecoverUnsyncedChangesHandler`
    // or the `DiscardUnsyncedChangesHandler`.
    clientResetHandler: RecoverOrDiscardUnsyncedChangesHandler(
  onManualResetFallback: (clientResetError) {
    // Prompt user to perform a client reset immediately. If they don't,
    // they won't receive any data from the server until they restart the app
    // and all changes they make will be discarded when the app restarts.
    var didUserConfirmReset = showUserAConfirmationDialog();
    if (didUserConfirmReset) {
      // Close the Realm before doing the reset. It must be
      // deleted as part of the reset.
      final realmPath = realm.config.path;
      realm.close();
      Realm.deleteRealm(realmPath);

      // Attempt the client reset.
      try {
        clientResetError.resetRealm();
        // Navigate the user back to the main page or reopen the
        // the Realm and reinitialize the current page.

      } catch (err) {
        // Reset failed.
        // Notify user that they'll need to update the app
      }
    }
  },
));
