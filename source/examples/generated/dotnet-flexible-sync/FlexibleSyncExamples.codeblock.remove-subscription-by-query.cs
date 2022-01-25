// remove a subscription by it's query
var query = realm.All<MyTask>().Where(t => t.Owner == "Ben");
subscriptions.Remove(query);
