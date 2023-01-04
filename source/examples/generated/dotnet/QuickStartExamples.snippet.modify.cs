var i = realm.All<Item>()
    .FirstOrDefault(i => i.Id == testItemId);

realm.Write(() =>
{
    i.Status = ItemStatus.InProgress.ToString();
});

