const DogList = () => {
    const [ dogs, setDogs ] = useState([]);
    const realm = useRealm();
    const myDogs = useQuery(Dog);
    useEffect(() => {
        setDogs(myDogs)
    }, [realm])

    const deleteDog = (deletableDog) => {
        realm.write(() => {
            realm.delete(deletableDog)
        })
    }

    return (
        <>
            {
                dogs.map((dog) => {
                    return(
                    <>
                        <Text>{dog.name}</Text>
                        <Button onPress={() => deleteDog(dog)} title="Delete Dog" testID="deleteDog"/>
                    </>
                    )
                })
            }
        </>
    )
}
