import { AppProvider } from '@realm/react'

function AppWrapper() {
  return (
    <AppProvider id={appId}>
      <RealmProvider>
        <App />
      </RealmProvider>
    </AppProvider>
  );
}
