Person firstPerson = realm.find<Person>(1)!;

// Freeze RealmList in a RealmObject
RealmList<String> firstPersonAttributesFrozen =
    firstPerson.attributes.freeze();

// Change data in the unfrozen realm
final newAttribute = "quick";
realm.write(() {
  // Append item to list
  firstPerson.attributes.add(newAttribute);
});

final index = firstPersonAttributesFrozen.indexOf(newAttribute);
print(index); // prints -1 because cannot find new attribute

// You must also close the frozen realm associated
// with the frozen RealmList before exiting the process
firstPersonAttributesFrozen.realm.close();
