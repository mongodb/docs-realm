const ContactList = () => {
  // Query for all Contact objects
  const contacts = useQuery(Contact);
  
  // Run the `.filtered()` method on all the returned Contacts to find the 
  // contact with the name "John Smith" and the corresponding street address
  const contactAddress = contacts
    .filtered("name == 'John Smith'")[0].address.street; 

  return(
    <View>
      <Text>John Smith's street address:</Text>
      <Text>{contactAddress}</Text>
    </View>
  );
};
