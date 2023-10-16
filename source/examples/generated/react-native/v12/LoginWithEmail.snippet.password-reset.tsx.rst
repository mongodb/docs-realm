.. code-block:: typescript

   interface resetPasswordButtonProps {
     password: string;
     token: string;
     tokenId: string;
   }

   const ResetPasswordButton = ({
     password,
     token,
     tokenId,
   }: resetPasswordButtonProps) => {
     const [errorMessage, setErrorMessage] = useState('');
     const {resetPassword, result} = useEmailPasswordAuth();
     const performPasswordReset = () => {
       resetPassword({token, tokenId, password});
     };

     // Handle `result`...

   };
