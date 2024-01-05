.. code-block:: typescript

   import React from 'react';
   import {Credentials} from 'realm';
   import {RealmProvider, AppProvider, UserProvider, useApp} from '@realm/react';
   import {Button} from 'react-native';
   // Import your models
   import {Profile} from '../../../models';

   // Expose a sync realm
   export function AppWrapperSync() {
     return (
       <AppProvider id={APP_ID}>
         <UserProvider fallback={LogIn}>
           <RealmProvider
             schema={[Profile]}
             sync={{
               flexible: true,
               onError: console.error,
               initialSubscriptions: {
                 update(subs, realm) {
                   subs.add(realm.objects('Profile'));
                 },
                 rerunOnOpen: true,
               },
             }}>
             <RestOfApp />
           </RealmProvider>
         </UserProvider>
       </AppProvider>
     );
   }

   function LogIn() {
     const app = useApp();
     async function logInUser() {
       await app.logIn(Credentials.anonymous());
     }
     return (
       <Button
         title="Log In"
         onPress={logInUser}
       />
     );
   }
