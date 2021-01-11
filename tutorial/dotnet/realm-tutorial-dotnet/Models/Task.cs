using System;
using System.Collections.Generic;
using MongoDB.Bson;
using Realms;

namespace realm_tutorial_dotnet
{
    public class Task : RealmObject
    {
        [PrimaryKey]
        [MapTo("_id")]
        [Required]
        public string Id { get; set; } = ObjectId.GenerateNewId().ToString();

        [MapTo("owner")]
        public IList<Project> Owner { get; }

        [MapTo("name")]
        [Required]
        public string Name { get; set; }

        [MapTo("status")]
        public string Status { get; set; }

        public enum TaskStatus
        {
            Open,
            InProgress,
            Complete
        }
    }
}
