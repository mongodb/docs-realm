public class Inventory : RealmObject
{
    // A Set can contain any Realm-supported type, including
    // objects that inherit from RealmObject
    public ISet<Plant> PlantSet { get; }

    public ISet<double> DoubleSet { get; }

    // Nullable types are supported in local-only
    // Realms, but not with Sync
    public ISet<int?> NullableIntsSet { get; }

    // For C# types that are implicitly nullable, you can
    // use the [Required] attribute to prevent storing null values
    [Required]
    public ISet<string> RequiredStrings { get; }
}
