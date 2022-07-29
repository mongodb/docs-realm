final buyMilkSubscription = buyMilk.changes.listen((changes) {
    changes.isDeleted; // if the object has been deleted
    changes.object; // the RealmObject being listened to, `buyMilk`
    changes.properties; // the changed properties
 });
