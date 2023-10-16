.. code-block:: typescript

   export const LogIn = () => {
     const {logInWithAnonymous, result} = useAuth();
     useEffect(() => {
       logInWithAnonymous();
     }, [])

     return (
       <View >
         {!result.error && <Text>Please log in</Text>}
         <View>
           {result.pending && <ActivityIndicator />}
           {result.error && <ErrorComponent error={result.error} />}
         </View>
       </View>
     );
   };
