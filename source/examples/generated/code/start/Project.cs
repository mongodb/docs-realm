using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using Realms;

namespace dotnet
{
    public class Project : RealmObject
    {
        [PrimaryKey]
        [BsonElement("_id")]
        public ObjectId _id { get; set; }
        [BsonElement("_partition")]
        public string Partition { get; set; }
        [BsonElement("name")]
        [Required]
        public string Name { get; set; }
    }
}