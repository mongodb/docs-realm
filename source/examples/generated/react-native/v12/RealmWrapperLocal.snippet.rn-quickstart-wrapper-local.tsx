import React from 'react';
import {RealmProvider} from '@realm/react';

// Create a configuration object

function AppWrapper() {
  return (
    <RealmProvider schema={[Profile]}>
      <RestOfApp />
    </RealmProvider>
  );
}
