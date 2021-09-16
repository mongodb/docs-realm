using System.Collections.Generic;
using MongoDB.Bson;
using Realms;

// :code-block-start: player-model
// :state-start: local sync start
public class Player : RealmObject
{

    [PrimaryKey]
    [MapTo("_id")]
    [Required]
    public string Id { get; set; } 


    [MapTo("stats")]
    public IList<Stat> Stats { get; }

    [MapTo("name")]
    [Required]
    public string Name { get; set; }

}
// :state-end: 
// :code-block-end:
