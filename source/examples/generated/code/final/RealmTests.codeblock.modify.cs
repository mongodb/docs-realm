Task t = realm.All<Task>()
    .Where(t => t.Id == testTaskId)
    .FirstOrDefault();

realm.Write(() =>
{
    t.Status = TaskStatus.InProgress.ToString();
});
