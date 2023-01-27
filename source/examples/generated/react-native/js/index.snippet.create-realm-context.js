import {createRealmContext} from '@realm/react';
// Import all of your models
import {Cat} from './Cat';
import {Dog} from './Dog';

export const RealmContext = createRealmContext({
  // Pass all of your models into the schema value.
  schema: [Cat, Dog],
});
