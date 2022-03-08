﻿using System;
using System.Collections.Generic;
using MongoDB.Bson;
using Realms;

namespace Examples
{
    public class ObjectModelsAndSchemas
    {
        // Used by 3 tests in Objects.cs

        // :code-block-start: dog_class
        // :replace-start: {
        //  "terms": {
        //   "Dog_OMAS": "Dog" }
        // }
        public class Dog_OMAS : RealmObject
        {
            [PrimaryKey]
            [MapTo("_id")]
            public ObjectId Id { get; set; }

            [Required]
            public string Name { get; set; }

            public int Age { get; set; }
            public string Breed { get; set; }
            public IList<Person> Owners { get; }
        }

        public class Person : RealmObject
        {
            [PrimaryKey]
            [MapTo("_id")]
            public ObjectId Id { get; set; }

            [Required]
            public string Name { get; set; }
            // etc...

            /* To add items to the IList<T>:

            var dog = new Dog();
            var caleb = new Person { Name = "Caleb" };
            dog.Owners.Add(caleb);

            */
        }
        // :replace-end:
        // :code-block-end:
    }
}
