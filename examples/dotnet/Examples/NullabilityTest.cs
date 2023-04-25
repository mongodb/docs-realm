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
    //   "NullableFoo": "Person",
    //   "NullableBar": "Dog"}
    // }
    // :uncomment-start:
    //#nullable enable
    // :uncomment-end:
    public partial class NullableFoo : IRealmObject
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
        public NullableBar? MyNullableBar { get; set; }

        // :uncomment-start:
        //public NullableBar MyNullableBar { get; set; } // Compile-time error
        // :uncomment-end:
        // Error: Type Dog does not support the assigned
        // nullability annotation.

        /* List of Realm Objects */
        public IList<NullableBar> MyNullableBars { get; }

        // :uncomment-start:
        //public IList<int>? NullableIntList { get; } // Compile-time error
        // :uncomment-end:
        // Error: Person.NullableIntList has type IList<int>?,
        // that does not support the assigned nullability annotation.
    }

    //:replace-end:
    //:snippet-end:
    public partial class NullableBar : IEmbeddedObject
    {
    }
}

