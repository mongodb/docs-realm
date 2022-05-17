final frodo = Character('Frodo', 'Hobbit', 51);
final samwise = Character('Samwise', 'Hobbit', 39);
final gollum = Character('Gollum', 'Hobbit', 589);
final aragorn = Character('Aragorn', 'Human', 87);
final legolas = Character('Legolas', 'Elf', 2931);
final gimli = Character('Gimli', 'Dwarf', 140);

final fellowshipOfTheRing = Fellowship('Fellowship of the Ring',
    members: [frodo, samwise, aragorn, legolas, gimli]);

final config = Configuration.local([Fellowship.schema, Character.schema]);
final realm = Realm(config);

realm.write(() {
  realm.add(fellowshipOfTheRing);
  realm.add(gollum); // not in fellowship
});
