.. code-block:: typescript
   :emphasize-lines: 33

   export const CompensatingWriteErrorHandling = () => {
     const [error, setError] = useState<CompensatingWriteError | undefined>(
       undefined,
     );

     // Create a callback for sync error handling
     const errorCallback: ErrorCallback = (_session, error) => {
       // Check if error type matches CompensatingWriteError
       if (error instanceof CompensatingWriteError) {
         // Handle the compensating write error as needed
         console.debug({
           code: error.code,
           name: error.name,
           category: error.category,
           message: error.message,
           url: error.logUrl,
           writes: error.writes,
         });

         setError(error);
       }
     };

     return (
       <AppProvider id={APP_ID}>
         <UserProvider fallback={LogIn}>
           <RealmProvider
             schema={[Person, Turtle]}
             // Create Flexible Sync configuration
             sync={{
               flexible: true,
               // Set error handler to the callback above
               onError: errorCallback, 
             }}>
             <CompensatingWriteErrorHandler error={error} />
           </RealmProvider>
         </UserProvider>
       </AppProvider>
     );
   };
