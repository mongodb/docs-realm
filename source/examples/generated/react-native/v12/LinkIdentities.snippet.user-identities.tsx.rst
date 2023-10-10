.. code-block:: typescript

   type UserIdentity = {
     providerType: string;
     id: string;
   };

   // Convert an anonymous user to an email/password account.
   // For this example, the App Services backend automatically
   // confirms users' emails.
   const RegisterUser = () => {
     const app = useApp();
     const user = useUser();
     const {logOut} = useAuth();
     const {register, result} = useEmailPasswordAuth();

     const [email, setEmail] = useState('');
     const [password, setPassword] = useState('');
     const [userIdentities, setUserIdentities] = useState(user.identities);

     useEffect(() => {
       if (result.operation === AuthOperationName.Register && result.success) {
         linkCredentials();
       }
     }, [result]);

     if (!userIdentities.length) {
       setUserIdentities(user.identities);
     }

     const linkCredentials = async () => {
       const credentials = Credentials.emailPassword(email, password);
       await user.linkCredentials(credentials);

       setUserIdentities(user.identities);
     };

     const registerAndLinkIdentities = async () => {
       register({email, password});
     };

     // Deletes the user, but @realm/react doesn't currently
     // refrender or fall back to the fallback component.
     const deleteUser = async () => {
       // Type hack because @realm/react's User type doesn't quite match
       // Realm's User type.
       app.deleteUser(user as unknown as Realm.User);
     };
     return (
       <View }>
         <FlatList
           data={userIdentities}
           renderItem={({item}) => (
             <Text >ID: {item.id}</Text>
           )}
           keyExtractor={item => item.id}
         />
         <Text>Link anonymous user with email/password account</Text>
         <View }>
           <TextInput
             onChangeText={setEmail}
             value={email}
             placeholder="email..."
           />
           <TextInput
             onChangeText={setPassword}
             value={password}
             placeholder="password..."
           />
         </View>

         <View >
           <Button
             title="Register"
             onPress={registerAndLinkIdentities}
           />
           <Button
             title="Log out"
             onPress={logOut}
           />
           <Button
             title="Delete user"
             onPress={deleteUser}
           />
         </View>
       </View>
     );
   };
