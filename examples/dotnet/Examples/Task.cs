﻿// :code-block-start:task-object-model
using MongoDB.Bson;
using Realms;

namespace Examples.Models
{
    public class Task : RealmObject
    {
        [PrimaryKey]
        [MapTo("_id")]
        public ObjectId Id { get; set; } = ObjectId.GenerateNewId();

        [MapTo("_partition")]
        [Required]
        public string Partition { get; set; }

        [MapTo("assignee")]
        public User Assignee { get; set; }

        [MapTo("name")]
        [Required]
        public string Name { get; set; }

        [MapTo("status")]
        [Required]
        public string Status { get; set; }
    }

    public enum TaskStatus
    {
        Open,
        InProgress,
        Complete
    }
}
// :code-block-end:
