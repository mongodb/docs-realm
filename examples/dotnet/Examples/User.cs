using Realms;

namespace Examples.Models
{
    public partial class User : IRealmObject
    {
        [PrimaryKey]
        [MapTo("_id")]
        [Required]
        public string _id { get; set; }

        [MapTo("_partition")]
        [Required]
        public string Partition { get; set; }

        [MapTo("image")]
        public string Image { get; set; }

        [MapTo("name")]
        [Required]
        public string Name { get; set; }
    }
}