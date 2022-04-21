using System;
using System.Collections.Generic;
using System.Linq;
using MongoDB.Bson;
using Realms;
using static Examples.ObjectModelsAndSchemas;

namespace Examples.Models
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


    // STAND-ALONE class; not used elsewhere
    // :code-block-start: primary-key
    // :replace-start: {
    //  "terms": {
    //      "Person_Required": "Person",
    //      "Doge": "Dog",
    //      "//[NotPrimaryKey]": "[PrimaryKey]" }
    // }
    public class Doge : RealmObject
    {
        //:hide-start:
        [PrimaryKey]
        [MapTo("_id")]
        public ObjectId ID { get; set; }
        //:hide-end:
        //[NotPrimaryKey]
        public string Name { get; set; }
        public int Age { get; set; }
        public Person_Required Owner { get; set; }
    }
    //:replace-end:
    // :code-block-end:

    // :code-block-start: required
    // :replace-start: {
    //  "terms": {
    //      "Person_Required": "Person",
    //      "Dog_OMAS": "Dog"}
    // }
    public class Person_Required : RealmObject
    {
        //:hide-start:
        [PrimaryKey]
        [MapTo("_id")]
        public ObjectId ID { get; set; }
        //:hide-end:
        [Required]
        public string Name { get; set; }
        public IList<Dog_OMAS> Dogs { get; }
    }
    //:replace-end:
    // :code-block-end:

    // :code-block-start: default
    // :replace-start: {
    //  "terms": {
    //      "PersonB": "Person" }
    // }
    public class PersonB : RealmObject
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
    //      "Person_Index": "Person",
    //      "Dog_OMAS": "Dog"}
    // }
    public class Person_Index : RealmObject
    {
        //:hide-start:
        [PrimaryKey]
        [MapTo("_id")]
        public ObjectId ID { get; set; }
        //:hide-end:
        [Indexed]
        public string Name { get; set; }
        public IList<Dog_OMAS> Dogs { get; }
    }
    // :replace-end:
    // :code-block-end:

    // :code-block-start: rel-to-one
    // :replace-start: {
    //     "terms": {
    //      "Person_Rel_One_to_One": "Person",
    //      "Dog_Rel_One_to_One": "Dog" }
    // }
    public class Dog_Rel_One_to_One : RealmObject
    {
        //:hide-start:
        [PrimaryKey]
        [MapTo("_id")]
        public ObjectId ID { get; set; }
        //:hide-end:
        // ... other property declarations
        public Person_Rel_One_to_One Owner { get; set; }
    }

    public class Person_Rel_One_to_One : RealmObject
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
    //   "Person_Rel_One_to_Many": "Person",
    //   "Dog_Rel_One_to_Many" : "Dog" }
    // }
    public class Dog_Rel_One_to_Many : RealmObject
    {
        //:hide-start:
        [PrimaryKey]
        [MapTo("_id")]
        public ObjectId ID { get; set; }
        //:hide-end:
        // ... other property declarations
        public string Name { get; set; }
    }

    public class Person_Rel_One_to_Many : RealmObject
    {
        //:hide-start:
        [PrimaryKey]
        [MapTo("_id")]
        public ObjectId ID { get; set; }
        //:hide-end:
        // ... other property declarations
        public IList<Dog_Rel_One_to_Many> Dogs { get; }
    }
    // :replace-end:
    // :code-block-end:

    // :code-block-start: inverse
    //  :replace-start: {
    //  "terms": {
    //   "Person_Inverse": "Person",
    //   "Dog_Inverse":"Dog" }
    // }
    class Dog_Inverse : RealmObject
    {
        //:hide-start:
        [PrimaryKey]
        [MapTo("_id")]
        public ObjectId ID { get; set; }
        //:hide-end:
        // To-one relationship from the Dog to its owner
        public Person_Inverse Owner { get; set; }
    }

    class Person_Inverse : RealmObject
    {
        //:hide-start:
        [PrimaryKey]
        [MapTo("_id")]
        public ObjectId ID { get; set; }
        //:hide-end:
        // An inverse relationship that returns all Dog instances that have Dog.Owner set to
        // the current Person.
        [Backlink(nameof(Dog_Inverse.Owner))]
        public IQueryable<Dog_Inverse> Dogs { get; }

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
        [Backlink(nameof(Person_Inverse.Hobbies))]
        public IQueryable<Person_Inverse> PeopleWithThatHobby { get; }
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
        //   "PersonH": "Person"}
        // }
        public class PersonH : RealmObject
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
    //   "PersonI": "Person",
    //      "DogB": "Dog"}
    // }
    [MapTo("Human")]
    public class PersonI : RealmObject
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
    //      "Dog_OMAS": "Dog"}
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
            config.Schema = new[] { typeof(LoneClass) };

            // Or, specify multiple classes to use in the Realm
            config.Schema = new[] { typeof(Dog_OMAS), typeof(Cat) };
        }
    }
    // :replace-end:
    // :code-block-end:

    class Cat
    { }

}
