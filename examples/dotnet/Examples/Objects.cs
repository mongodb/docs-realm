using System;
using System.Collections.Generic;
using System.Linq;
using MongoDB.Bson;
using Realms;

namespace ObjectExamples
{
    // :code-block-start: embedded
    public class Address : EmbeddedObject
    {
        public ObjectId Id { get; set; }
        public string Street { get; set; }
        public string City { get; set; }
    }
    public class Contact : RealmObject
    {
        [PrimaryKey]
        public ObjectId Id { get; set; }
        public string Name { get; set; }
        public Address Address { get; set; } // embed a single address 
    }
    // :code-block-end:

    // :code-block-start: primary-key
    public class Dog : RealmObject
    {
        [PrimaryKey]
        public string Name { get; set; }
        public int Age { get; set; }
        public Person Owner { get; set; }
    }
    // :code-block-end:

    // :code-block-start: required
    public class Person : RealmObject
    {
        [Required]
        public string Name { get; set; }
        public IList<Dog> Dogs { get; }
    }
    // :code-block-end:

    // :code-block-start: default
    // :replace-start: {
    //  "terms": {
    //      "Person1": "Person" }
    // }
    public class Person1 : RealmObject
    {
        public string Name { get; set; } = "foo";
    }
    // :replace-end:
    // :code-block-end:

    // :code-block-start: index
    // :replace-start: {
    //  "terms": {
    //      "Person2": "Person" }
    // }
    public class Person2 : RealmObject
    {
        [Indexed]
        public string Name { get; set; }
        public IList<Dog> Dogs { get; }
    }
    // :replace-end:
    // :code-block-end:

    // :code-block-start: rel-to-one
    // :replace-start: {
    //     "terms": {
    //      "Person3": "Person",
    //      "Dog3": "Dog" }
    // }
    public class Dog3 : RealmObject
    {
        // ... other property declarations
        public Person3 Owner { get; set; }
    }

    public class Person3 : RealmObject
    {
        public string Name { get; set; }
    }
    // :replace-end:
    // :code-block-end:

    // :code-block-start: rel-to-many
    // :replace-start: {
    //  "terms": {
    //   "Person4": "Person",
    //   "Dog4" : "Dog" }
    // }
    public class Dog4 : RealmObject
    {
        public string Name { get; set; }
    }

    public class Person4 : RealmObject
    {
        // ... other property declarations
        public IList<Dog> Dogs { get; }
    }
    // :replace-end:
    // :code-block-end:

    // :code-block-start: inverse
    //  :replace-start: {
    //  "terms": {
    //   "Person5": "Person",
    //   "Dog5":"Dog" }
    // }
    class Dog5 : RealmObject
    {
        // To-one relationship from the Dog to its owner
        public Person5 Owner { get; set; }
    }

    class Person5 : RealmObject
    {
        // An inverse relationship that returns all Dog instances that have Dog.Owner set to
        // the current Person.
        [Backlink(nameof(Dog5.Owner))]
        public IQueryable<Dog5> Dogs { get; }

        // To-many relationship, containing a collection of all hobbies the current person enjoys
        public IList<Hobby> Hobbies { get; }
    }

    class Hobby : RealmObject
    {
        // An inverse relationship that returns all Person instances that have the current Hobby
        // instance in their Hobbies list.
        [Backlink(nameof(Person5.Hobbies))]
        public IQueryable<Person5> PeopleWithThatHobby { get; }
        // :replace-end:
    }
    // :code-block-end:

    class IgnorantRenamer
    {
        // :code-block-start: ignore
        [Ignored]
        public Image Headshot { get; set; }
        // :code-block-end:
        // :code-block-start: rename
        public class Person : RealmObject
        {
            [MapTo("moniker")]
            public string Name { get; set; }
        }
        // :code-block-end:

        public class Image
        {
        }
    }

    // :code-block-start: rename-class
    //:replace-start: {
    // "terms": {
    //   "Person6": "Person"}
    // }
    [MapTo("Human")]
    public class Person6 : RealmObject
    {
        public string Name { get; set; }
    }
    // :replace-end:
    // :code-block-end:



    // :code-block-start: subset
    // Declare your schema
    class LoneClass : RealmObject
    {
        public string Name { get; set; }
    }

    class AnotherClass
    {
        private void SetUpMyRealmConfig()
        {
            // Define your config with a single class
            var config = new RealmConfiguration("RealmWithOneClass.realm");
            config.ObjectClasses = new[] { typeof(LoneClass) };

            // Or, specify multiple classes to use in the Realm
            config.ObjectClasses = new[] { typeof(Dog), typeof(Cat) };
        }
    }
    // :code-block-end:

    class Cat
    { }

}
