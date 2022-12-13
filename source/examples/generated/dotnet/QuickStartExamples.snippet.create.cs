var testTask = new Task
{
    Name = "Do this thing",
    Status = TaskStatus.Open.ToString(),
    Partition = "myPart"
};

await realm.WriteAsync(() =>
{
    realm.Add(testTask);
});
