function AppWrapper() {
  if (!RealmProvider) {
    return null;
  }
  const syncConfig = {
    user: app.currentUser,
    partitionValue: "ExpoTemplate"
  }

  return (
    <RealmProvider sync={syncConfig}>
      <App />
    </RealmProvider>
  );
}
