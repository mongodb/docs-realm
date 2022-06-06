import { AppProvider, UserProvider } from '@realm/react'

const AppWrapper = () => {
  return (
    <AppProvider id={appId}>
      <UserProvider fallback={LoginComponent}>
        {/* After login, user will be automatically populated in realm configuration */}
        <RealmProvider
          sync={{partitionValue: 'SamplePartition'}}>
          <App />
        </RealmProvider>
      </UserProvider>
    </AppProvider>
  );
};
