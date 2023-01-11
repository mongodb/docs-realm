var task = await user.Functions.CallAsync<MyClass>
    ("getTask", "5f7f7638024a99f41a3c8de4");

var name = task.Name;