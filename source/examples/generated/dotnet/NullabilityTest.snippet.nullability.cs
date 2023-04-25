#nullable enable
public partial class Person : IRealmObject
{
    /* Reference Types */
    public string RequiredName { get; set; }
    public string? NullableName { get; set; }
    public byte[] RequiredArray { get; set; }
    public byte[]? NullableArray { get; set; }

    /* Collections */
    public IList<int> RequiredIntList { get; }
    public IList<int?> IntListWithNullableValues { get; }

    /* Realm Objects */
    public Dog? MyDog { get; set; }

    public Dog MyDog { get; set; } // Compile-time error
    // Error: Type Dog does not support the assigned
    // nullability annotation.

    /* List of Realm Objects */
    public IList<Dog> MyDogs { get; }

    public IList<int>? NullableIntList { get; } // Compile-time error
    // Error: Person.NullableIntList has type IList<int>?,
    // that does not support the assigned nullability annotation.
}

