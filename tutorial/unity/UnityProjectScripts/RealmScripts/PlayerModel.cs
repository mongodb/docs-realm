using System.Collections.Generic;
using MongoDB.Bson;
using Realms;

// :code-block-start: player-model
// :state-start: local sync
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
// :state-uncomment-start: start
// // TODO: Realm-ify Player model
// public class PlayerModel {
//  public string _id;
//  public string name;
//  public IList<Stat> stats;
// }
// :state-uncomment-end:
// :code-block-end:
