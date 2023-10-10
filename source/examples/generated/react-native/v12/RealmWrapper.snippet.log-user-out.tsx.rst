.. code-block:: typescript

   function UserInformation() {
     const user = useUser();
     const {logOut} = useAuth();
     const performLogout = () => {
       logOut();
     };

     if (user) {
       return (
         <View>
           <Text>User state: {user.state}</Text>
           {user.profile.email && <Text>Email: {user.profile.email}</Text>}
           <FlatList
             data={user.identities}
             keyExtractor={item => item.id}
             renderItem={({item}) => (
               <UserIdentity id={item.id} providerType={item.providerType} />
             )}
           />

           <Button  title="Log out" onPress={performLogout} />
         </View>
       );
     } else {
       return <Text>No user logged in</Text>;
     }
   }
