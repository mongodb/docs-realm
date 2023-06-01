using Realms;

namespace Examples.Models
{
    public class User : RealmObject
    {
        [PrimaryKey]
        [MapTo("_id")]
        public string _id { get; set; }

        [MapTo("_partition")]
        public string Partition { get; set; }

        [MapTo("image")]
        public string Image { get; set; }

        [MapTo("name")]
        public string Name { get; set; }
    }
}