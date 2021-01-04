var config = new RealmConfiguration
{
    SchemaVersion = 4,
    MigrationCallback = (migration, oldSchemaVersion) =>
    {
        var oldPeople = migration.OldRealm.All("Person");
        var newPeople = migration.NewRealm.All("Person");

        // Migrate Person objects
        for (var i = 0; i < newPeople.Count(); i++)
        {
            var oldPerson = oldPeople.ElementAt(i);
            var newPerson = newPeople.ElementAt(i);
            
            // Changes from version 1 to 2 (adding LastName) will occur automatically when Realm detects the change

            // Migrate Person from version 2 to 3: replace FirstName and LastName with FullName
            if (oldSchemaVersion < 3)
            {
                newPerson.FullName = oldPerson.FirstName + " " + oldPerson.LastName;
            }

            // Migrate Person from version 3 to 4: replace Age with Birthday
            if (oldSchemaVersion < 4)
            {
                newPerson.Birthday = DateTimeOffset.Now.AddYears(-(int)oldPerson.Age);
            }
        }
    }
};

var realm = Realm.GetInstance(config);
