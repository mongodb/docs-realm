using System;
using System.Collections.Generic;
using MongoDB.Bson;
using Realms;

namespace DataBinding
{
    //:snippet-start:binding-classes
    public class Employee : RealmObject
    {
        [PrimaryKey]
        [MapTo("_id")]
        public ObjectId Id { get; set; } = ObjectId.GenerateNewId();

        [MapTo("employee_id")]
        [Required]
        public string EmployeeId { get; set; }

        [MapTo("name")]
        [Required]
        public string Name { get; set; }

        [MapTo("items")]
        public List<Item> Items { get; }

        public Employee()
        {
            this.Items = new List<Item>();
        }
    }

    public class Item : RealmObject
    {
        [PrimaryKey]
        [MapTo("_id")]
        public ObjectId Id { get; set; } = ObjectId.GenerateNewId();

        [MapTo("owner_id")]
        [Required]
        public string OwnerId { get; set; }

        [MapTo("summary")]
        [Required]
        public string Summary { get; set; }

        [MapTo("isComplete")]
        public bool IsComplete { get; set; }
    }
    //:snippet-end:
}

