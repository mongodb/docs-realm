.. code-block:: typescript

   const {resetPassword, result} = useEmailPasswordAuth();
   const performPasswordReset = () => {
     resetPassword({token, tokenId, password});
   };

   // Handle `result`...
