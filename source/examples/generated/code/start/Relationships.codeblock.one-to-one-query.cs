// Not sure if this accurately shows a one-to-one query
var fidosPerson = realm.All<Person>().Where(p => p.Dog == dog);