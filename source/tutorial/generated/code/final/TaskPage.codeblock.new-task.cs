var newTask = new Task()
{
    Name = result,
    Status = Task.TaskStatus.Open.ToString()
};

taskRealm.Write(() =>
{
    taskRealm.Add(newTask);
});