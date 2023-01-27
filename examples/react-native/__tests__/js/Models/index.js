// :snippet-start: create-realm-context
import {createRealmContext} from '@realm/react';
// Import all of your models.
import {Cat} from './Cat';
import {Dog} from './Dog';
// :remove-start:
import {Person} from './Person';
import {Profile} from './Profile';
// :remove-end:

export const RealmContext = createRealmContext({
  // Pass all of your models into the schema value.
  schema: [Cat, Dog],
});
// :snippet-end:

export const SecondRealmContext = createRealmContext({
  // Pass all of your models into the schema value.
  schema: [Person, Profile],
});
