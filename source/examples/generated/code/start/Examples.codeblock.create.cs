<<<<<<< HEAD
RealmTask testTask = new RealmTask()
{
    Name = "Do this thing",
    Status = dotnet.TaskStatus.Open.ToString()
=======
RealmTask testTask = new RealmTask
{
    Name = "Do this thing",
    Status = TaskStatus.Open.ToString()
>>>>>>> 91f7dae6b434aa01189524a1d6f35743a56a92b3
};

realm.Write(() =>
{
    realm.Add(testTask);
});