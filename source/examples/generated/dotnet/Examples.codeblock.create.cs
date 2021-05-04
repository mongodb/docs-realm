var testTask = new Task
{
    Name = "Do this thing",
    Status = TaskStatus.Open.ToString(),
    Partition = "myPart"
};

realm.Write(() =>
{
    realm.Add(testTask);
});
