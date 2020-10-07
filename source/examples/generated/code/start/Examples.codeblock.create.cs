RealmTask testTask = new RealmTask
{
    Name = "Do this thing",
    Status = TaskStatus.Open.ToString()
};

realm.Write(() =>
{
    realm.Add(testTask);
});