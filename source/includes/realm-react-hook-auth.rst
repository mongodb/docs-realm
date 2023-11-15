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

   * - ``logIn(credentials: Realm.Credentials): void``
     - Logs in a user with any authentication mechanism supported by
       Realm. If called when a user is logged in, the current user switches to
       the new user. Usually, it's better to use the more specific login
       methods.

       .. code:: typescript

        const {logIn, result} = useAuth();

        useEffect(() => logIn(Realm.Credentials.anonymous()), []);

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

   * - ``logInWithAnonymous(): void``
     - Log in with the anonymous authentication provider.
       
       .. code:: typescript

          const {logInWithAnonymous, result} = useAuth();
          const performLogin = () => {
            logInWithAnonymous();
          };

   * - ``logInWithApiKey(key: string): void``
     - Log in with an API key.
       
       .. code:: typescript

          const {logInWithApiKey, result} = useAuth();
          const performLogin = () => {
          const key = getApiKey(); // user defined function
            logInWithApiKey(key);
          };

   * - .. code:: typescript
          :copyable: false

          logInWithEmailPassword(credentials: {
            email: string;
            password: string;
          }): void
     - Log in with Email/Password.
       
       .. code:: typescript

          const {logInWithEmailPassword, result} = useAuth();
          const [email, setEmail] = useState('');
          const [password, setPassword] = useState('');

          const performLogin = () => {
            logInWithEmailPassword({email, password});
          };

   * - `` logInWithJWT(token: string): void``
     - Log in with a JSON Web Token (JWT).
       
       .. code:: typescript

          const {logInWithJWT, result} = useAuth();

          const performLogin = () => {
          const token = authorizeWithCustomerProvider(); // user defined function
            logInWithJWT(token);
          };

   * - .. code:: typescript
          :copyable: false

          logInWithGoogle(credentials: {
            idToken: string;
          } | {
            authCode: string;
          }): void
     - Log in with Google.
       
       .. code:: typescript

          const {logInWithGoogle, result} = useAuth();

          const performLogin = () => {
          const token = getGoogleToken(); // user defined function
            logInWithGoogle({idToken: token});
          };

   * - ``logInWithApple(idToken: string): void``
     - Log in with Apple.
       
       .. code:: typescript

          const {logInWithApple, result} = useAuth();

          const performLogin = () => {
          const token = getAppleToken(); // user defined function
            logInWithApple(token);
          };

   * - ``logInWithFacebook(accessToken: string): void``
     - Log in with Facebook.
       
       .. code:: typescript

          const {logInWithFacebook, result} = useAuth();

          const performLogin = () => {
          const token = getFacebookToken(); // user defined function
            logInWithFacebook(token);
          };

   * - ``logInWithFunction<PayloadType extends Record<string, unknown>>(payload: PayloadType): void``
     - Log in with a custom function.
       
       .. code:: typescript

          const {logInWithFunction, result} = useAuth();

          const performLogin = () => {
          const customPayload = getAuthParams(); // user defined arguments
            logInWithFunction(customPayload);
          };

   * - ``logOut(): void``
     - Logs out the current user.
       
       .. code:: typescript

          const {logOut, result} = useEmailPasswordAuth();
          const performLogout = () => {
            logOut();
          }
