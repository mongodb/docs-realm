using System;
using System.Collections.Generic;
using System.Linq;
using MongoDB.Bson;
using Realms;

namespace ObjectExamples.Models
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
    //      "DogB": "Dog",
    //      "//[NotPrimaryKey]": "[PrimaryKey]" }
    // }
    public class DogB : RealmObject
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
    //      "DogB": "Dog"}
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
        public IList<DogB> Dogs { get; }
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
    //      "PersonC": "Person",
    //      "DogB": "Dog"}
    // }
    public class PersonC : RealmObject
    {
        //:hide-start:
        [PrimaryKey]
        [MapTo("_id")]
        public ObjectId ID { get; set; }
        //:hide-end:
        [Indexed]
        public string Name { get; set; }
        public IList<DogB> Dogs { get; }
    }
    // :replace-end:
    // :code-block-end:

    // :code-block-start: rel-to-one
    // :replace-start: {
    //     "terms": {
    //      "PersonD": "Person",
    //      "DogC": "Dog" }
    // }
    public class DogC : RealmObject
    {
        //:hide-start:
        [PrimaryKey]
        [MapTo("_id")]
        public ObjectId ID { get; set; }
        //:hide-end:
        // ... other property declarations
        public PersonD Owner { get; set; }
    }

    public class PersonD : RealmObject
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
    //   "PersonE": "Person",
    //   "DogD" : "Dog" }
    // }
    public class DogD : RealmObject
    {
        //:hide-start:
        [PrimaryKey]
        [MapTo("_id")]
        public ObjectId ID { get; set; }
        //:hide-end:
        // ... other property declarations
        public string Name { get; set; }
    }

    public class PersonE : RealmObject
    {
        //:hide-start:
        [PrimaryKey]
        [MapTo("_id")]
        public ObjectId ID { get; set; }
        //:hide-end:
        // ... other property declarations
        public IList<DogD> Dogs { get; }
    }
    // :replace-end:
    // :code-block-end:

    // :code-block-start: inverse
    //  :replace-start: {
    //  "terms": {
    //   "PersonF": "Person",
    //   "DogE":"Dog" }
    // }
    class DogE : RealmObject
    {
        //:hide-start:
        [PrimaryKey]
        [MapTo("_id")]
        public ObjectId ID { get; set; }
        //:hide-end:
        // To-one relationship from the Dog to its owner
        public PersonF Owner { get; set; }
    }

    class PersonF : RealmObject
    {
        //:hide-start:
        [PrimaryKey]
        [MapTo("_id")]
        public ObjectId ID { get; set; }
        //:hide-end:
        // An inverse relationship that returns all Dog instances that have Dog.Owner set to
        // the current Person.
        [Backlink(nameof(DogE.Owner))]
        public IQueryable<DogE> Dogs { get; }

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
        [Backlink(nameof(PersonF.Hobbies))]
        public IQueryable<PersonF> PeopleWithThatHobby { get; }
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
    //      "DogB": "Dog"}
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
            config.Schema = new[] { typeof(DogB), typeof(Cat) };
        }
    }
    // :replace-end:
    // :code-block-end:

    class Cat
    { }

}
