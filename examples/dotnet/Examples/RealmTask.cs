// :code-block-start:task-object-model
using MongoDB.Bson;
using Realms;
namespace dotnet
{
    public class RealmTask : RealmObject
    {
        [PrimaryKey]
        [MapTo("_id")]
        public ObjectId Id { get; set; }

        [MapTo("_partition")]
        public string Partition { get; set; }

        [MapTo("assignee")]
        public RealmUser Assignee { get; set; }

        [MapTo("name")]
        [Required]
        public string Name { get; set; }

        [MapTo("status")]
        [Required]
        public string Status { get; set; }

        public RealmTask()
        {
            this.Id = ObjectId.GenerateNewId();
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
