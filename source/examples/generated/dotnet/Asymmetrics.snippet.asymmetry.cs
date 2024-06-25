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
