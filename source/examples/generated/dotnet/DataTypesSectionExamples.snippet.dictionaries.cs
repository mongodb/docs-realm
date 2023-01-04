
public partial class Inventory : IRealmObject
{
    // The key must be of type string; the value can be 
    // of any Realm-supported type, including objects
    // that inherit from RealmObject or EmbeddedObject
    public IDictionary<string, Plant> Plants { get; }

    public IDictionary<string, bool> BooleansDictionary { get; }

    // Nullable types are supported in local-only
    // Realms, but not with Sync
    public IDictionary<string, int?> NullableIntDictionary { get; }

    // For C# types that are implicitly nullable, you can
    // use the [Required] attribute to prevent storing null values
    [Required]
    public IDictionary<string, string> RequiredStringsDictionary { get; }
}
