var t = realm.All<Task>()
    .FirstOrDefault(t => t.Id == testTaskId);

realm.Write(() =>
{
    t.Status = TaskStatus.InProgress.ToString();
});
