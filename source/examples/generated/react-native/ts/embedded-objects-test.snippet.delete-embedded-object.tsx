const ContactInfo = ({contactName}: {contactName: string}) => {
  const contacts = useQuery(Contact);
  const toDelete = contacts.filtered(`name == '${contactName}'`)[0]
  const realm = useRealm();

  const deleteContact = () => {
    realm.write(() => {
      // Deleting the contact also deletes the embedded address of that contact
      realm.delete(
        toDelete
      );
    });
  };
  return (
    <View>
      <Text>{contactName}</Text>
      <Button onPress={deleteContact} title='Delete Contact' />
    </View>
  );
};
