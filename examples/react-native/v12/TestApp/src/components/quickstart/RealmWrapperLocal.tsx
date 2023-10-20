import {Profile} from '../../models';
import {FindSortFilter} from './Filter';

// :snippet-start: rn-quickstart-wrapper-local
import React from 'react';
import {RealmProvider} from '@realm/react';

// Create a configuration object

export const QuickStartLocal = () => {
  return (
    <RealmProvider schema={[Profile]}>
      <FindSortFilter />
    </RealmProvider>
  );
}
// :snippet-end:
