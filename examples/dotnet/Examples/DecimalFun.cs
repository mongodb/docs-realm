using System;
using System.Linq;
using MongoDB.Bson;
using Realms;
using Realms.Sync;

namespace Examples
{
    public class DecimalFun
    {
        public DecimalFun()
        {
        }
    }

    // :code-block-start: decimal128
    public class MyClassWithDecimals { 
        [PrimaryKey]
        public ObjectId _id { get; } = ObjectId.GenerateNewId();

        // Standard (96-bit) decimal value type
        public decimal VeryPreciseNumber { get; set; }

        // 128-bit Decimal128 
        public Decimal128 EvenMorePreciseNumber { get; set; }
        public Decimal128 AnotherEvenMorePreciseNumber { get; set; }

        // Nullable decimal or Decimal128 are supported, too
        public decimal? MaybeDecimal { get; set; }
        public Decimal128? MaybeDecimal128 { get; set; }

        public void PlayWithDecimals()
        {
            // :hide-start:
            var app = App.Create("tuts-tijya");
            var user = app.LogInAsync(Credentials.EmailPassword("foo@foo.com", "foobar")).Result;
            var config = new SyncConfiguration("myPart", user);
            var realm = Realm.GetInstanceAsync().Result;
            // :hide-end:
            var myInstance = new MyClassWithDecimals();
            // To store decimal values:
            realm.Write(() =>
            {
                myInstance.VeryPreciseNumber = 1.234567890123456789M;
                myInstance.EvenMorePreciseNumber = Decimal128.Parse("987654321.123456789");

                // Decimal128 has explicit constructors that take a float or a double
                myInstance.EvenMorePreciseNumber = new Decimal128(9.99999);
            });

        }
    }
    // :code-block-end:
}
