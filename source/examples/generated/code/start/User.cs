using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using Realms;

namespace dotnet
{
    public class User : RealmObject
    {
        [PrimaryKey]
        [BsonElement("_id")]
        [Required]
        public string _id { get; set; }

        [BsonElement("_partition")]
        public string Partition { get; set; }

        [BsonElement("image")]
        public string Image { get; set; }

        [BsonElement("name")]
        [Required]
        public string Name { get; set; }
    }
}