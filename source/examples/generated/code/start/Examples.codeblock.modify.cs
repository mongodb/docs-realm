RealmTask t = realm.All<RealmTask>()
    .Where(t => t.Id == testTaskId)
    .FirstOrDefault();

realm.Write(() =>
{
    t.Status = TaskStatus.InProgress.ToString();
});
