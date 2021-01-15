user = userRealm.All<User>().ToList().Where(u => u.Id ==
    App.realmApp.CurrentUser.Id).FirstOrDefault();