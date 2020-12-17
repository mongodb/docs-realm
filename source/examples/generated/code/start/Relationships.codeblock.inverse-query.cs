var katie = realm.All<User>().Where(u => u.Name == "Katie").FirstOrDefault();
var tasks = realm.All<Task>().Filter($"Assignee._id == '{katie.Id}'").ToList();