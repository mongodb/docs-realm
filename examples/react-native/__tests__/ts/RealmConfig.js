import Profile from './Models/Profile';
// :snippet-start: create-realm-context
import {createRealmContext} from '@realm/react';
// Import all of your models.
import Invoice from './Models/Invoice';
import Business from './Models/Business';
// :remove-start:
import Address from './Models/Address';
import Contact from './Models/Contact';
import Bird from './Models/Bird';
import Turtle from './Models/Turtle';
// :remove-end:

export const RealmContext = createRealmContext({
  // Pass all of your models into the schema value.
  schema: [Business, Address],
});
// :snippet-end:

export const SecondRealmContext = createRealmContext({
  // Pass all of your secondary models into the schema value.
  schema: [Address, Contact],
});

// :snippet-start: in-memory-realm
export const InMemoryRealmContext = createRealmContext({
  schema: [Address, Contact],
  inMemory: true,
});
// :snippet-end:

export const SyncedRealmContext = createRealmContext({
  // Pass all of your models into the schema value.
  schema: [Invoice, Profile],
});

export const SubscriptionRealmContext = createRealmContext({
  schema: [Bird, Turtle],
});

export const Context = createRealmContext({
  // Pass all of your models into the schema value.
  schema: [Profile],
});
