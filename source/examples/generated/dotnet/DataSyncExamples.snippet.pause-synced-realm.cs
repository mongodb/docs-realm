var session = realm.SyncSession;
session.Stop();
//later...
session.Start();
