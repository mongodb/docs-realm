
using System;
using MongoDB.Bson;
using Realms;
// :code-block-start: stat-model
// :state-start: local sync
public class Stat : RealmObject
{


    [MapTo("_id")]
    [PrimaryKey]
    public ObjectId Id { get; private set; } = ObjectId.GenerateNewId();

    public DateTimeOffset Time { get; private set; } = DateTimeOffset.Now;

    [MapTo("score")]
    public int Score { get; set; }  = 0;

    [MapTo("enemiesDefeated")]
    public int EnemiesDefeated { get; set; } = 0;

    [MapTo("tokensCollected")]
    public int TokensCollected { get; set; } = 0;

    [MapTo("statOwner")]
    public Player StatOwner { get; set; }

    public Stat()
    {

    }
}
// :state-end: 
// :state-uncomment-start: start
// // TODO: Realm-ify Player model
// public class Stat {
//  public ObjectId Id;
//  public int score = 0;
//  public int enemiesDefeated = 0;
//  public int tokensCollected = 0;
//  public Player statOwner;
// }
// :state-uncomment-end:
// :code-block-end:
