const isString = (
  val: Mixed,
  name: string,
  object: Realm.Object,
): val is Realm.Types.String => {
  return object.getPropertyType(name) === 'string';
};

type CatInfoCardProps = {catName: string};

const CatInfoCard = ({catName}: CatInfoCardProps) => {
  // To query for the cat's birthDate, filter for their name to retrieve the realm object.
  // Use dot notation to access the birthDate property.
  const cat = useQuery(Cat).filtered(`name = '${catName}'`)[0];
  const catBirthDate = isString(cat.birthDate, 'birthDate', cat)
    ? cat.birthDate
    : cat.birthDate.toString();

  if (cat) {
    return (
      <>
        <Text>{catName}</Text>
        <Text>{catBirthDate}</Text>
      </>
    );
  } else {
    return <Text>Cat not found</Text>;
  }
};
