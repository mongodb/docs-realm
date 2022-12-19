// :snippet-start:task-object-model
using MongoDB.Bson;
using Realms;

namespace Examples.Models
{
<<<<<<< HEAD
    public class Item : RealmObject
=======
    public partial class Task : IRealmObject
>>>>>>> 6b04f802 (source solution updated and all tests pass)
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