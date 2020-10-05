RealmTask testTask = new RealmTask()
{
    Name = "Do this thing",
    Status = dotnet.TaskStatus.Open.ToString()
};

realm.Write(() =>
{
    realm.Add(testTask);
});