// :code-block-start:task-object-model
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using Realms;

namespace dotnet
{
    public class Task : RealmObject
    {
        [PrimaryKey]
        [BsonElement("_id")]
        public ObjectId _id { get; set; }

        [BsonElement("_partition")]
        public string Partition { get; set; }

        [BsonElement("assignee")]
        public User Assignee { get; set; }

        [BsonElement("name")]
        [Required]
        public string Name { get; set; }

        [BsonElement("status")]
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
