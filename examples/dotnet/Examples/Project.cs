using MongoDB.Bson;
using Realms;

namespace Examples.Models
{
    public partial class Project : IRealmObject
    {
        [PrimaryKey]
        [MapTo("_id")]
        public ObjectId _id { get; set; }
        [MapTo("_partition")]
        [Required]
        public string Partition { get; set; }
        [MapTo("name")]
        [Required]
        public string Name { get; set; }
    }
}