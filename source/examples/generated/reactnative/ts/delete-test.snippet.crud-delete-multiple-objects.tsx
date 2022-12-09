const DogList = () => {
    const [ dogs, setDogs ] = useState([]);
    const realm = useRealm();
    const myDogs = useQuery(Dog);
    
    useEffect(() => {
        setDogs(myDogs)
    }, [realm])

    const deleteAllYoungDogObjects = () => {
        const youngDogs = myDogs.filtered("age < 3");
        realm.write(() => {
            realm.delete(youngDogs)
        })
    }

    const deleteAllDogObjects = () => {
        realm.write(() => {
            realm.delete(myDogs)
        })
    }

    return (
        <>
            {
                dogs.map((dog) => {
                    return(
                    <>
                        <Text>{dog.name}</Text>
                    </>
                    )
                })
            }
            <Button onPress={() => deleteAllYoungDogObjects()} title="Delete Young Dog Objects" testID='deleteYoungDogs'/>
            <Button onPress={() => deleteAllDogObjects()} title="Delete All Dog Objects" testID='deleteAllDogs'/>

        </>
    )
}
