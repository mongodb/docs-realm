const realm = await Realm.open({
  schema: [PersonSchema],
  sync: {
    user: app.currentUser,
    flexible: true,
  },
});
