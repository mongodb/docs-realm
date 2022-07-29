Todo buyMilk = realm.query<Todo>("summary = 'Buy milk'")[0];
 realm.write(() {
      realm.delete(buyMilk)
 });
