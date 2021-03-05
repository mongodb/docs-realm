using System;
using NUnit.Framework;
using Realms;

namespace Examples
{
    // :code-block-start:realmint-class
    public class MyRealmClass : RealmObject
    {
        [PrimaryKey]
        public int _id { get; set; }
        public RealmInteger<int> Counter { get; set; }
    }
    // :code-block-end:
    public class TestClass
    {
        Realm realm;
        [OneTimeSetUp]
        public void Init()
        {
            var config = new InMemoryConfiguration("borkbork");
            realm = Realm.GetInstance(config);
        }

        [Test]
        public void Increment()
        {

            var mrc = new MyRealmClass()
            {
                Counter = 0
            };

            realm.Write(() =>
            {
                realm.Add(mrc);
            });

            var id = mrc._id;
            //:code-block-start:realmint-use
            var myObject = realm.Find<MyRealmClass>(id);
            var counter = myObject.Counter; // 0

            realm.Write(() =>
            {
                // Increment the value of the RealmInteger
                myObject.Counter.Increment(); // 1
                myObject.Counter.Increment(5); // 6

                //:hide-start:
                Assert.AreEqual(6, myObject.Counter);
                //:hide-end:
                // Decrement the value of the RealmInteger
                // Note the use of Increment with a negative number
                myObject.Counter.Decrement(); // 5
                //:hide-start:
                Assert.AreEqual(5, myObject.Counter);
                //:hide-end:
                myObject.Counter.Increment(-3); // 2
                //:hide-start:
                Assert.AreEqual(2, myObject.Counter);
                //:hide-end:

                // Reset the RealmInteger
                myObject.Counter = 0;

                // RealmInteger<T> is implicitly convertable to T:
                int bar = myObject.Counter;
                //:code-block-end:
            });
            Assert.AreEqual(0, myObject.Counter);
        }
    }
}
