using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using Realms;
using Realms.Schema;
using Realms.Weaving;

namespace Examples.Models
{
    // :snippet-start: plant-class
    public partial class Plant : IRealmObject
    //:remove-end:
    {
        //:remove-start:
        [PrimaryKey]
        [MapTo("_id")]
        //:remove-end:
        [BsonElement("_id")]
        public ObjectId Id { get; set; } = ObjectId.GenerateNewId();

        [BsonElement("name")]
        public string Name { get; set; }

        [BsonElement("sunlight")]
        [BsonRepresentation(BsonType.String)]
        public string Sunlight { get; set; }

        [BsonElement("color")]
        [BsonRepresentation(BsonType.String)]
        public string Color { get; set; }

        [BsonElement("type")]
        [BsonRepresentation(BsonType.String)]
        public string Type { get; set; }

        [BsonElement("_partition")]
        public string Partition { get; set; }

        public IRealmAccessor Accessor => throw new System.NotImplementedException();

        public bool IsManaged => throw new System.NotImplementedException();

        public bool IsValid => throw new System.NotImplementedException();

        public bool IsFrozen => throw new System.NotImplementedException();

        public Realm Realm => throw new System.NotImplementedException();

        public ObjectSchema ObjectSchema => throw new System.NotImplementedException();

        public DynamicObjectApi DynamicApi => throw new System.NotImplementedException();

        public int BacklinksCount => throw new System.NotImplementedException();

        public void SetManagedAccessor(IRealmAccessor accessor, IRealmObjectHelper helper = null, bool update = false, bool skipDefaults = false)
        {
            throw new System.NotImplementedException();
        }
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
    // :snippet-end:
}
