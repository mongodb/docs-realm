using MongoDB.Bson;
using Realms;

namespace dotnet
{
    public class Task : RealmObject
    {
        [PrimaryKey]
        [MapTo("_id")]
        public ObjectId Id { get; set; } = ObjectId.GenerateNewId();

        [MapTo("_partition")]
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
