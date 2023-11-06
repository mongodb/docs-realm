.. list-table::
   :header-rows: 1
   :widths: 20 80

   * - Method
     - Description and Example

   * - ``result``
     - Result of authentication hook operation. ``result.operation`` gives you
       the name of the current operation. For a list of all operation names,
       refer to the :realm-react-sdk:`API documentation 
       <enums/AuthOperationName.html>`.
     
       Possible result values:

       .. code:: typescript

         {
            state, // "not-started", "pending", "success", "error"
            operation, // enum AuthOperationName
            pending, // true or false
            success, // true or false
            error // Error-based object or undefined
         }

   * - ``logIn``
     - Logs a user in using an email and password. You could also call
       ``logIn(Realm.Credentials.emailPassword(email, password))``.
       Returns a ``Realm.User`` instance of the logged-in user.

       .. code:: typescript

        const {logIn, result} = useEmailPasswordAuth();

        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');

        const performLogin = () => {
          logIn({email, password});
        };

        if(result.pending) {
          return (<LoadingSpinner/>)
        }

        if(result.error) {
          return (<ErrorComponent/>)
        }

        if(result.success) {
          return (<SuccessComponent/>)
        }
        //...

   * - ``logOut``
     - Logs out the current user.
       
       .. code:: typescript

          const {logOut, result} = useEmailPasswordAuth();
          const performLogout = () => {
            logOut();
          }

   * - ``register``
     - Registers a new user. Requires a user email and password.

       .. code:: typescript
     
          const {register, result} = useEmailPasswordAuth();

          const [email, setEmail] = useState('');
          const [password, setPassword] = useState('');

          const performRegister = () => {
            register({email, password});
          };

   * - ``confirm``
     - Confirms a user account. Requires a ``token`` and ``tokenId``.

       .. code:: typescript

          const {confirm, result} = useEmailPasswordAuth();

          const performConfirmation = () => {
            confirm({token, tokenId});
          };

   * - ``resendConfirmationEmail``
     - Resends a confirmation email.

       .. code:: typescript

          const {resendConfirmationEmail, result} = useEmailPasswordAuth();
          const [email, setEmail] = useState('');

          const performResendConfirmationEmail = () => {
            resendConfirmationEmail({email});
          };

   * - ``retryCustomConfirmation``
     - Retries confirmation with a custom function.

       .. code:: typescript

          const {retryCustomConfirmation, result} = useEmailPasswordAuth();
          const [email, setEmail] = useState('');

          const performRetryCustomConfirmation = () => {
            retryCustomConfirmation({email});
          };

   * - ``sendResetPasswordEmail``
     - Sends a password reset email.

       .. code:: typescript

          const {sendResetPasswordEmail, result} = useEmailPasswordAuth();
          const [email, setEmail] = useState('');

          const performSendResetPasswordEmail = () => {
            sendResetPasswordEmail({email});
          };

   * - ``resetPassword``
     - Completes resetting a user's password.

       .. code:: typescript

          const {resetPassword, result} = useEmailPasswordAuth();
          const [password, setPassword] = useState('');

          const performResetPassword = () => {
            resetPassword({token, tokenId, password});
          };

   * - ``callResetPasswordFunction``
     - Calls your App Services backend password reset function. Can pass 
       arguments to the function as needed.

       .. code:: typescript

        const {callResetPasswordFunction, result} = useEmailPasswordAuth();
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');

        const performResetPassword = () => {
          callResetPasswordFunction({email, password}, "extraArg1", "extraArg2");
        };
