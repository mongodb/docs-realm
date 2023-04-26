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
        // :uncomment-start:
        //public Dog ANonNullableDog { get; set; } // Compile-time error
        // :uncomment-end:

        /* Collections of Primatives */

        public IList<int> RequiredIntList { get; }
        public IList<int?> IntListWithNullableValues { get; }
        // :uncomment-start:
        //public IList<int>? NullableListOfInts { get; } // Compile-time error
        // :uncomment-end:

        /* Collections of Realm Objects */

        public IList<Nullable_Bar> AListOfNonNullableNullable_Bars { get; }
        // :uncomment-start:
        //public IList<Dog?> AListOfNNullableDogs { get; } // Compile-time error
        // :uncomment-end:.
        public IDictionary<string, Nullable_Bar?> MyDictionaryOfNullableObjects { get; }
        public IDictionary<string, Nullable_Bar> MyDictionaryOfNonNullableObjects { get; }
        // :uncomment-start:
        //public IDictionary<string, Nullable_Bar>? MyNullableDictionaryOfObjects { get; } // Compile-time error
        // :uncomment-end:
    }

    //:replace-end:
    //:snippet-end:
    public partial class Nullable_Bar : IEmbeddedObject
    {
        public int Id { get; set; }
    }
}

