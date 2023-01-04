const CatInfoCard = ({catName}: {catName: string}) => {
  // To query for the cat's birthDate, filter for their name to retrieve the realm object.
  // Use dot notation to access the birthDate property.
  const cat = useQuery(Cat).filtered(`name = '${catName}'`)[0];
  const catBirthDate = cat.birthDate;

  if (cat) {
    return (
      <>
        <Text>{catName}</Text>
        <Text>{String(catBirthDate)}</Text>
      </>
    );
  } else {
    return <Text>Cat not found</Text>;
  }
};
