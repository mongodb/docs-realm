using System;
using System.Linq;
using System.Xml.Linq;
using Examples.Models;
using NUnit.Framework;
using Realms;
using Realms.Sync;
using Realms.Sync.ErrorHandling;

namespace Examples
{
    public partial class Asymmetrics
    {
        Realm realm;
        const string myAppId = Config.FSAppId;

        [OneTimeSetUp]
        public void Setup()
        {
            // :snippet-start: connect-and-authenticate
            App app = App.Create(myAppId);
            Realms.Sync.User user = app.LogInAsync(
                Credentials.Anonymous()).Result;
            // :snippet-end:
            
            // :snippet-start: configure-and-open-db
            var config = new FlexibleSyncConfiguration(user)
            {
                Schema = new[] { typeof(Measurement) }
            };

            realm = Realm.GetInstance(config);
            // :snippet-end:

            // You cannot add a subscription for an AsymmetricObject
            // This causes a compile-time error:
            // :uncomment-start:
            //realm.Subscriptions.Update(() =>
            //{
            //    realm.Subscriptions.Add(realm.All<Measurement>());
            //});
            // :uncomment-end:
        }
        [Realms.Explicit]
        // :snippet-start: define-asymmetric-object
        private partial class Measurement : IAsymmetricObject
        {
            [PrimaryKey, MapTo("_id")]
            public Guid Id { get; private set; } = Guid.NewGuid();
            public double Value { get; set; }
            public DateTimeOffset Timestamp { get; private set; } = DateTimeOffset.UtcNow;
        }
        // :snippet-end:
        [Test]
        // :snippet-start: asymmetry
        public void SendMeasurementToRealm()
        {
            var measurement = new Measurement
            {
                Value = 9.876
            };

            realm.Write(() =>
            {
                realm.Add(measurement);
            });

            // The following line will cause a compile time error
            // _ = realm.All<Measurement>();
            // The following line will compile but throw a
            // Realms.Exceptions.RealmInvalidObjectException at runtime
            // _ = measurement.Value;
        }
        // :snippet-end:
    }
}
