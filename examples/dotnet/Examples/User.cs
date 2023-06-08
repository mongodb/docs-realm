using Realms;

#nullable enable

namespace Examples.Models
{
    public class User : RealmObject
    {
        [PrimaryKey]
        [MapTo("_id")]
        public string _id { get; set; }

        [MapTo("image")]
        public string Image { get; set; }
    }
}