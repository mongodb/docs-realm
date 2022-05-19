using MongoDB.Bson;
using Realms;

namespace LocalOnly
{
    //:snippet-start:guitar-object
    public class Guitar : RealmObject
    {
        [PrimaryKey]
        public ObjectId Id { get; set; } = ObjectId.GenerateNewId();

        [Required]
        public string Make { get; set; }

        [Required]
        public string Model { get; set; }

        public double Price { get; set; }

        public string Owner { get; set; }
    }
    //:snippet-end:
}
