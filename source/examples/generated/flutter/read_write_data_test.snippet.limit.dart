realm.write(() {
  realm.addAll([
    Person(ObjectId(), 'Luke'),
    Person(ObjectId(), 'Leia'),
    Person(ObjectId(), 'Han'),
    Person(ObjectId(), 'Chewbacca')
  ]);
});

final limitedPeopleResults =
    realm.query<Person>('TRUEPREDICATE LIMIT(2)');
for (var person in limitedPeopleResults) {
  print(person.name);
}
// prints 'Luke', 'Leia'
