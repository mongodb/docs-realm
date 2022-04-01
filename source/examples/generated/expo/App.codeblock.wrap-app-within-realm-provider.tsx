function AppWrapper() {
  if (!app.currentUser) {
    return (<LoginUserScreen />);
  }
  return (
    <RealmProvider>
      <App />
    </RealmProvider>
  );
}
