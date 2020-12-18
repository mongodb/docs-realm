public class Image : RealmObject
{
    // Other properties...

    public IList<string> Tags { get; }

    public IList<double?> Ratings { get; }
}
