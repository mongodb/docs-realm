.. code-block:: typescript

   export const SubscribeApiExamples = () => {
     return (
       <AppProvider id={APP_ID}>
         <UserProvider fallback={LogIn}>
           <RealmProvider
             schema={[Bird]}
             sync={{
               flexible: true,
               initialSubscriptions: {
                 update: (subs, realm) => {
                   subs.add(realm.objects(Bird), {name: 'Initial birds'});
                 },
                 rerunOnOpen: true,
               },
             }}>
             {/* ...work with realm data in nested components. */}
           </RealmProvider>
         </UserProvider>
       </AppProvider>
     );
   };
