var t = realm.All<Task>()
    .Where(t => t._id == testTaskId)
    .FirstOrDefault();

realm.Write(() =>
{
    t.Status = TaskStatus.InProgress.ToString();
});
