using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using Realms;

namespace RealmDotnetTutorial.Models
{
    public class Member : RealmObject
    {
        [PrimaryKey]
        [BsonElement("_id")]
        [MapTo("_id")]
        public string Id { get; set; }

        [BsonElement("name")]
        [MapTo("name")]
        public string Name { get; set; }
    }
}
