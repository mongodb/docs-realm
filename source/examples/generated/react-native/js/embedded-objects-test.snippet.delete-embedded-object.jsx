const ContactInfo = ({contactName}) => {
  const contacts = useQuery(Contact);
  const realm = useRealm();

  const deleteContact = () => {
    realm.write(() => {
      // Deleting the contact also deletes the embedded address of that contact
      realm.delete(
        contacts.filtered(`name == '${contactName}'`)[0]
      );
    });
  };
  return (
    <View>
      <Button testID='deleteContactBtn' onPress={deleteContact} title='Delete Contact' />
    </View>
  );
};
