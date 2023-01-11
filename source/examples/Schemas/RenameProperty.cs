public class Person : RealmObject
{
    [MapTo("moniker")]
    public string Name { get; set; }
}
