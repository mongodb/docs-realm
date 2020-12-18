var katie = realm.All<User>().Where(u => u.Name == "Katie").FirstOrDefault();
var katiesTasks = realm.All<Task>().Filter($"Assignee._id == '{katie.Id}'");