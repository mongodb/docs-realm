.. code-block:: typescript

   const {logIn, result} = useEmailPasswordAuth();

   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');

   const performLogin = () => {
     logIn({email, password});
   };

   // Handle `result`...
