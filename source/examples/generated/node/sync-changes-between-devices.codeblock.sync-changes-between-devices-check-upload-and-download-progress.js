const OpenRealmBehaviorConfiguration = {
  type: "openImmediately",
};

var config = {
  schema: [DogSchema], // predefined schema
  sync: {
    user: app.currentUser,
    partitionValue: "MyPartitionValue",
    newRealmFileBehavior: OpenRealmBehaviorConfiguration,
    existingRealmFileBehavior: OpenRealmBehaviorConfiguration,
  },
};
let realm = await Realm.open(config);
const syncSession = realm.syncSession;
syncSession.addProgressNotification(
  "upload",
  "reportIndefinitely",
  (transferred, transferable) => {
    console.log(`${transferred} bytes has been transferred`);
    console.log(
      `There are ${transferable} total transferable bytes, including the ones that have already been transferred`
    );
  }
);
// Upload something
let dog;
realm.write(() => {
  dog = realm.create("Dog", {
    name: "Fido",
    age: 2,
  });
});
// use dog

// remember to unregister the progress notifications
syncSession.removeProgressNotification((transferred, transferable) => {
  console.log(`There was ${transferable} total transferable bytes`);
  console.log(`${transferred} bytes were transferred`);
});
