// :snippet-start: create-realm-context
import {createRealmContext} from '@realm/react';
// Import all of your models.
import {Invoice} from './Invoice';
import {Business} from './Business';
// :remove-start:
import {Address} from './Address';
import {Contact} from './Contact';
// :remove-end:

export const RealmContext = createRealmContext({
  // Pass all of your models into the schema value.
  schema: [Invoice, Business],
});
// :snippet-end:

export const SecondRealmContext = createRealmContext({
  // Pass all of your secondary models into the schema value.
  schema: [Address, Contact],
});
