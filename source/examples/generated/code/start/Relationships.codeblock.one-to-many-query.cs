// Not sure if this accurately shows a one-to-many query
var youngDogs = realm.All<Dog>().Where(d => d.Age == 1);