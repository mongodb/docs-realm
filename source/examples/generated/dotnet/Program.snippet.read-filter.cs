var lessExpensiveGuitars = realm.All<Guitar>().Where(g => g.Price < 400);

var guitarsSortedByMaker = realm.All<Guitar>().OrderBy(g => g.Maker);

var specifiGuitarById = realm.Find<Guitar>(someGuitarId);
