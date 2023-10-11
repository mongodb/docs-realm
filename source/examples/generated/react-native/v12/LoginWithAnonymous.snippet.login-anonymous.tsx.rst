.. code-block:: typescript

   const {logInWithAnonymous, result} = useAuth();

   const performAnonymousLogin = () => {
     logInWithAnonymous();
   };

   // Handle `result`...
