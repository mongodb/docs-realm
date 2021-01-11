using System;
using System.Collections.Generic;
using Realms;

namespace realm_tutorial_dotnet
{
    public class User : RealmObject
    {
        [PrimaryKey]
        [MapTo("_id")]
        [Required]
        public string Id { get; set; }

        [MapTo("_partition")]
        [Required]
        public string Partition { get; set; }

        [MapTo("memberOf")]
        public IList<Project> MemberOf { get; }

        [MapTo("name")]
        [Required]
        public string Name { get; set; }
    }
}
