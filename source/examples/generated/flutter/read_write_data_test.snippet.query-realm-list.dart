final config = Configuration.local([Person.schema, Team.schema]);
final realm = Realm(config);
final heroes = Team('Millenium Falcon Crew', crew: [
  Person('Luke'),
  Person('Leia'),
  Person('Han'),
  Person('Chewbacca')
]);
realm.write(() => realm.add(heroes));

final lukeAndLeia = heroes.crew.query(r'name BEGINSWITH $0', ['L']);
