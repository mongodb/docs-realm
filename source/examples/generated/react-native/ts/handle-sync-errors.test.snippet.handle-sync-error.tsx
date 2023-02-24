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
