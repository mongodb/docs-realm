var allGuitars = realm.All<Guitar>();

var lessExpensiveGuitars = realm.All<Guitar>().Where(g => g.Price < 400);

var guitarsSortedByMake = realm.All<Guitar>().OrderBy(g => g.Make);

var specifiGuitarById = realm.Find<Guitar>(someGuitarId);
