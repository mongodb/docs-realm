function AppWrapper() {
  if (!app.currentUser) {
    return (<LoginUserScreen />);
  }
  const syncConfig = {
    user: app.currentUser,
    partitionValue: "ExpoTemplate"
  }

  return (
    <RealmProvider sync={syncConfig} fallback={() => <LoadingSpinner/>}>
      <App />
    </RealmProvider>
  );
}