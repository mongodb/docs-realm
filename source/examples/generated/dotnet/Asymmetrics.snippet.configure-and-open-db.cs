var config = new FlexibleSyncConfiguration(user)
{
    Schema = new[] { typeof(Measurement) }
};

realm = Realm.GetInstance(config);
