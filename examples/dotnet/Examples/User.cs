// :code-block-start:user-object-model
using Realms;
using MongoDB.Bson;

namespace dotnet
{
    public class User : RealmObject
    {
        [PrimaryKey]
        [MapTo("_id")]
        [Required]
        public string _id { get; set; }

        [MapTo("_partition")]
        public string Partition { get; set; }

        [MapTo("image")]
        public string Image { get; set; }

        [MapTo("name")]
        [Required]
        public string Name { get; set; }
    }
}
// :code-block-end: