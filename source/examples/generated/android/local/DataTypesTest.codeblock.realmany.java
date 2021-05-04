FrogAny frog = realm.createObject(FrogAny.class);
frog.setName("George Washington");

// set RealmAny field to a null value
frog.setBestFriend(RealmAny.nullValue());
RealmAny noBestFriend = frog.getBestFriend();
Log.v("EXAMPLE", "Best friend: " + noBestFriend);

// possible types for RealmAny are defined in RealmAny.Type
assert(frog.getBestFriend().getType() == RealmAny.Type.NULL);

// set RealmAny field to a string with RealmAny.valueOf a string value
frog.setBestFriend(RealmAny.valueOf("Greg"));
String bestFriendString = frog.getBestFriend().asString();
Log.v("EXAMPLE", "Best friend: " + bestFriendString);

// RealmAny instances change type as you reassign to different values
assert(frog.getBestFriend().getType() == RealmAny.Type.STRING);

// set RealmAny field to a realm object, also with valueOf
Person person = new Person("Jason Funderberker");
frog.setBestFriend(RealmAny.valueOf(person));
Person bestFriendObject = frog.getBestFriend().asRealmModel(Person.class);
Log.v("EXAMPLE", "Best friend: " + bestFriendObject.getName());

// RealmAny fields referring to any Realm Object use the OBJECT type
assert(frog.getBestFriend().getType() == RealmAny.Type.OBJECT);

// you can't put a RealmList in a RealmAny field directly,
// ...but you can set a RealmAny field to a RealmObject that contains a list
GroupOfPeople persons = new GroupOfPeople();
// GroupOfPeople contains a RealmList of people
persons.getPeople().add("Rand");
persons.getPeople().add("Perrin");
persons.getPeople().add("Mat");

frog.setBestFriend(RealmAny.valueOf(persons));
Log.v("EXAMPLE", "Best friend: " + frog.getBestFriend().asRealmModel(GroupOfPeople.class).getPeople().toString());
