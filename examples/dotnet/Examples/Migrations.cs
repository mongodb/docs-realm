using System;
using System.Linq;
using MongoDB.Bson;
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
                    //   "Person200": "Person",
                    //   "Person400":"Person"}
                    // }
                    var oldPeople = migration.OldRealm.All<Person200>();
                    var newPeople = migration.NewRealm.All<Person400>();
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
        //:replace-start: {
        // "terms": {
        //   "Person100": "Person"}
        // }
        public class Person100 : RealmObject
        {
            [PrimaryKey]
            [MapTo("_id")]
            public ObjectId Id { get; set; }
            public string FirstName { get; set; }
            public int Age { get; set; }
        }
        //:replace-end:
        // :code-block-end:

        // :code-block-start: ro2
        //:replace-start: {
        // "terms": {
        //   "Person200": "Person"
        // }}
        public class Person200 : RealmObject
        {
            [PrimaryKey]
            [MapTo("_id")]
            public ObjectId Id { get; set; }

            public string FirstName { get; set; }
            public string LastName { get; set; }
            public int Age { get; set; }
        }
        // :replace-end:
        // :code-block-end:

        // :code-block-start: ro3
        //:replace-start: {
        // "terms": {
        //   "Person300": "Person"
        // }}
        public class Person300 : RealmObject
        {
            [PrimaryKey]
            [MapTo("_id")]
            public ObjectId Id { get; set; }

            public string FullName { get; set; }
            public int Age { get; set; }
        }
        // :replace-end:
        // :code-block-end:

        // :code-block-start: ro4
        //:replace-start: {
        // "terms": {
        //   "Person400": "Person"
        // }}
        public class Person400 : RealmObject
        {
            [PrimaryKey]
            [MapTo("_id")]
            public ObjectId Id { get; set; }

            public string FullName { get; set; }
            public DateTimeOffset Birthday { get; set; }
        }
        // :replace-end:
        // :code-block-end:
    }
}
