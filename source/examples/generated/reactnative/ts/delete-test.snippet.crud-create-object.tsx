const DogList = () => {
    const [ dogs, setDogs ] = useState([]);

    const realm = useRealm();
    const myDogs = useQuery(Dog);
    useEffect(() => {
        setDogs(myDogs)
    }, [realm])


    const deleteDog = (deletableDog: Dog) => {
        realm.write(() => {
            realm.delete(deletableDog)
        })
    }

    return (
        <>
            {
                dogs.map((dog) => {
                    console.log(dog.name)
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
