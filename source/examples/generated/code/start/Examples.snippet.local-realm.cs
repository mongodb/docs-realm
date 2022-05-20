var config = new RealmConfiguration(pathToDb + "/my.realm")
{
    IsReadOnly = true,
};
var localRealm = Realm.GetInstance(config);