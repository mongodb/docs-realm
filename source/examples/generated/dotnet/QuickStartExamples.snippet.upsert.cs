var id = ObjectId.GenerateNewId();

var kerry = new Person { Id = id, Name = "Kerry" };

// Add a new person to the realm. Since nobody with the existing Id
// has been added yet, this person is added.
await realm.WriteAsync(() =>
{
    realm.Add(kerry, update: true);
});

var sarah = new Person { Id = id, Name = "Sarah" };

// Based on the unique Id field, we have an existing person,
// but with a different name. When `update` is true, you overwrite
// the original entry (i.e. Kerry -> Sarah).
await realm.WriteAsync(() =>
{
    realm.Add(sarah, update: true);
});
