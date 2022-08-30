using System;
using System.Collections.Generic;
using MongoDB.Bson;
using Realms;

namespace DataBinding
{
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
}
