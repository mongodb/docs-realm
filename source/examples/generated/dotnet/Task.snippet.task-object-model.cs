using MongoDB.Bson;
using Realms;

#nullable enable

namespace Examples.Models
{
    public class Item : RealmObject
    {
        [PrimaryKey]
        [MapTo("_id")]
        public ObjectId Id { get; set; } = ObjectId.GenerateNewId();

        [MapTo("assignee")]
        public User Assignee { get; set; }

        [MapTo("name")]
        public string? Name { get; set; }

        [MapTo("status")]
        public string? Status { get; set; }
    }
