using System;
using System.Collections.Generic;
using System.Linq;
using MongoDB.Bson;
using Realms;

namespace ObjectExamples
{
    // :code-block-start: embedded
    // :replace-start: {
    //  "terms": {
    //      "Address10": "Address",
    //       "Contact10": "Contact"}
    // }
    public class Address10 : EmbeddedObject
    {
        public ObjectId Id { get; set; }
        public string Street { get; set; }
        public string City { get; set; }
    }
    public class Contact10 : RealmObject
    {
        [PrimaryKey]
        [MapTo("_id")]
        public ObjectId Id { get; set; }
        public string Name { get; set; }
        public Address10 Address { get; set; } // embed a single address 
    }
    // :replace-end:
    // :code-block-end:

    // :code-block-start: primary-key
    // :replace-start: {
    //  "terms": {
    //      "PersonA": "Person",
    //      "DogA": "Dog",
    //      "//[NotPrimaryKey]": "[PrimaryKey]" }
    // }
    public class DogA : RealmObject
    {
        //:hide-start:
        [PrimaryKey]
        [MapTo("_id")]
        public ObjectId ID { get; set; }
        //:hide-end:
        //[NotPrimaryKey]
        public string Name { get; set; }
        public int Age { get; set; }
        public PersonA Owner { get; set; }
    }
    //:replace-end:
    // :code-block-end:

    // :code-block-start: required
    // :replace-start: {
    //  "terms": {
    //      "PersonA": "Person",
    //      "DogA": "Dog"}
    // }
    public class PersonA : RealmObject
    {
        //:hide-start:
        [PrimaryKey]
        [MapTo("_id")]
        public ObjectId ID { get; set; }
        //:hide-end:
        [Required]
        public string Name { get; set; }
        public IList<DogA> Dogs { get; }
    }
    //:replace-end:
    // :code-block-end:

    // :code-block-start: default
    // :replace-start: {
    //  "terms": {
    //      "Person1": "Person" }
    // }
    public class Person1 : RealmObject
    {
        //:hide-start:
        [PrimaryKey]
        [MapTo("_id")]
        public ObjectId ID { get; set; }
        //:hide-end:
        public string Name { get; set; } = "foo";
    }
    // :replace-end:
    // :code-block-end:

    // :code-block-start: index
    // :replace-start: {
    //  "terms": {
    //      "Person20": "Person",
    //      "DogA": "Dog"}
    // }
    public class Person20 : RealmObject
    {
        //:hide-start:
        [PrimaryKey]
        [MapTo("_id")]
        public ObjectId ID { get; set; }
        //:hide-end:
        [Indexed]
        public string Name { get; set; }
        public IList<DogA> Dogs { get; }
    }
    // :replace-end:
    // :code-block-end:

    // :code-block-start: rel-to-one
    // :replace-start: {
    //     "terms": {
    //      "Person30": "Person",
    //      "Dog30": "Dog" }
    // }
    public class Dog30 : RealmObject
    {
        //:hide-start:
        [PrimaryKey]
        [MapTo("_id")]
        public ObjectId ID { get; set; }
        //:hide-end:
        // ... other property declarations
        public Person30 Owner { get; set; }
    }

    public class Person30 : RealmObject
    {
        //:hide-start:
        [PrimaryKey]
        [MapTo("_id")]
        public ObjectId ID { get; set; }
        //:hide-end:
        // ... other property declarations
        public string Name { get; set; }
    }
    // :replace-end:
    // :code-block-end:

    // :code-block-start: rel-to-many
    // :replace-start: {
    //  "terms": {
    //   "Person40": "Person",
    //   "Dog40" : "Dog" }
    // }
    public class Dog40 : RealmObject
    {
        //:hide-start:
        [PrimaryKey]
        [MapTo("_id")]
        public ObjectId ID { get; set; }
        //:hide-end:
        // ... other property declarations
        public string Name { get; set; }
    }

    public class Person40 : RealmObject
    {
        //:hide-start:
        [PrimaryKey]
        [MapTo("_id")]
        public ObjectId ID { get; set; }
        //:hide-end:
        // ... other property declarations
        public IList<Dog40> Dogs { get; }
    }
    // :replace-end:
    // :code-block-end:

    // :code-block-start: inverse
    //  :replace-start: {
    //  "terms": {
    //   "Person50": "Person",
    //   "Dog50":"Dog" }
    // }
    class Dog50 : RealmObject
    {
        //:hide-start:
        [PrimaryKey]
        [MapTo("_id")]
        public ObjectId ID { get; set; }
        //:hide-end:
        // To-one relationship from the Dog to its owner
        public Person50 Owner { get; set; }
    }

    class Person50 : RealmObject
    {
        //:hide-start:
        [PrimaryKey]
        [MapTo("_id")]
        public ObjectId ID { get; set; }
        //:hide-end:
        // An inverse relationship that returns all Dog instances that have Dog.Owner set to
        // the current Person.
        [Backlink(nameof(Dog50.Owner))]
        public IQueryable<Dog50> Dogs { get; }

        // To-many relationship, containing a collection of all hobbies the current person enjoys
        public IList<Hobby> Hobbies { get; }
    }

    class Hobby : RealmObject
    {
        //:hide-start:
        [PrimaryKey]
        [MapTo("_id")]
        public ObjectId ID { get; set; }
        //:hide-end:
        // An inverse relationship that returns all Person instances that have the current Hobby
        // instance in their Hobbies list.
        [Backlink(nameof(Person50.Hobbies))]
        public IQueryable<Person50> PeopleWithThatHobby { get; }
        // :replace-end:
    }
    // :code-block-end:

    class IgnorantRenamer
    {
        //:hide-start:
        [PrimaryKey]
        [MapTo("_id")]
        public ObjectId ID { get; set; }
        //:hide-end:
        // :code-block-start: ignore
        // Rather than store an Image in Realm,
        // store the path to the Image...
        public string ThumbnailPath { get; set; }

        // ...and the Image itself can be
        // in-memory when the app is running:
        [Ignored]
        public Image Thumbnail { get; set; }
        // :code-block-end:

        // :code-block-start: rename
        //:replace-start: {
        // "terms": {
        //   "Person60": "Person"}
        // }
        public class Person60 : RealmObject
        {
            //:hide-start:
            [PrimaryKey]
            [MapTo("_id")]
            public ObjectId ID { get; set; }
            //:hide-end:
            [MapTo("moniker")]
            public string Name { get; set; }
        }
        //:replace-end:
        // :code-block-end:

        public class Image
        {
        }
    }

    public class CustomGetterSetter : RealmObject
    {
        [PrimaryKey]
        public string _id { get; set; } = ObjectId.GenerateNewId().ToString();
        // :code-block-start: custom-setter
        // This property will be stored in the Realm
        private string email { get; set; }

        // Custom validation of the email property.
        // This property is *not* stored in Realm.
        public string Email
        {
            get { return email; }
            set
            {
                if (!value.Contains("@")) throw new Exception("Invalid email address");
                email = value;
            }
        }
        // :code-block-end:
    }

    // :code-block-start: rename-class
    //:replace-start: {
    // "terms": {
    //   "Person70": "Person",
    //      "DogA": "Dog"}
    // }
    [MapTo("Human")]
    public class Person70 : RealmObject
    {
        //:hide-start:
        [PrimaryKey]
        [MapTo("_id")]
        public ObjectId ID { get; set; }
        //:hide-end:
        public string Name { get; set; }
    }
    // :replace-end:
    // :code-block-end:



    // :code-block-start: subset
    //:replace-start: {
    // "terms": {
    //      "DogA": "Dog"}
    // }
    // Declare your schema
    class LoneClass : RealmObject
    {
        //:hide-start:
        [PrimaryKey]
        [MapTo("_id")]
        public ObjectId ID { get; set; }
        //:hide-end:
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
            config.ObjectClasses = new[] { typeof(DogA), typeof(Cat) };
        }
    }
    // :replace-end:
    // :code-block-end:

    class Cat
    { }

}
