// Find the contact you want to update
const UpdateContact = ({contactName}: {contactName: string}) => {
  const [street, setStreet] = useState('');
  const contact = useQuery(Contact).filtered(`name == '${contactName}'`)[0];
  const realm = useRealm();

  const updateStreet = () => {
    // Modify the property of the embedded Address object in a write transaction
    realm.write(() => {
      // Update the address directly through the contact
      contact.address.street = street;
    });
  };
  return (
    <View>
      <Text>{contact.name}</Text>
      <TextInput value={street} onChangeText={setStreet} placeholder='Enter New Street Address' />
      <Button onPress={updateStreet} title='Update Street Address' />
    </View>
  );
};
