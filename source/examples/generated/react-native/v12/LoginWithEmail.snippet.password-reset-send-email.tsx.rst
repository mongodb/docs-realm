.. code-block:: typescript

   const {sendResetPasswordEmail, result} = useEmailPasswordAuth();
   const performSendResetPasswordEmail = () => {
     sendResetPasswordEmail({email: email});
   };

   // Work with `result`...
