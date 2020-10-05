using MongoDB.Bson;
using Realms;

namespace dotnet
{
    public class RealmUser : RealmObject
    {
        [PrimaryKey]
        [MapTo("_id")]
        [Required]
        public string Id { get; set; }
        [MapTo("_partition")]
        public string Partition { get; set; }
        [MapTo("image")]
        public string Image { get; set; }
        [MapTo("name")]
        [Required]
        public string Name { get; set; }
    }
}