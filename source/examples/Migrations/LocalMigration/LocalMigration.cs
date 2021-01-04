var config = new RealmConfiguration
{
    SchemaVersion = 3,
    MigrationCallback = (migration, oldSchemaVersion) =>
    {
        var oldPeople = migration.OldRealm.All("Person");
        var newPeople = migration.NewRealm.All("Person");

        // Migrate Person objects
        for (var i = 0; i < newPeople.Count(); i++)
        {
            var oldPerson = oldPeople.ElementAt(i);
            var newPerson = newPeople.ElementAt(i);
            
            newPerson.FullName = oldPerson.FirstName + " " + oldPerson.LastName;
        }
    }
};

var realm = Realm.GetInstance(config);
