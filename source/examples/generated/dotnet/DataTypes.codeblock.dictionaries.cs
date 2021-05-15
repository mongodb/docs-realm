
public class Inventory : RealmObject
{
    // The key must be of type string; the value can be 
    // of any Realm-supported type, including objects
    // that inherit from RealmObject or EmbeddedObject
    public IDictionary<string, Plant> PlantDict { get; }

    public IDictionary<string, bool> BooleansDict { get; }

    // Nullable types are supported in local-only
    // Realms, but not with Sync
    public IDictionary<string, int?> NullableIntDict { get; }

    // For C# types that are implicitly nullable, you can
    // use the [Required] attribute to prevent storing null values
    [Required]
    public IDictionary<string, string> RequiredStringsDict { get; }
}
