.. code-block:: typescript

   type RegisterButtonProps = {
     email: string;
     password: string;
   };

   const RegisterButton = ({email, password}: RegisterButtonProps) => {
     const {register} = useEmailPasswordAuth();

     const performRegistration = () => {
       register({email, password});
     };

     return <Button title="Register" onPress={performRegistration} />;
   };
