import {Profile} from '../../models';
import {RestOfApp} from './v12-quickstart.test';

// :snippet-start: rn-quickstart-wrapper-local
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
// :snippet-end:
