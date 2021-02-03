using System;
using System.Linq;
using Realms;

namespace Examples
{
    public class Migrations
    {
        public Migrations()
        {
            // :code-block-start: migrate
            var config = new RealmConfiguration
            {
                SchemaVersion = 4,
                MigrationCallback = (migration, oldSchemaVersion) =>
                {
                    //:replace-start: {
                    // "terms": {
                    //   "Person2": "Person",
                    //   "Person3":"Person"}
                    // }
                    var oldPeople = migration.OldRealm.All<Person2>();
                    var newPeople = migration.NewRealm.All<Person4>();
                    // :replace-end:

                    // Migrate Person objects
                    for (var i = 0; i < newPeople.Count(); i++)
                    {
                        var oldPerson = oldPeople.ElementAt(i);
                        var newPerson = newPeople.ElementAt(i);

                        // Changes from version 1 to 2 (adding LastName) will occur automatically when Realm detects the change

                        // Migrate Person from version 2 to 3: replace FirstName and LastName with FullName
                        // LastName doesn't exist in version 1
                        if (oldSchemaVersion < 2)
                        {
                            newPerson.FullName = oldPerson.FirstName;
                        }
                        else if (oldSchemaVersion < 3)
                        {
                            newPerson.FullName = $"{oldPerson.FirstName} {oldPerson.LastName}";
                        }

                        // Migrate Person from version 3 to 4: replace Age with Birthday
                        if (oldSchemaVersion < 4)
                        {
                            var birthYear = DateTimeOffset.UtcNow.Year - oldPerson.Age;
                            newPerson.Birthday = new DateTimeOffset(birthYear, 1, 1, 0, 0, 0, TimeSpan.Zero);
                        }
                    }
                }
            };
            var realm = Realm.GetInstance(config);
            // :code-block-end:
        }

        // :code-block-start: ro1
        public class Person : RealmObject
        {
            public string FirstName { get; set; }
            public int Age { get; set; }
        }
        // :code-block-end:

        // :code-block-start: ro2
        //:replace-start: {
        // "terms": {
        //   "Person2": "Person"
        // }}
        public class Person2 : RealmObject
        {
            // :replace-end:
            public string FirstName { get; set; }
            public string LastName { get; set; }
            public int Age { get; set; }
        }
        // :code-block-end:

        // :code-block-start: ro3
        //:replace-start: {
        // "terms": {
        //   "Person3": "Person"
        // }}
        public class Person3 : RealmObject
        {
            // :replace-end:
            public string FullName { get; set; }
            public int Age { get; set; }
        }
        // :code-block-end:

        // :code-block-start: ro4
        //:replace-start: {
        // "terms": {
        //   "Person4": "Person"
        // }}
        public class Person4 : RealmObject
        {
            // :replace-end:
            public string FullName { get; set; }
            public DateTimeOffset Birthday { get; set; }
        }
        // :code-block-end:
    }
}
