.. code-block:: typescript

   type RegisterButtonProps = {
     email: string;
     password: string;
   };

   const RegisterButton = ({email, password}: RegisterButtonProps) => {
     const {register} = useEmailPasswordAuth();

     // For this example, the App Services backend automatically
     // confirms users' emails.
     const performRegistration = () => {
       register({email, password});
     };

     return (
       <Button
         title="Register"
         onPress={performRegistration}
       />
     );
   };
