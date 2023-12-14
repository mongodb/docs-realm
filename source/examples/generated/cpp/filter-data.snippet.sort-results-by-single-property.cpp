auto items = realm.objects<Item>();

// Sort with `false` returns objects in descending order.
auto itemsSorted = items.sort("priority", false);
