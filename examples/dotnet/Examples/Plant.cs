using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using Realms;

namespace Examples
{
    // :code-block-start: plant-class
    public class Plant
    {
        [BsonElement("_id")]
        public ObjectId Id { get; set; } = ObjectId.GenerateNewId();

        [BsonElement("name")]
        public string Name { get; set; }

        [BsonElement("sunlight")]
        [BsonRepresentation(BsonType.String)]
        public Sunlight Sunlight { get; set; }

        [BsonElement("color")]
        [BsonRepresentation(BsonType.String)]
        public PlantColor Color { get; set; }

        [BsonElement("type")]
        [BsonRepresentation(BsonType.String)]
        public PlantType Type { get; set; }

        [BsonElement("_partition")]
        public string Partition { get; set; }
    }
    public enum Sunlight
    {
        Full,
        Partial
    }
    public enum PlantColor
    {
        White,
        Green,
        Yellow,
        Purple
    }
    public enum PlantType
    {
        Perennial,
        Annual
    }
    // :code-block-end:
}
