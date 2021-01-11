using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using Realms;

namespace realm_tutorial_dotnet
{
    public class Member : RealmObject
    {
        [PrimaryKey]
        [BsonElement("_id")]
        [MapTo("_id")]
        public string Id { get; set; }

        [BsonElement("name")]
        [MapTo("name")]
        [BsonRepresentation(BsonType.String)]
        public string name { get; set; }
    }
}
