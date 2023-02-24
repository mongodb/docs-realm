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
