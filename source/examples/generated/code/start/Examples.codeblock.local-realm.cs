var config = new RealmConfiguration(pathToDb)
{
    IsReadOnly = true,
};
var localRealm = Realm.GetInstance(config);