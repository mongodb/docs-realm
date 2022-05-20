var testTask = new Task
{
    Name = "Do this thing",
    Status = TaskStatus.Open.ToString()
};

realm.Write(() =>
{
    realm.Add(testTask);
});