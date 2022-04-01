test("Open a Local Realm", async () => {
  const config = {
    schema: [Car],
    path: "localOnly.realm",
  };
  const realm = await Realm.open(config);
  expect(realm.isClosed).toBe(false);
  realm.close();
  expect(realm.isClosed).toBe(true);
  Realm.deleteFile(config);
});
