final listOfNames = ['Luke', 'Leia'];
final matchingRealmObjects =
    realm.query<Person>(r'name IN $0', [listOfNames]);
