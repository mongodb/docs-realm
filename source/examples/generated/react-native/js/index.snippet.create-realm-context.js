import {createRealmContext} from '@realm/react';
// Import all of your models.
import {Invoice} from './Invoice';
import {Business} from './Business';

export const RealmContext = createRealmContext({
  // Pass all of your models into the schema value.
  schema: [Invoice, Business],
});
