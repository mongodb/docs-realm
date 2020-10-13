// :code-block-start:task-object-model
using MongoDB.Bson;
using Realms;

namespace dotnet
{
    public class Task : RealmObject
    {
        [PrimaryKey]
        [MapTo("_id")]
        public ObjectId _id { get; set; }

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

        public Task()
        {
            this._id = ObjectId.GenerateNewId();
        }
    }

    public enum TaskStatus
    {
        Open,
        InProgress,
        Complete
    }
}
// :code-block-end:
