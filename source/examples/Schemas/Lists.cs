public class Image : RealmObject
{
    // Other properties...

    public IList<string> Tags { get; }

    [Required]
    public IList<double?> Ratings { get; }
}
