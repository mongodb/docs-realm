// Expose a realm
function AppWrapper() {
  return (
    <RealmProvider>
      <RestOfApp />
    </RealmProvider>
  );
}
