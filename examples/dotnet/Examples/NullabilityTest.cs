using System;
using Realms;
using System.Collections.Generic;
using NUnit.Framework;

namespace Examples
{
    //FYI the "#nullable enable" is commented out to get past VS auto-formatting moving it to the left.

    // :snippet-start: nullability
    // :replace-start: {
    //  "terms": {
    //   "Nullable_Foo": "Person",
    //   "Nullable_Bar": "Dog"}
    // }
    // :uncomment-start:
    //#nullable enable
    // :uncomment-end:
    public partial class Nullable_Foo : IRealmObject
    {
        //:remove-start:

        [PrimaryKey]
        [MapTo("_id")]
        public int Id { get; set; }
        //:remove-end:
        /* Reference Types */

        public string RequiredName { get; set; }
        public string? NullableName { get; set; }
        public byte[] RequiredArray { get; set; }
        public byte[]? NullableArray { get; set; }

        /* Realm Objects */

        public Nullable_Bar? ANullableNullable_Bar { get; set; }
        // public Dog ANonNullableDog { get; set; } // Compile-time error

        /* Collections of Primatives */

        public IList<int> RequiredIntList { get; }
        public IList<int?> IntListWithNullableValues { get; }
        // public IList<int>? NullableListOfInts { get; } // Compile-time error

        /* Collections of Realm Objects */

        public IList<Nullable_Bar> AListOfNonNullableNullable_Bars { get; }
        // public IList<Dog?> AListOfNNullableDogs { get; } // Compile-time error
        public IDictionary<string, Nullable_Bar?> MyDictionaryOfNullableObjects { get; }
        public IDictionary<string, Nullable_Bar> MyDictionaryOfNonNullableObjects { get; }
        // public IDictionary<string, Nullable_Bar>? MyNullableDictionaryOfObjects { get; } // Compile-time error
    }

    //:replace-end:
    //:snippet-end:
    public partial class Nullable_Bar : IEmbeddedObject
    {
        public int Id { get; set; }
    }
}

