final frodoSubscription = frodo.changes.listen((changes) {
  changes.isDeleted; // if the object has been deleted
  changes.object; // the RealmObject being listened to, `frodo`
  changes.properties; // the changed properties
});
