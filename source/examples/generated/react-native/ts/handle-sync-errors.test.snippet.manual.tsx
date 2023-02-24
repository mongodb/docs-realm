function RealmWitManualClientReset() {
  return (
    <RealmProvider
      sync={{
        flexible: true,
        clientReset: {
          mode: 'manual',
          onManual: (session, path) => {
            // handle manual client reset here
          },
        },
      }}>
      <RestOfApp />
    </RealmProvider>
  );
}
