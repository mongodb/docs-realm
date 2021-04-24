var newTask = new Task()
{
    Name = result,
    Partition = projectPartition,
    Status = Task.TaskStatus.Open.ToString()
};

taskRealm.Write(() =>
{
    taskRealm.Add(newTask);
});
