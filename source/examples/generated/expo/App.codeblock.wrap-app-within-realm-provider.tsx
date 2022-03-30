function AppWrapper() {
  if (!app.currentUser) {
    return null;
  }
  return (
    <RealmProvider>
      <App />
    </RealmProvider>
  );
}
