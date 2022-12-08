const CreateDogInput = () => {
    const [dogName, onChangeDogName] = React.useState('Fido');
    const realm = useRealm();

    const handleAddItem = () => {
        realm.write(() => {
            new Dog(realm, {  name: dogName, age: 1, })
        });
    }

    return (
        <>
            <TextInput onChangeText={onChangeDogName} value={dogName} />
            <Button onPress={() => handleAddItem()} title="Submit Item"/>
        </>
    )
}