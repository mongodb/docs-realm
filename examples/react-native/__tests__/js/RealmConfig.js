import Profile from './Models/Profile';
import {createRealmContext} from '@realm/react';
import Invoice from './Models/Invoice';

export const SyncedRealmContext = createRealmContext({
  // Pass all of your models into the schema value.
  schema: [Invoice, Profile],
});
