const realm = Realm.open({
  schema: [PersonSchema],
  sync: {
    user: app.currentUser,
    flexible: true,
  },
});
