import React from 'react';
import {RealmProvider} from '@realm/react';

import {Profile} from '../../../models';
import {FindSortFilter} from '../Filter';

export const Quickstart = () => {
  return (
    <RealmProvider schema={[Profile]}>
      <FindSortFilter />
    </RealmProvider>
  );
};
