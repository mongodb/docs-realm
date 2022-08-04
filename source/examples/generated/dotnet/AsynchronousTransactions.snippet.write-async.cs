var person = await realm.WriteAsync(() =>
{
    return realm.Add(new Person()
    {
        Name = "John Doe"
    });
});
// you can use/modify person now
// without the need of using ThreadSafeReference

Console.WriteLine(person.Name); // John Doe
