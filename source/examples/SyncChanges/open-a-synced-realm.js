const config = {
    schema: [TaskSchema],
    sync: {
       user: app.currentUser,
       partitionValue: "myPartition",
    }
 };
const realm = await Realm.open(config);