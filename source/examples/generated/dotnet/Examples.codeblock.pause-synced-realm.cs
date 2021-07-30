var session = realm.GetSession();
session.Stop();
//later...
session.Start();
