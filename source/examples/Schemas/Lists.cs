<<<<<<< HEAD
public class Image : RealmObject
{
    // Other properties...

    public IList<string> Tags { get; }

    public IList<double?> Ratings { get; }
=======
public class Person : RealmObject 
{
    public string Name { get; set; }
    public RealmList<String> Dogs { get; set; } 
>>>>>>> 5763d8d... DOCSP-13320 added all code examples
}