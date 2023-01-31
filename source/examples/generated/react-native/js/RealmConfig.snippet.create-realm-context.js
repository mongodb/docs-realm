import {createRealmContext} from '@realm/react';
// Import all of your models.
import Invoice from './Models/Invoice';
import Business from './Models/Business';

export const RealmContext = createRealmContext({
  // Pass all of your models into the schema value.
  schema: [Invoice, Business],
});
