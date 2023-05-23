realm.write(() {
  realm.addAll([
    Person(ObjectId(), 'Luke'),
    Person(ObjectId(), 'Luke'),
    Person(ObjectId(), 'Luke'),
    Person(ObjectId(), 'Luke')
  ]);
});

final limitedPeopleResults =
    realm.query<Person>('name == \$0 SORT(name ASC) LIMIT(2)', ['Luke']);

// prints `2`
print(limitedPeopleResults.length);
