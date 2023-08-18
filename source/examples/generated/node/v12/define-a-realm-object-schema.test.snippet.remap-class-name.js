class Task extends Realm.Object {
  static schema = {
    name: "Todo_Item",
    properties: {
      _id: "int",
      name: "string",
      owner_id: "string?",
    },
    primaryKey: "_id",
  };
}

const config = {
  schema: [Task],
  sync: {
    user: anonymousUser,
    flexible: true,
    initialSubscriptions: {
      update: (subs, realm) => {
        subs.add(
          realm
            .objects(`Todo_Item`)
            .filtered(`owner_id == "${anonymousUser.id}"`)
        );
      },
    },
  },
};

const realm = await Realm.open(config);

realm.write(() => {
  realm.create(`Todo_Item`, {
    _id: 12342245,
    owner_id: anonymousUser.id,
    name: "Test the Todo_Item object name",
  });
});

const assignedTasks = realm.objects(`Todo_Item`);
