// :snippet-start:task-object-model
using MongoDB.Bson;
using Realms;

namespace Examples.Models
{
    public class Item : RealmObject
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
    // :snippet-end:
    public enum ItemStatus
    {
        Open,
        InProgress,
        Complete
    }
}