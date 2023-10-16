.. code-block:: typescript

   export const LogIn = () => {
     // Result contains the result of `logInWithAnonymous`.
     const {logInWithAnonymous, result} = useAuth();

     // Log in an anyonmouse user on component render.
     // On successfull login, this fallback component unmounts.
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
