.. code-block:: typescript

   import React, {useEffect, useState} from 'react';
   import {useRealm, useQuery} from '@realm/react';
   import {View, Text, FlatList} from 'react-native';

   import {Bird} from './models/Bird';
   import {Subscription} from 'realm/dist/bundle';

   export const BasicSubscription = () => {
     const realm = useRealm();
     // Get all local birds that have not been seen yet.
     const seenBirds = useQuery(Bird).filtered('haveSeen == true');
     const [seenBirdsSubscription, setSeenBirdsSubscription] =
       useState<Subscription | null>();

     useEffect(() => {
       // Create an async function so that we can `await` the
       // promise from `.subscribe()`.
       const createSubscription = async () => {
         await seenBirds.subscribe({
           name: 'Birds I have seen',
         });
       };

       // Get the subscription...
       const subscription = realm.subscriptions.findByName('Birds I have seen');

       // ... and set it to a stateful variable or manage it in `useEffect`.
       setSeenBirdsSubscription(subscription);

       createSubscription().catch(console.error);
     }, []);

     // ...work with the subscribed results list or modify the subscription.

   };
