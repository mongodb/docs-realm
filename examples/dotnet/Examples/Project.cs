using MongoDB.Bson;
using Realms;

namespace dotnet
{
    public class Project : RealmObject
    {
        [PrimaryKey]
        [MapTo("_id")]
        public ObjectId Id { get; set; }
        [MapTo("_partition")]
        public string Partition { get; set; }
        [MapTo("name")]
        [Required]
        public string Name { get; set; }
    }
}