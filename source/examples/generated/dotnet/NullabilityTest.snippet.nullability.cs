#nullable enable
public partial class Person : IRealmObject
{
    /* Reference Types */
    public string RequiredName { get; set; }
    public string? NullableName { get; set; }
    public byte[] RequiredArray { get; set; }
    public byte[]? NullableArray { get; set; }

    /* Realm Objects */

    public Dog? ANullableDog { get; set; }
    public Dog ANonNullableDog { get; set; } // Compile-time error

    /* Collections of Primatives */

    public IList<int> RequiredIntList { get; }
    public IList<int?> IntListWithNullableValues { get; }
    public IList<int>? NullableListOfInts { get; } // Compile-time error

    /* Collections of Realm Objects */

    public IList<Dog> AListOfNonNullableDogs { get; }
    public IList<Dog?> AListOfNNullableDogs { get; } // Compile-time error
    public IDictionary<string, Dog?> MyDictionaryOfNullableObjects { get; }
    public IDictionary<string, Dog>? MyNullableDictionaryOfObjects { get; } // Compile-time error
}

