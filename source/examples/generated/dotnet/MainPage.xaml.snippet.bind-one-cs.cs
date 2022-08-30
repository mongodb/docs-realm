Employee123 = realm.All<Employee>()
    .FirstOrDefault(e => e.EmployeeId == "123");
