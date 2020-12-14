public class Person : RealmObject 
{
    public string Name { get; set; }
    public RealmList<String> Dogs { get; set; } 
}