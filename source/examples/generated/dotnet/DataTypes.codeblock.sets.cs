public class Inventory : RealmObject
{
    // A Set can contain any Realm-supported type, including
    // objects that inherit from RealmObject or EmbeddedObject
    public ISet<Plant> PlantSet { get; }

    public ISet<double> DoubleSet { get; }

    // nullable values are supported
    public ISet<int?> NullableIntsSet { get; }

    // For C# types that are implicitly nullable, you can
    // use the [Required] attribute to prevent storing null values
    [Required]
    public ISet<string> RequiredStrings { get; }
}
