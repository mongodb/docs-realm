items = realm.All<Item>().Where(i => i.Status == "Open");
