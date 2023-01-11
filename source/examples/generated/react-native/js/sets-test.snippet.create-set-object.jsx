const CreateInitialCharacters = () => {
  const realm = useRealm();
  useEffect(() => {
    realm.write(() => {
      new Character(realm, {
        _id: new Realm.BSON.ObjectId(),
        name: 'PlayerOne',
        inventory: ['elixir', 'compass', 'glowing shield'],
        levelsCompleted: [4, 9],
      });
    });
    realm.write(() => {
      new Character(realm, {
        _id: new Realm.BSON.ObjectId(),
        name: 'PlayerTwo',
        inventory: ['estus flask', 'gloves', 'rune'],
        levelsCompleted: [1, 2, 5, 24],
      });
    });
  }, []);
  const characters = useQuery(Character);

  return (
    <View>
      {characters.map(character => (
        <View key={character._id}>
          <Text>{character.name}</Text>
        </View>
      ))}
    </View>
  );
};
