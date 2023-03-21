const CreateCatsInput = () => {
  const realm = useRealm();

  useEffect(() => {
    // Add data to the Realm when the component mounts
    realm.write(() => {
      // create a Cat with a birthDate value of type string
      new Cat(realm, {
        name: 'Euler',
        birthDate: 'December 25th, 2017',
      });
      // create a Cat with a birthDate value of type date
      new Cat(realm, {
        name: 'Blaise',
        birthDate: new Date('August 17, 2020'),
      });

      // create a Cat with a birthDate value of type int
      new Cat(realm, {name: 'Euclid', birthDate: 10152021});

      // create a Cat with a birthDate value of type null
      new Cat(realm, {name: 'Pythagoras', birthDate: null});
    });
  }, []);

  // retrieve all cats
  const cats = useQuery(Cat);

  return (
    <>
      {cats.map(cat => (
        <View>
          <Text>{cat.name}</Text>
          <Text>{String(cat.birthDate)}</Text>
        </View>
      ))}
    </>
  );
};
