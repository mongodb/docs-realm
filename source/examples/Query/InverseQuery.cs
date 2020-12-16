var tasks = realm.All<Task>().Filter($"Assignee.Name == 'Katie'").ToList();
