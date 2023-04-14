const ContactList = ({postalCode}) => {
  // Query for all Contact objects
  const contacts = useQuery(Contact);

  // Run the `.filtered()` method on all the returned Contacts to get
  // contacts with a specific postal code.
  const contactsInArea = contacts.filtered(
    `address.postalCode == '${postalCode}'`,
  );

  if (contactsInArea.length) {
    return (
      <>
        <FlatList
          testID='contactsList'
          data={contactsInArea}
          renderItem={({item}) => {
            <Text>{item.name}</Text>;
          }}
        />
      </>
    );
  } else {
    return <Text>No contacts found in this area.</Text>;
  }
};
